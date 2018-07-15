// pages/shop/shop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
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
      shops: app.globalData.shops
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
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //删除购物车商品
  move(e) {
    let i = e.currentTarget.dataset.index
    let self = this
    wx.showModal({
      title: '温馨提示',
      content: '确认要删除该商品吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          self.data.shops.splice(i,1)
          self.setData({
            shops:self.data.shops
          })         
        } else if (res.cancel) {
          console.log('删除商品:用户点击取消')
        }
      }
    })
  },
  toSubmit() {   
    wx.navigateTo({
      url: '../submit/submit'
    })
  },
  add(e) {
    let i = e.currentTarget.dataset.i
    this.data.shops[i].count += 1;
    this.setData({
      shops: this.data.shops
    })
  },
  subtract(e) {
    let self = this
    let i = e.currentTarget.dataset.i
    if (this.data.shops[i].count == 1) {
      wx.showModal({
        title: '温馨提示',
        content: '确认要删除该商品吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            self.data.shops.splice(i,1)
            self.setData({
              shops:self.data.shops
            }) 
          } else if (res.cancel) {
            console.log('删除商品：用户点击取消')
          }
        }
      })
    } else {
      this.data.shops[i].count -= 1;
      this.setData({
        shops: this.data.shops
      })
    }
  }
})