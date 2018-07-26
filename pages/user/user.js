// pages/user/user.js
const config = require('../config.js').service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //登陆还是注册还是忘记密码login/register/forget
    curTab: "login",
    //判断找回密码时候页面展示，1为验证码页面，2为输入新密码页面
    forgetTab: 1,
    login: {
      account: 0,
      password: 0
    },
    register: {
      contact: "",
      phone: 0,
      code: 0,
      password: 0,
      password2: 0
    },
    forget: {
      phone: 0,
      code: 0,
      password: 0,
      password2: 0
    },
    //注册验证码
    reg_code: 0,
    reg_time: 0,
    //找回密码验证码
    for_code: 0,
    for_time: 0,
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
  changeCurTab(e) {
    if (e.currentTarget.dataset.to == "forget") {
      this.setData({
        curTab: "forget"
      })
    } else if (this.data.curTab == "register" || this.data.curTab == "forget") {
      this.setData({
        curTab: "login"
      })
    } else if (this.data.curTab == "login") {
      this.setData({
        curTab: "register"
      })
    }
  },
  login() {
    wx.showLoading({
      title: '登录中',
    })
    let login = this.data.login
    wx.request({
      url: config.login,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: login,
      success: function (res) {
        wx.hideLoading()
        console.log(res);
        if (res.statusCode == 200) {
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('phone', res.data.account)
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            mask:true
          })
          //跳转到me
          setTimeout(() => {
            wx.switchTab({
              url: '../me/me'
            })
          }, 2000);
        } else {
          wx.showToast({
            title: '账号或密码错误',
            duration: 3000,
            icon: 'none',
            mask:true
          })
        }

      },
      fail: function() {
        this.fail_cb()
      }
    })

  },
  getCode(e) {
    let self = this
    let mode = this.data[e.currentTarget.dataset.mode]
    let setCode, setTime
    if (e.currentTarget.dataset.mode == 'register') {
      setCode = 'reg_code',
        setTime = 'reg_time'

    } else if (e.currentTarget.dataset.mode == 'forget') {
      setCode = 'for_code',
        setTime = 'for_time'
    }
    //手机号码格式判断
    if (!this.isphone(mode.phone)) {
      return;
    }
    wx.showLoading({
      title: '获取验证码中',
    })
    wx.request({
      url: config.getSms,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phoneNum: mode.phone
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        self.setData({
          [setCode]: res.data,
          [setTime]: 300,
        })
        let timer = setInterval(function () {
          if (!self.data[setTime]) {
            clearInterval(timer)
            //使验证码失效
            self.setData({
              [setCode]: 0,
            })
          } else {
            self.setData({
              [setTime]: --self.data[setTime],
            })
          }
        }, 1000)
      },
      fail: function() {
        this.fail_cb()
      }
    })

  },
  register() {
    let register = this.data.register
    //判断各值是否存在
    if (!register.contact || !register.password || !this.data.reg_code) {
      wx.showToast({
        title: '请输入相关信息',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      return;
    }
    //比较两个密码是否一致
    if (!(register.password == register.password2)) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      return;
    }
    //比较两个验证码是否正确
    if (!(register.code == this.data.reg_code)) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      return;
    }
    //发送data去注册
    wx.showLoading({
      title: '注册中',
    })
    wx.request({
      url: config.register,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: register.phone,
        password: register.password,
        name: register.contact
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (!res.data) {
          wx.showToast({
            title: '账号已存在/后台出错',
            icon: 'none',
            duration: 2000,
            mask:true
          })
        } else {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000,
            mask:true
          })
          setTimeout(() => {
            wx.redirectTo({
              url: './user'
            })        
          }, 2000);
        }

      },
      fail: function() {
        this.fail_cb()
      }
    })

    //重载user页   
  },
  compareCode() {
    let forget = this.data.forget
    if (!this.data.for_code ||forget.code != this.data.for_code) {
      wx.showToast({
        title: '请填写正确的验证码',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      return
    }
    this.setData({
      forgetTab: 2,
    })
  },
  reset() {
    let forget = this.data.forget
    //比较两个密码是否一致
    if (!(forget.password == forget.password2)) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      return;
    }
    //发送data去修改密码
    wx.showLoading({
      title: '重置中',
    })
    wx.request({
      url: config.updatePassword,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: forget.phone,
        password: forget.password,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.statusCode != 200) {
          wx.showToast({
            title: '账号不存在/后台出错',
            icon: 'none',
            duration: 2000,
            mask:true
          })
        } else {
          wx.showToast({
            title: '修改密码成功',
            icon: 'success',
            duration: 2000,
            mask:true
          })
          setTimeout(() => {
            wx.redirectTo({
              url: './user'
            })        
          }, 2000);
        }
      },
      fail: function() {
        this.fail_cb()
      }
    })
  },

  bindKeyInput(e) {
    let key = e.currentTarget.dataset.key
    this.data[this.data.curTab][key] = e.detail.value
    this.setData({
      [this.data.curTab]: this.data[this.data.curTab]
    })
  },
  isphone(v) {
    let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test(v)) {
      wx.showToast({
        title: '请输入有效的手机号码！',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      return false
    }
    return true
  },
  fail_cb(){
    wx.hideLoading()
    wx.showToast({
      title: '操作失败,请检查网络',
      icon: 'none',
      duration: 2000
    })
  }
})