// pages/freeze/home.js
const service = require('../config.js').service
const utils = require('../config.js').utils
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    banners: [],
    citys:[],
    //暂时默认海口id1
    cityId:1,
    city:'城市',
    types: [{
        src: "../../assets/home/z1.png",
        name: "鸭鸭专区",
        bigTypeId: "96575ad0964442299e734ae0eebf0b6f"
      },
      {
        src: "../../assets/home/z2.png",
        name: "鸡鸽专区",
        bigTypeId: "b9cbb018133d47cb8432974e5d8c9e23"
      },
      {
        src: "../../assets/home/z3.png",
        name: "猪肉专区",
        bigTypeId: "9c90287f50604d74bab7096a97194358"
      },
      {
        src: "../../assets/home/z4.png",
        name: "牛肉专区",
        bigTypeId: "c9990b746cb146ff8bb5cd635aec7b09"
      }, {
        src: "../../assets/home/z5.png",
        name: "羊兔专区",
        bigTypeId: "1b5989d034fa47649f4a512424a03934"
      }, {
        src: "../../assets/home/z6.png",
        name: "水产专区",
        bigTypeId: "37de999fe2a34bb586be0feb69b48b6a"
      }, {
        src: "../../assets/home/z7.png",
        name: "火锅专区",
        bigTypeId: "e5bc824c05f44e138e00b6d880aae247"
      }, {
        src: "../../assets/home/z8.png",
        name: "米面果蔬",
        bigTypeId: "e8053a9b974f4ee7842b6f29fc3b4933"
      }, {
        src: "../../assets/home/z9.png",
        name: "调理串类",
        bigTypeId: "564396ba362b4726a997886dc3b1224f"
      }, {
        src: "../../assets/home/z10.png",
        name: "烟熏专区",
        bigTypeId: "d118f084725a4203bf4ebb1618e9e966"
      }
    ],
    discounts:[],
    recommendations:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //提醒用户设置城市id
    if (wx.getStorageSync('cityId')) {
      this.setData({
        cityId: wx.getStorageSync('cityId')
      })
    }else{
      wx.showToast({
        title: '请点击左上角选择城市',
        icon: 'none',
        duration: 2500,
        mask: true
      })
    }
    let self = this
    let cityId = this.data.cityId
    app.globalData.cityId = cityId 
    //获取banners,citys,推荐区recommendations,促销区discounts
    utils.getData(this,service.getBannerPicture,'banners')
    utils.getData(this,service.getCity,'citys',{},{},function () {
      self.data.citys.forEach(arr => {
        if (arr.id == self.data.cityId) {
          self.setData({
            city:arr.city
          })
        }
      });
    })
    utils.getData(this,service.selectStateGoods,'discounts',{
      cityId,state:2,num:0
    })
    utils.getData(this,service.selectStateGoods,'recommendations',{
      cityId,state:3,num:0
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
  //搜索框
  bindPickerChange: function(e) {
    let i =  e.detail.value
    console.log('城市picker发送选择改变，cityId为', this.data.citys[i].id)
    this.setData({
      city:this.data.citys[i].city,
      cityId:this.data.citys[i].id
    })
    wx.setStorageSync('cityId', this.data.cityId)
    app.globalData.cityId = this.data.cityId   
    wx.reLaunch({
      url: 'home'
    }) 
  },
  search(){
    wx.navigateTo({
      url: '../goodlist/goodlist?search='+this.data.inputVal
    })
  },
  toType(e){
    let i = e.currentTarget.dataset.i
    wx.navigateTo({
      url: '../type/type?bigTypeIndex='+i
    })   
  },
  more(e){
    let state = e.currentTarget.dataset.state
    wx.navigateTo({
      url: '../special/special?state='+state
    })   
  },
  toDetail(e){
    let goodid = e.currentTarget.dataset.goodid
    wx.navigateTo({
      url: '../detail/detail?goodsId='+goodid
    })  
  }
})
