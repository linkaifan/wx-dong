// pages/submit/submit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shops:[
      {
        id:1,
        name:'长江桂柳A级白条鸭4.2-5.0斤',
        seller:'广州番禺 长江桂柳',
        price:139.00,
        weight:"13.2kg/件",
        count:1,
        isChecked:true,
      },
      {
        id:2,
        name:'长江桂xxA级白条鸭4.2-5.0斤',
        seller:'广州番禺 长江xxx',
        price:139.00,
        weight:"13.2kg/件",
        count:1,
        isChecked:false,
      },
    ],
    total:666.00,
    note:"",
    time:"一个工作日"
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
  }
})