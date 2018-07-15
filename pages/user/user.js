// pages/user/user.js
const config = require('../config.js').service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //登陆还是注册还是忘记密码login/register/forget
    curTab:"login",
    //判断找回密码时候页面展示，1为验证码页面，2为输入新密码页面
    forgetTab:1,
    login:{
      phone:0,
      password:0
    },
    register:{
      contact:"",
      phone:0,
      code:0,
      password:0,
      password2:0,
    },
    forget:{
      phone:0,
      code:0,
      password:0,
      password2:0
    },
    code:0,
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
  changeCurTab(e){
    if (e.currentTarget.dataset.to == "forget") {
      this.setData({
        curTab:"forget"
      })      
    }else if (this.data.curTab == "register" || this.data.curTab == "forget") {
      this.setData({
        curTab:"login"
      })
    }else if (this.data.curTab == "login") {
      this.setData({
        curTab:"register"
      })      
    }
  },
  login(){
    console.log(config.login);   
    console.log(this.data.login);    
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 2000
    })
/*     wx.request({
      url: config.login, 
      method:"POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        account:'123',
        password:'123456'
      },
      success: function(res) {
        console.log(res.data)
      }
    }) */
    
  },
  getCode(){
/*     wx.request({
      url: config.register, 
      method:"POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        phoneNum:"15521153606"
      },
      success: function(res) {
        console.log(res.data)
      }
    })  */  
  },
  compareCode(){
    if (1) {
      this.setData({
        forgetTab:2
      })
    }
    return true;
  },
  reset(){
    console.log(this.data.forget);   
    this.setData({
      forgetTab:1,
      curTab:"login"
    }) 
    wx.showToast({
      title: '重置成功',
      icon: 'success',
      duration: 2000
    })
  },
  register(){
    console.log(this.data.register);   
    wx.showToast({
      title: '重置成功',
      icon: 'success',
      duration: 2000
    })    
  },
  bindKeyInput(e){
    let key = e.currentTarget.dataset.key
    this.data[this.data.curTab][key] =  e.detail.value  
    this.setData({
      [this.data.curTab]:this.data[this.data.curTab]
    })
  }
})