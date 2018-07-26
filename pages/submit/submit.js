// pages/submit/submit.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shops:[],
    sum:0,
    note:"",
    time:"一个工作日",
    token:null,
    address:null,
    goods:[],
    showGoods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let self = this
    self.setData({
      token: wx.getStorageSync('token')
    })
    this.getShoppingCar()
    utils.getData(this,service.selectDefaultAddress,'address',{},{
      'Authorization': 'Bearer ' + self.data.token
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
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    setTimeout(() => {
      this.getShoppingCar()
      wx.hideLoading()
    }, 1000);       
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
  toMe(){
    wx.switchTab({
      url: '../me/me'
    })
  },
  bindKeyInput(e){
    this.setData({
      note:e.detail.value
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
          shops: res.data
        })  
        let sum = 0
        self.data.goods = []
        self.data.showGoods = []
        app.globalData.shops.forEach(arr=>{
          if (arr.isCheck) {
            self.data.goods.push({
              goodsId: arr.goods.id,
              buyNum: arr.price.buyNum,
              priceId: arr.price.id
            })
            self.data.showGoods.push(arr)
            sum += arr.price.price * arr.price.buyNum
          }          
        })
        self.setData({
          total: app.globalData.total,
          goods: self.data.goods,
          showGoods: self.data.showGoods,
          sum
        })
      })
    }    
  },
  submit(){
    let self = this
    let data = {
      addressId: this.data.address.id,
      note: this.data.note,
      sum: this.data.sum,
      shoppingCarGoodsForUpdates:this.data.goods,
      cityId: wx.getStorageSync("cityId")
    }
    console.log(data);
    wx.request({
      url: service.createOrderForm,
      method: "POST",
      header: {
        'Authorization': 'Bearer ' + self.data.token
      },
      data,
      success: function (res) {
        console.log('提交订单');
        wx.navigateTo({
          url: '../order/order?i=0'
        })
      }
    }) 
  }
})