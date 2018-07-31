// pages/shop/shop.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
    token:null,
    //sum是跟待确定订单一样的选中的才算，不是app.globalData.sum
    sum:0,
    isCheckAll:false
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
        console.log(1);
        
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
  checkboxChange: function (e) {    
    let i = e.currentTarget.dataset.i      
    app.globalData.shops[i].isCheck = !app.globalData.shops[i].isCheck
    this.setData({
      shops: app.globalData.shops
    })  
    this.updata()
  },
  checkAll(e){
    let isCheckAll = this.data.isCheckAll       
    if (isCheckAll) {
      app.globalData.shops.forEach(arr=>{
        arr.isCheck = false
      })            
    }else{     
      app.globalData.shops.forEach(arr=>{
        arr.isCheck = true
      }) 
    }
    this.setData({
      shops: app.globalData.shops,
      isCheckAll: !this.data.isCheckAll
    }) 
    this.updata()
  },
  //删除购物车商品
  move(e) {
    let i = e.currentTarget.dataset.index
    let self = this
    wx.showModal({
      title: '温馨提示',
      content: '确认要删除该商品吗？',
      success: function (res) {
        if (res.confirm) {
          app.globalData.shops.splice(i,1)
          self.setData({
            shops:app.globalData.shops
          })       
          self.updata()  
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  toSubmit() {   
    //判断至少一个已选择商品，才能提交
    let isEmpty = true
    if (this.data.sum) {
      isEmpty = false
    }
    if (!isEmpty) {
      wx.navigateTo({
        url: '../submit/submit'
      })      
    }else{
      wx.showToast({
        title: '请至少选择一个商品',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }

  },
  updata(){
    let sum = 0
    this.data.shops.forEach(arr=>{
      if (arr.isCheck) {
        sum += arr.price.price * arr.price.buyNum
      }
    })
    this.setData({
      sum,
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
        self.updata()       
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
  },
  editNum(e){    
    let mode = e.currentTarget.dataset.mode
    let i = e.currentTarget.dataset.i   
    if (mode == 1) {
      //加1
      app.globalData.shops[i].price.buyNum++
      app.globalDatatotal++
      app.globalData.sum += app.globalData.shops[i].price.price
      this.setData({
        shops: app.globalData.shops
      })
      console.log(app.globalData.shops);
      
    }else if( mode == 0){
      //减1
      if (app.globalData.shops[i].price.buyNum == 1) {
        this.move({
          currentTarget:{
            dataset:{
              index:i
            }
          }
        })       
      }else{
        app.globalData.shops[i].price.buyNum--
        app.globalData.total--
        app.globalData.sum -= app.globalData.shops[i].price.price
        this.setData({
          shops: app.globalData.shops
        })
      }

    }
    this.updata()
  }
})