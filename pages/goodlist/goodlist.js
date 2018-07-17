// pages/goodlist/goodlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:"六和 鸡腿",
    sum:0,
    total:0,
    goods: [
      {
        name: '六和 鸭腿',
        brand: "新希望六和",
        seller:'广州番禺 六合食品',
        weight:"11 kg",
        priceRange:"22-66",//价格范围
        //categorys是一个数组，就是有些商品有*12，*6这几种规格
        categorys: [{
          value: "650g*12盒",
          price: 22,
          count: 0
        },{
          value:"650g*6盒",
          price:11,
          count:0
        }],
      },
    ]
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
    this.setData({
      total: app.globalData.total,
      sum: app.globalData.sum,
    })  
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
  
  }
})