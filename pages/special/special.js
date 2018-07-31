// pages/special/special.js
const service = require('../config.js').service
const utils = require('../config.js').utils
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    total:0,
    goods:null,
    //控制获取商品的参数num,每次触底加载+6,记得返回的时候置0
    num: 0,
    state:null,
    token:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      state: options.state,
    })
    let state = this.data.state
    if (state == 2) {
      wx.setNavigationBarTitle({
        title: '推荐区'
      })      
    }else if (state == 3) {
      wx.setNavigationBarTitle({
        title: '促销区'
      })       
    }
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
    let state = this.data.state
    let num = this.data.num
    let cityId = app.globalData.cityId  
    //获取商品goods
    let header = {};
    if (wx.getStorageSync('token')) {
      header = {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') 
      }
    }     
    utils.getData(this,service.selectStateGoods,'goods',{
      state,num,cityId
    },header)
    //购物车
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
    console.log('加入购物车onhide');
    this.editShoppingCar()  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('加入购物车onunload');
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
    let self = this
    let num = this.data.num+6
    let state = this.data.state
    let cityId = app.globalData.cityId  
    let header = {};
    if (wx.getStorageSync('token')) {
      header = {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') 
      }
    }   
    wx.showLoading({
      title: '加载中',
      mask: true
    })  
    wx.request({
      url: service.selectStateGoods,
      data: {
        num,state,cityId
      },
      header,
      success: function (res) {
        wx.hideLoading()
        if (res.data.length == 0) {
          wx.showToast({
            title: '已加载全部',
            icon: 'none',
            duration: 2000
          })
        }else{
          self.data.goods = self.data.goods.concat(res.data)
          self.setData({
            goods:self.data.goods,
            num:self.data.num+6
          })
        }
      },
      fail: function() {
        this.fail_cb()
      }
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  updata(){
    this.setData({
      sum: app.globalData.sum,
      total: app.globalData.total
    })
  },
  fail_cb(){
    wx.hideLoading()
    wx.showToast({
      title: '操作失败,请检查网络',
      icon: 'none',
      duration: 2000
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