//app.js
App({
  onLaunch: function () {
    this.globalData.shops.forEach(item => {
      this.globalData.sum += item.price * item.count
      this.globalData.total += item.count
    });    
    console.log('购物车总价：'+ this.globalData.sum);
    console.log('购物车总数量：'+ this.globalData.total);
    
  },
  globalData: {
    userInfo: null,
    isLogin:false,
    shops:[
      {
        name:'长江桂柳A级白条鸭4.2-5.0斤',
        seller:'广州番禺 长江桂柳',
        price:139.00,
        weight:"13.2kg/件",
        count:1,
        isChecked:true,
      },
      {
        name:'长江桂xxA级白条鸭4.2-5.0斤',
        seller:'广州番禺 长江xxx',
        price:139.00,
        weight:"13.2kg/件",
        count:3,
        isChecked:false,
      },
    ],
    //总金额
    sum:0,
    //总数量，
    total:0
  }
})