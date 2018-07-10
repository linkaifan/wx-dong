// pages/shop/shop.js
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
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //购物车商品+,-数量,+：{mode:'1'},-:{mode:'0'}
  edit(e){
    let mode = e.currentTarget.dataset.mode
    let index = e.currentTarget.dataset.index
    if (mode == 1) {
      //加1
      this.data.shops[index].count++
    }else if (mode == 0) {
      //减一,判断现在是否为1[1的时候不能再减少]
      if (this.data.shops[index].count == 1) {
        wx.showToast({
          title: '该商品不能减少了哟',
          duration: 2000,
          icon:'none'
        })
      }else{
        this.data.shops[index].count--
      }
      
    }
    this.setData({
      shops:this.data.shops
    })    
  },
  //删除购物车商品
  move(e){
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '温馨提示',
      content: '确认要删除该商品吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})