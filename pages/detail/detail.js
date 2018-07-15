// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 0,
    total: 0,
    imgs: [
      '../../assets/test/1.jpg',
      '../../assets/test/2.jpeg',
      '../../assets/test/3.jpeg',
    ],
    good: {
      name: '六和 鸭腿',
      brand: "新希望六和",
      seller:'广州番禺 六合食品',
      //厂名
      factory: "广东工业大学",
      //存储方法
      storage: "-18℃",
      //保质期
      shelf: "365",
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
      //备注
      note: `一箱约38个，单个质量约260g,减肥啦大家发了大家发垃圾法
      拉第就樊辣椒劳动法就法拉家纺辣椒粉垃圾法拉第就老夫加大了就`
    }

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

  },
  add(e) {    
    let category = e.currentTarget.dataset.good
    let i = e.currentTarget.dataset.i
    let info = this.data.good
    let shops = app.globalData.shops

    info.categorys[i].count++ 
    if (info.categorys[i].count == 1) {
      //说明是购物车shops新增商品
      console.log("新增商品进入购物车shops");     
      shops.push({
        name: info.name,
        seller: info.seller,
        price: category.price,
        weight: category.value,
        count: 1,
        isChecked: false
      })      
    }
    //点击事件控制的商品在购物车里的序号
    let indexOfShops = -1;
    shops.forEach((item,index) => {
      if (info.name == item.name && category.value == item.weight ) {
        indexOfShops = index
      }
    });

    this.setData({
      sum: this.data.sum + category.price,
      total: this.data.total + 1,
      good: info
    })
    app.globalData.sum = this.data.sum
    app.globalData.total = this.data.total
    shops[indexOfShops].count = info.categorys[i].count
  },
  subtract(e) {
    let category = e.currentTarget.dataset.good
    let i = e.currentTarget.dataset.i
    let info = this.data.good
    let shops = app.globalData.shops

    //点击事件控制的商品在购物车里的序号
    let indexOfShops = -1;
    shops.forEach((item,index) => {
      if (info.name == item.name && category.value == item.weight ) {
        indexOfShops = index
      }
    });
    info.categorys[i].count--  
    if (info.categorys[i].count == 0) {
      //说明是购物车shops删除商品
      console.log("删除购物车商品shops");     
      shops.splice(indexOfShops,1)      
    }else{
      shops[indexOfShops].count = info.categorys[i].count
    }

    this.setData({
      sum: this.data.sum - category.price,
      total: this.data.total - 1,
      good: info
    })
    app.globalData.sum = this.data.sum
    app.globalData.total = this.data.total
  }
})