//app.js
const service = require('./pages/config.js').service
const utils = require('./pages/config.js').utils
App({
  onLaunch: function () {
    let self = this
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
				fail: function(res) {					
				}
			}) 
    }
  },
  globalData: {
    userInfo: null,
    cityId:1,
    shops:[],
    //总金额
    sum:0,
    //总数量，
    total:0,
    //默认地址
    addressId:null
  }
})