// pages/detail/detail.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 0,
    total: 0,
    good: null,
    token:null,
    evaluations:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsId = options.goodsId
    let header = {};
    if (wx.getStorageSync('token')) {
      header = {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') 
      }
    } 
    utils.getData(this, service.selectOneGoods, 'good', {goodsId},header)
    utils.getData(this, service.selectCommentByGoodsId, 'evaluations', {goodsId},header)
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
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    let timer = setInterval(()=>{
      if (app.globalData.isCom) {
        self.getShoppingCar()
        wx.hideLoading()
        app.globalData.isCom = false
        clearInterval(timer)       
      }
    },100) 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.editShoppingCar()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.editShoppingCar()
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
  updata(){    
    this.setData({
      total: app.globalData.total,
      sum: app.globalData.sum,
    })
  },
  getShoppingCar(){
    let self = this
    if (wx.getStorageSync('token')) {
      self.setData({
        token: wx.getStorageSync('token')
      })
      utils.setData(this, service.shoppingCar,{},function (res) {                   
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
      })
    } 
  },
  editShoppingCar(){  
    let self = this
    app.globalData.shops.forEach((item)=>{
      if (item.goods) {        
        item.goodsId = item.goods.id
        item.priceId = item.price.id
        item.buyNum = item.price.buyNum
        if (!item.isCheck) {
          item.isCheck = false
        }else{
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
      data:app.globalData.shops,
      success: function (res) {
        console.log('修改购物车');  
        app.globalData.isCom = true
      }
    }) 
  }
})