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
    bigTypeIndex: null,
    smTypes: [],
    types: [{
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
    //控制获取商品的参数num,每次触底加载+6,记得返回的时候置0
    num: 0,
    goods: null,
    //搜索的小类id
    typeId: null,
    token: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let i = options.bigTypeIndex
    this.setData({
      searchBigId: this.data.types[i].bigTypeId,
      bigTypeIndex: i,
    })
    let header = {};
    if (wx.getStorageSync('token')) {
      header = {
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      }
    }
    utils.getData(this, service.smallType, 'smTypes', {
      bigTypeId: this.data.searchBigId
    }, header)
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
          self.getShoppingCar()
          wx.hideLoading()
          app.globalData.isCom = false
          clearInterval(timer)
        }
      }, 100)
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
    //通过判断typeId为Null表明不需要触底获取更多商品
    if (!this.data.typeId) {
      return
    }
    const self = this
    if (wx.getStorageSync('token')) {
      self.getShoppingCar(self.getGoodsByNum)
    } else {
      self.getGoodsByNum()
    }
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
  changeBigIndex(e) {
    let i = e.currentTarget.dataset.i
    this.setData({
      bigTypeIndex: i,
      searchBigId: this.data.types[i].bigTypeId,
      goods: null,
      typeId: null,
      num: 0
    })
    utils.getData(this, service.smallType, 'smTypes', {
      bigTypeId: this.data.searchBigId
    })
  },
  getGoods(e) {
    let self = this
    let typeId = e.currentTarget.dataset.type_id
    let header = {};
    if (wx.getStorageSync('token')) {
      header = {
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      }
    }
    this.setData({
      typeId: typeId,
      num: 0
    })
    let cityId = app.globalData.cityId
    utils.getData(this, service.selectTypeGoods, 'goods', {
      typeId,
      num: 0,
      cityId
    }, header)
  },
  return_sm() {
    this.setData({
      goods: null,
      typeId: null,
      num: 0
    })
  },
  fail_cb() {
    wx.hideLoading()
    wx.showToast({
      title: '操作失败,请检查网络',
      icon: 'none',
      duration: 2000
    })
  },
  getShoppingCar(cb) {
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
        if (cb) {
          cb()
        }
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
        console.log('修改购物车');
        app.globalData.isCom = true
      }
    })
  },
  getGoodsByNum() {
    let self = this
    let typeId = this.data.typeId
    let cityId = app.globalData.cityId
    let num = this.data.num + 6
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
      url: service.selectTypeGoods,
      data: {
        num,
        typeId,
        cityId
      },
      header,
      success: function (res) {
        wx.hideLoading()
        console.log(res.data);
        if (res.data.length == 0) {
          wx.showToast({
            title: '已加载全部',
            icon: 'none',
            duration: 2000
          })
        } else {
          self.data.goods = self.data.goods.concat(res.data)
          self.setData({
            goods: self.data.goods,
            num: self.data.num + 6
          })
        }
      },
      fail: function () {
        this.fail_cb()
      }
    })
  }
})