// pages/order/order.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    tabs: ["待付款", "待发货", "待收货", "完结", "失效"],
    //当前显示内容，0：待付款，1：待发货，2：待收货，3：完结，4：失效
    curIndex: 0,
    orders: [],
    pays: [],
    waits: [],
    takes: [],
    coms: [],
    fails: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curIndex: options.i,
      token: wx.getStorageSync('token'),
    })
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
    let self = this
    utils.setData(this, service.selectOrderForm, {}, function (res) {
      self.setData({
        orders: res.data
      })
      self.data.orders.forEach(arr => {
        switch (arr.state) {
          case 1:
            self.data.pays.push(arr)
            break;
          case 2:
            self.data.waits.push(arr)
            break;
          case 3:
            self.data.takes.push(arr)
            break;
          case 7:
            self.data.coms.push(arr)
            break;
          case 5:
            self.data.fails.push(arr)
            break;
          default:
            break;
        }
      });
      self.setData({
        pays: self.data.pays,
        waits: self.data.waits,
        takes: self.data.takes,
        coms: self.data.coms,
        fails: self.data.fails,
      })
    }, this.fail_cb)
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
  changeCurIndex(e) {
    let i = e.currentTarget.dataset.i
    this.setData({
      curIndex: i
    })
    wx.setNavigationBarTitle({
      title: this.data.tabs[i]
    })
  },
  pay(e) {
    let i = e.currentTarget.dataset.i
    //连接wx付款接口，成功后更改订单状态  
  },
  cancle(e) {
    let self = this
    //10分钟内未付款时或点击取消订单
    let i = e.currentTarget.dataset.i
    let data = {
      orderFormId: this.data.pays[i].id,
      state: 5
    }
    wx.showModal({
      title: '温馨提示',
      content: '是否确认取消订单？',
      success: function (res) {
        if (res.confirm) {
          utils.setData(self, service.updateOrderForm, data, function (res) {
            console.log(res);
            wx.showToast({
              title: '取消订单成功',
              icon: 'success',
              duration: 1500,
              wrap: true
            })
            setTimeout(() => {
              wx.reLaunch({
                url: './order?i=4'
              })
            }, 1500);
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  gain(e) {
    let self = this
    //确认收货
    let i = e.currentTarget.dataset.i
    let data = {
      orderFormId: this.data.takes[i].id,
      state: 7
    }
    wx.showModal({
      title: '温馨提示',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          utils.setData(self, service.updateOrderForm, data, function (res) {
            console.log(res);
            wx.showToast({
              title: '确认收货成功',
              icon: 'success',
              duration: 1500,
              wrap: true
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../evaluation/evaluation?id='+data.orderFormId
              })
            }, 1500);
          })
        } else if (res.cancel) {
          return
        }
      }
    }) 
  },
  fail_cb() {
    wx.hideLoading()
    wx.showToast({
      title: '操作失败,请检查网络',
      icon: 'none',
      duration: 2000
    })
  }
})