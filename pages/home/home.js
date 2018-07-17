// pages/freeze/home.js
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    banners: [],
    citys:[],
    //暂时默认广州id1
    cityId:1,
    types: [{
        src: "../../assets/home/ji.png",
        name: "鸭鸭专区",
      },
      {
        src: "../../assets/home/ji.png",
        name: "鸡鸽专区",
      },
      {
        src: "../../assets/home/ji.png",
        name: "猪肉专区",
      },
      {
        src: "../../assets/home/ji.png",
        name: "牛肉专区",
      }, {
        src: "../../assets/home/ji.png",
        name: "羊兔专区",
      }, {
        src: "../../assets/home/ji.png",
        name: "水产专区",
      }, {
        src: "../../assets/home/ji.png",
        name: "火锅专区",
      }, {
        src: "../../assets/home/ji.png",
        name: "米面果蔬",
      }, {
        src: "../../assets/home/ji.png",
        name: "调理串类",
      }, {
        src: "../../assets/home/ji.png",
        name: "烟熏专区",
      }
    ],
    discounts: [
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "11 kg",
        price: "11",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "22 kg",
        price: "22",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "33 kg",
        price: "33",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "44 kg",
        price: "44",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "55 kg",
        price: "55",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "66 kg",
        price: "66",
      }
    ],
    recommendations: [{
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "11 kg",
        price: "11",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "22 kg",
        price: "22",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "33 kg",
        price: "33",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "44 kg",
        price: "44",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "55 kg",
        price: "55",
      },
      {
        img: "../../assets/test/1.jpg",
        name: "印度飞饼",
        seller: "广工 广州番禺",
        weight: "66 kg",
        price: "66",
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cityId = this.data.cityId
    //获取banners,citys,推荐区recommendations,促销区discounts
    utils.getData(this,service.getBannerPicture,'banners')
    utils.getData(this,service.getCity,'citys')
    utils.getData(this,service.selectStateGoods,'tuijian',{
      cityId,state:2,num:0
    })
    utils.getData(this,service.selectStateGoods,'cuxiao',{
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
})