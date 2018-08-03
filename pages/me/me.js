// pages/me/me.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    phone:null,
    tabs: [{
        value: "待付款",
        img: '../../assets/me/pay.png'
      },
      {
        value: "待发货",
        img: '../../assets/me/wait.png'
      },
      {
        value: "待收货",
        img: '../../assets/me/take.png'
      },
      {
        value: "已完结",
        img: '../../assets/me/com.png'
      },
      {
        value: "已失效",
        img: '../../assets/me/fail.png'
      },
    ],
    addressItems: [],
    detail: {},
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('token')) {
      let self = this
      this.setData({
        token: wx.getStorageSync('token'),
        phone: wx.getStorageSync('phone'),
      })
      //获取个人数据：地址...等
      utils.getData(this, service.selectAddress, 'addressItems', {}, {
        'Authorization': 'Bearer ' + this.data.token
      })
      //获取购物车信息
      utils.setData(this, service.shoppingCar,{},function (res) {           
        app.globalData.shops = res.data  
        app.globalData.sum = 0
        app.globalData.total = 0
        app.globalData.shops.forEach(item => {
          app.globalData.sum += item.price.price * item.buyNum
          app.globalData.total += item.buyNum
        });            
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../user/user'
        })       
      }, 1000);
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setDefaultAddress(e) {
    wx.showLoading({
      title:"设置中",
      mask:true
    })
    let i = e.currentTarget.dataset.index
    let info = {
      addressId: this.data.addressItems[i].id
    }
    utils.setData(this, service.setDefaultAddress, info, function (res) {   
      wx.hideLoading()  
      if (res.data) {
        wx.showToast({
          title: '修改默认地址',
          icon: 'success',
          duration: 2000,
          mask:true
        })
        //跳转到me
        setTimeout(() => {
          wx.reLaunch({
            url: './me'
          })
        }, 2000);
      }
    },this.fail_cb)
  },
  bindKeyInput: function (e) {
    let key = e.currentTarget.dataset.key
    this.data.detail[key] = e.detail.value
    this.setData({
      detail: this.data.detail
    })
  },
  showWrap(e) {
    let index = e.currentTarget.dataset.index;
    if (index != -1) {
      this.data.detail = this.data.addressItems[index]
    }
    this.setData({
      detail: this.data.detail,
      isShow: true
    })
  },
  complete() {
    let self = this
    let detail = this.data.detail
    wx.showLoading({
      title:"保存中",
      mask:true
    })
    if (detail.id) {
      //修改
      let info = {
        userName: detail.userName,
        userPhone: detail.userPhone,
        address: detail.address,
        addressId: detail.id
      }
      utils.setData(this, service.updateAddress, info, function (res) {
        wx.hideLoading()
        if (res.data) {         
          wx.showToast({
            title: '修改地址成功',
            icon: 'success',
            duration: 2000,
            mask:true
          })
          //跳转到me
          setTimeout(() => {
            wx.reLaunch({
              url: './me'
            })
          }, 2000);
        }
      },this.fail_cb)
    } else {
      //新增
      let info = {
        userName: detail.userName,
        userPhone: detail.userPhone,
        address: detail.address,
      }
      utils.setData(this, service.insertAddress, info, function (res) {
        wx.hideLoading()
        if (res.data) {
          wx.showToast({
            title: '新增地址成功',
            icon: 'success',
            duration: 2000,
            mask:true
          })
          //跳转到me
          setTimeout(() => {
            wx.reLaunch({
              url: './me'
            })
          }, 2000);
        }
      },this.fail_cb)
    }
  },
  remove(e) {
    let self = this
    wx.showModal({
      title: '提示',
      content: '确定删除此地址？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title:"删除中",
            mask:true
          })
          let i = e.currentTarget.dataset.index
          let info = {
            addressId: self.data.addressItems[i].id
          }
          utils.setData(self, service.deleteAddress, info, function (res) {
            wx.hideLoading()
            if (res.data) {
              wx.showToast({
                title: '删除地址成功',
                icon: 'success',
                duration: 2000,
                mask:true
              })
              //跳转到me
              setTimeout(() => {
                wx.reLaunch({
                  url: './me'
                })
              }, 2000);
            }
          },self.fail_cb)
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  close() {
    this.setData({
      isShow: false,
      detail: {}
    })
  },
  toOrder(e) {
    let i = e.currentTarget.dataset.i
    wx.navigateTo({
      url: `../order/order?i=${i}`
    })
  },
  setting(){
    let self = this
    wx.showActionSheet({
      itemList: ['退出登录', '关于我们'],
      success: function(res) {
        if (res.tapIndex == 0) {
          self.exit()         
        }else if (res.tapIndex == 1) {
          console.log('关于我们');         
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  exit() {
    wx.showModal({
      title: '提示',
      content: '是否确定退出当前用户？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'token'
          })
          wx.removeStorage({
            key: 'phone'
          })
          wx.navigateTo({
            url: `../user/user`
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  toAllOrder(){
    wx.navigateTo({
      url: '../allOrder/allOrder'
    })
  },
  fail_cb(){
    wx.hideLoading()
    wx.showToast({
      title: '操作失败,请检查网络',
      icon: 'none',
      duration: 2000
    })
  }
})