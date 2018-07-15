// pages/special/special.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    total:0,
    items:[
      {
        name:"念香福 香辣小龙虾",
        address:"来福如意食品 湖北xx",
        weight:"0.65kg-7.8kg",
        priceRage:"11-66",
        categorys:[
          {
            name:"650g*12盒",
            price:22,
            count:1
          },
          {
            name:"650g*4盒",
            price:33,
            count:1
          },
          {
            name:"650g*2盒",
            price:11,
            count:1
          },
        ]
      }
    ],
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
      sum: app.globalData.sum,
      total: app.globalData.total
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
  
  },
  add(e){
    console.log('add');
    
  },
  subtract(e){
    console.log('subtract');
    
  }
})