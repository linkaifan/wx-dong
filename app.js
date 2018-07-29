//app.js
const service = require('./pages/config.js').service
const utils = require('./pages/config.js').utils
App({
  onLaunch: function () {
    let self = this
    //账号登录
    if (wx.getStorageSync('token')) {
      //判断是否登录，登录了就获取购物车信息
      wx.request({
        url: service.shoppingCar,
        method: "GET",
        header: {
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          self.globalData.shops = res.data
          self.globalData.shops.forEach(item => {
            self.globalData.sum += item.price.price * item.buyNum
            self.globalData.total += item.buyNum
          });
        },
        fail: function (res) {}
      })
    }
    //wx登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        if (res.code) {
          wx.request({
            //拿openId
            url: service.wxLogin,
            method: 'POST',
            data: {
              code: res.code,
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              if (res.statusCode == 200) {
                wx.setStorageSync('openid', res.data.openid)              
              }else{
                wx.showToast({
                  title: '获取openid失败,请重试',
                  icon: 'none',
                  duration: 1500,
                  mask:true
                })
              }       
            },
            fail: (err) => {
              console.log(err)
            },
            complete: (res) => {
              // console.log(res)
            }
          })
        }
      }
    }) 
  },
  globalData: {
    userInfo: null,
    cityId: 1,
    shops: [],
    //总金额
    sum: 0,
    //总数量，
    total: 0,
    //默认地址
    addressId: null
  }
})