// pages/goodlist/goodlist.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    sum: 0,
    total: 0,
    goods: [],
    token: null,
    search: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: options.search
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
    const self = this
    if (wx.getStorageSync("token")) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      let timer = setInterval(() => {
        if (app.globalData.isCom) {
          //获取搜索内容的商品列表
          let header = {};
          if (wx.getStorageSync('token')) {
            header = {
              'Authorization': 'Bearer ' + wx.getStorageSync('token')
            }
          }
          utils.getData(self, service.selectGoods, 'goods', {
            message: self.data.search,
            cityId: app.globalData.cityId,
          }, header)
          self.getShoppingCar()
          wx.hideLoading()
          app.globalData.isCom = false
          clearInterval(timer)
        }
      }, 100)
    }else{
      utils.getData(self, service.selectGoods, 'goods', {
        message: self.data.search,
        cityId: app.globalData.cityId,
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (!wx.getStorageSync('token')) {
      return
    } else {
      this.editShoppingCar()
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (!wx.getStorageSync('token')) {
      return
    } else {
      this.editShoppingCar()
    }
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
  updata() {
    this.setData({
      sum: app.globalData.sum,
      total: app.globalData.total
    })
  },
  getShoppingCar() {
    let self = this
    if (wx.getStorageSync('token')) {
      self.setData({
        token: wx.getStorageSync('token')
      })
      utils.setData(this, service.shoppingCar, {}, function (res) {
        app.globalData.shops = res.data
        app.globalData.sum = 0
        app.globalData.total = 0
        app.globalData.shops.forEach(item => {
          app.globalData.sum += item.price.price * item.buyNum
          app.globalData.total += item.buyNum
        });
        console.log('获得购物车信息');
        self.setData({
          total: app.globalData.total,
          sum: app.globalData.sum
        })
      },function (err) {
        console.log(err);
        wx.showToast({
          title:"发生错误",
          icon:"none",
          duration:1500,
          mask:true
        })
      })
    }
  },
  editShoppingCar() {
    let self = this
    app.globalData.shops.forEach((item) => {
      if (item.goods) {
        item.goodsId = item.goods.id
        item.priceId = item.price.id
        item.buyNum = item.price.buyNum
        if (!item.isCheck) {
          item.isCheck = false
        } else {
          item.isCheck = true
        }
        delete item.goods
        delete item.id
        delete item.price
      }
    })
    wx.request({
      url: service.updateShoppingCar,
      method: "POST",
      header: {
        'Authorization': 'Bearer ' + self.data.token
      },
      data: app.globalData.shops,
      success: function (res) {
        console.log('用以下data修改购物车成功');
        app.globalData.isCom = true
      }
    })
  }
})