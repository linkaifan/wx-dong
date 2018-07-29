// pages/evaluation/evaluation.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars:[1,2,3,4,5],
    formId:null,
    token:null,
    goods:[],
    //跟商品对应的评分,评价内容
    goodsStar:[],
    evaluation:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      formId: options.id,
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
    utils.setData(this, service.selectOrderFormById, {
      orderFormId:self.data.formId
    }, function (res) {     
      //生成长度为商品数量，5为默认值的goodsStar数组
      let len = res.data.goodsList.length
      self.data.goodsStar = new Array(len).fill(5)
      self.data.evaluation = new Array(len).fill('五星好评！')
      self.setData({
        goods: res.data.goodsList,
        goodsStar: self.data.goodsStar,
        evaluation: self.data.evaluation
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
  changeStar(e){   
    let value = e.currentTarget.dataset.value
    let i = e.currentTarget.dataset.i
    this.data.goodsStar[i] = value
    this.setData({
      goodsStar: this.data.goodsStar
    })
  },
  evaluate(e){
    let i = e.currentTarget.dataset.i
    let value = e.detail.value
    this.data.evaluation[i] = value
    this.setData({
      evaluation: this.data.evaluation
    }) 
  },
  submitEvaluation(){
    let len = this.data.goods.length
    let self = this
    for (let i = 0; i < len; i++) {
      let data = {
        star: self.data.goodsStar[i],
        comment:self.data.evaluation[i],
        goodsId: self.data.goods[i].goods.id
      }
      utils.setData(this,service.createComment,data,function (res) {    
        if ( i == len -1) {        
          wx.navigateTo({
            url: '../order/order?i=3'
          })
        }   
      },self.fail_cb)           
    }

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