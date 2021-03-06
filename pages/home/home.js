// pages/freeze/home.js
const app = getApp()
import regeneratorRuntime, {
  async
} from '../apis/regenerator-runtime'
const Home = require('../apis/Home')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    banners: [],
    citys: [],
    //暂时默认海口id1
    cityId: 1,
    city: '城市',
    types: [{
        src: "../../assets/home/z1.png",
        name: "鸭副类",
        bigTypeId: "2"
      },
      {
        src: "../../assets/home/z2.png",
        name: "鸡副类",
        bigTypeId: "3"
      },
      {
        src: "../../assets/home/z3.png",
        name: "猪副类",
        bigTypeId: "5"
      },
      {
        src: "../../assets/home/z4.png",
        name: "牛副类",
        bigTypeId: "6"
      }, {
        src: "../../assets/home/z5.png",
        name: "羊兔类",
        bigTypeId: "7"
      }, {
        src: "../../assets/home/z6.png",
        name: "水产类",
        bigTypeId: "8"
      }, {
        src: "../../assets/home/z7.png",
        name: "火锅类",
        bigTypeId: "9"
      }, {
        src: "../../assets/home/z8.png",
        name: "粮油类",
        bigTypeId: "12"
      }, {
        src: "../../assets/home/z9.png",
        name: "烧烤串类",
        bigTypeId: "11"
      }, {
        src: "../../assets/home/z10.png",
        name: "调料类",
        bigTypeId: "15"
      }
    ],
    discounts: [],
    recommendations: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    const cityId = this.data.cityId
    //异步并行获取banners,citys,推荐区recommendations,促销区discounts
    app.globalData.cityId = cityId
    !(async () => {
      const [citys, banners, discounts, recommendations] =
      await Promise.all([Home.getCity(), Home.getBannerPicture(),
        Home.getDiscounts(0), Home.getRecommendations(0),
      ])
      self.setData({
        citys,
        banners,
        discounts,
        recommendations
      })
    })();

    //提醒用户设置城市id
    if (wx.getStorageSync('cityId')) {
      this.setData({
        cityId: wx.getStorageSync('cityId'),
        city: wx.getStorageSync('city') || '城市'
      })
      app.globalData.cityId = wx.getStorageSync('cityId')
    } else {
      wx.showToast({
        title: '请点击左上角选择城市',
        icon: 'none',
        duration: 2500,
        mask: true
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
  onShow: function () {},

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
  //城市选择
  bindPickerChange: function (e) {
    let i = e.detail.value
    console.log('城市picker发送选择改变，cityId为', this.data.citys[i].id)
    this.setData({
      city: this.data.citys[i].city,
      cityId: this.data.citys[i].id
    })
    wx.setStorageSync('cityId', this.data.cityId)
    wx.setStorageSync('city', this.data.city)
    app.globalData.cityId = this.data.cityId
    app.globalData.city = this.data.city
    wx.reLaunch({
      url: 'home'
    })
  },
  search() {
    wx.navigateTo({
      url: '../goodlist/goodlist?search=' + this.data.inputVal
    })
  },
  toType(e) {
    let i = e.currentTarget.dataset.i
    let bigTypeId = this.data.types[i].bigTypeId
    wx.navigateTo({
      url: '../type/type?bigTypeId=' + bigTypeId
    })
  },
  more(e) {
    let state = e.currentTarget.dataset.state
    wx.navigateTo({
      url: '../special/special?state=' + state
    })
  },
  toDetail(e) {
    let goodid = e.currentTarget.dataset.goodid
    wx.navigateTo({
      url: '../detail/detail?goodsId=' + goodid
    })
  }
})