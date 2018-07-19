// pages/type/type.js
const service = require('../config.js').service
const utils = require('../config.js').utils
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    searchBigId: null,
    bigTypeIndex:null,
    smTypes: ['大白鸡肉',"鸡腿"],
    types: [
      {
        name: "鸭鸭专区",
        bigTypeId: "5"
      },
      {
        name: "鸡鸽专区",
        bigTypeId: "7"
      },
      {
        name: "猪肉专区",
        bigTypeId: "6"
      },
      {
        name: "牛肉专区",
        bigTypeId: "8"
      }, {
        name: "羊兔专区",
        bigTypeId: "1"
      }, {
        name: "水产专区",
        bigTypeId: "2"
      }, {
        name: "火锅专区",
        bigTypeId: "10"
      }, {
        name: "米面果蔬",
        bigTypeId: "11"
      }, {
        name: "调理串类",
        bigTypeId: "3"
      }, {
        name: "烟熏专区",
        bigTypeId: "9"
      }, {
        name: "菜系专区",
        bigTypeId: "12"
      }, {
        name: "品牌专区",
        bigTypeId: "4"
      }
    ],
    f: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let i = options.bigTypeIndex

    this.setData({
      searchBigId: this.data.types[i].bigTypeId,
      bigTypeIndex: i
    })
    // utils.getData(this, service.smallType, 'smTypes', {
    //   bigTypeId: this.data.searchBigId
    // })
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
  //顶部搜索栏
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  search() {
    wx.navigateTo({
      url: '../goodlist/goodlist?search=' + this.data.inputVal
    })
  },
  changeBigIndex(e){
    let i = e.currentTarget.dataset.i
    this.setData({
      bigTypeIndex:i,
      searchBigId:this.data.types[i].bigTypeId
    })
    utils.getData(this, service.smallType, 'smTypes', {
      bigTypeId: this.data.searchBigId
    })
  }
})