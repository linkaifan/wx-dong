// pages/me/me.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
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
    isShow: false
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
    if (wx.getStorageSync('userId')) {
      let self = this
      this.setData({
        userId: wx.getStorageSync('userId'),
        token: wx.getStorageSync('token'),
        phone: wx.getStorageSync('phone'),
      })
      //获取个人数据：购物车，地址，订单...等
      utils.getData(this, service.selectAddressByUserId, 'addressItems', {
        userId: this.data.userId
      }, {
        'Authorization': 'Bearer ' + this.data.token
      })
    } else {
      wx.navigateTo({
        url: '../user/user'
      })
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
    let i = e.currentTarget.dataset.index
    let info = {
      userId: this.data.userId,
      addressId: this.data.addressItems[i].id
    }
    utils.setData(this, service.setDefaultAddress, info, function (res) {
      console.log(res);
      
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
    })
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
    if (detail.id) {
      //修改
      let info = {
        userName: detail.userName,
        userPhone: detail.userPhone,
        address: detail.address,
        userId: this.data.userId,
        id: detail.id
      }
      utils.setData(this, service.updateAddress, info, function (res) {
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
      })
    } else {
      //新增
      let info = {
        userName: detail.address,
        userPhone: detail.userPhone,
        address: detail.address,
        userId: this.data.userId
      }
      utils.setData(this, service.insertAddress, info, function (res) {
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
      })
    }
  },
  remove(e) {
    let self = this
    wx.showModal({
      title: '提示',
      content: '确定删除此地址？',
      success: function(res) {
        if (res.confirm) {
          let i = e.currentTarget.dataset.index
          let info = {
            addressId: self.data.addressItems[i].id
          }
          utils.setData(self, service.deleteAddress, info, function (res) {
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
          })
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
  exit() {
    wx.showModal({
      title: '提示',
      content: '是否确定退出当前用户？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'userId'
          })
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
  }
})