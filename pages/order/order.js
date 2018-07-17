// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:["待付款","待发货","待收货","完结","失效"],
    //当前显示内容，0：待付款，1：待发货，2：待收货，3：完结，4：失效
    curIndex: 0,
    //待收货
    takes:[
      {
        name:'广工印度飞饼',
        weight:'12kg',
        price:16.90,
        count:1,
        total:16.90
      },
      {
        name:'广工印度飞饼',
        weight:'12kg',
        price:16.90,
        count:1,
        total:16.90
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curIndex:options.i
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
  changeCurIndex(e) {
    let i = e.currentTarget.dataset.i
    this.setData({
      curIndex: i
    })
    wx.setNavigationBarTitle({
      title: this.data.tabs[i]
    })
  },
  complete(e) {
    let i = e.currentTarget.dataset.i
    console.log(i);
    
    wx.showModal({
      title: '温馨提示',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})