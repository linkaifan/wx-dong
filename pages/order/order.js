// pages/order/order.js
const app = getApp()
const service = require('../config.js').service
const utils = require('../config.js').utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    tabs: ["待付款", "待发货", "待收货", "完结", "失效"],
    //当前显示内容，0：待付款，1：待发货，2：待收货，3：完结，4：失效
    curIndex: 0,
    orders: [],
    pays: [],
    waits: [],
    takes: [],
    coms: [],
    fails: [],
    //有效期，10分钟=600秒
    ddl: 600,
    //倒计时定时器
    timer: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curIndex: options.i,
      token: wx.getStorageSync('token'),
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
    let self = this
    self.setData({
      pays: [],
      waits: [],
      takes: [],
      coms: [],
      fails: [],
    })
    utils.setData(this, service.selectOrderForm, {}, function (res) {
      self.setData({
        orders: res.data
      })
      self.data.orders.forEach(arr => {
        switch (arr.state) {
          case 1:
            self.data.pays.push(arr)
            break;
          case 2:
            self.data.waits.push(arr)
            break;
          case 3:
            self.data.takes.push(arr)
            break;
          case 7:
            self.data.coms.push(arr)
            break;
          case 5:
            self.data.fails.push(arr)
            break;
          default:
            break;
        }
      });
      self.setData({
        pays: self.data.pays,
        waits: self.data.waits,
        takes: self.data.takes,
        coms: self.data.coms,
        fails: self.data.fails,
      })
      let isLose = self.initPays()
      console.log(isLose);
      if (!isLose) {
        console.log('在初始化无失效');
        self.countDown()
      }

    }, this.fail_cb)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer)
      console.log("清");
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer)
      console.log("清");
      
    }
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
  pay(e) {
    let i = e.currentTarget.dataset.i
    let postData = {
      openid: wx.getStorageSync('openid'),
      orderFormId: this.data.pays[i].id
    }
    wx.showLoading({
      title:"加载中"
    })
    wx.request({
      url: service.wxPay,
      method: "POST",
      data: postData,
      header: {
        'Authorization': 'Bearer ' + this.data.token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        //先判断着是否过期400，防止倒计时完毕时出错未触发失效订单
        if (res.statusCode == 400) {
          wx.showToast({
            title: "订单过期",
            icon: "none",
            duration: 1500
          })
          return
        }
        if (res.statusCode == 500) {
          wx.showToast({
            title: "微信支付内部错误",
            icon: "none",
            duration: 1500
          })
          return
        }
        let data = res.data.data
        console.log(data);
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': 'MD5',
          'paySign': data.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1500,
              mask: true,
              success: function () {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '../order/order?i=1'
                  })
                }, 1500);
              }
            })
          },
          'fail': function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {}
    })
  },
  gain(e) {
    let self = this
    //确认收货
    let i = e.currentTarget.dataset.i
    let data = {
      orderFormId: this.data.takes[i].id,
      state: 7
    }
    wx.showModal({
      title: '温馨提示',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          utils.setData(self, service.updateOrderForm, data, function (res) {
            console.log(res);
            wx.showToast({
              title: '确认收货成功',
              icon: 'success',
              duration: 1500,
              wrap: true
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../evaluation/evaluation?id=' + data.orderFormId
              })
            }, 1500);
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  fail_cb() {
    wx.hideLoading()
    wx.showToast({
      title: '操作失败,请检查网络',
      icon: 'none',
      duration: 2000
    })
  },
  //待支付
  initPays() {
    //计算待支付的创建时间creat_time以及现在时间now，差值为time单位秒
    //返回布尔值isLose，为true说明有失效订单，就不用调用倒计时
    let self = this
    let isLose = false
    if (!this.data.pays.length) {
      return isLose
    }
    this.data.pays.forEach(arr => {
      let year = arr.id.slice(0, 4)
      let month = arr.id.slice(4, 6)
      let day = arr.id.slice(6, 8)
      let hour = arr.id.slice(8, 10)
      let minute = arr.id.slice(10, 12)
      let second = arr.id.slice(12, 14)
      let now = new Date()
      arr.creat_time = new Date(year, month - 1, day, hour, minute, second)
      arr.time = Math.floor((now - arr.creat_time) / 1000)
    })
    this.setData({
      pays: this.data.pays
    })
    this.data.pays.forEach((arr, i) => {
      if (arr.time > this.data.ddl) {
        isLose = true
        console.log('失效');
        let data = {
          orderFormId: arr.id,
          state: 5
        }
        utils.setData(self, service.updateOrderForm, data, function (res) {
          console.log(res);
          wx.showToast({
            title: '存在失效订单',
            icon: 'none',
            duration: 1500,
            wrap: true
          })
          setTimeout(() => {
            wx.redirectTo({
              url: './order?i=4'
            })
          }, 1500);
        })
      }
    })
    return isLose
  },
  //待支付倒计时判断
  countDown() {
    let self = this
    let timer = setInterval(() => {
      if (!this.data.pays.length) {
        clearInterval(timer)
        this.setData({
          timer: null
        })
        return
      }
      console.log('定时器还在');
      this.data.pays.forEach((arr, i) => {
        arr.time++
          if (arr.time > this.data.ddl) {
            console.log('失效');
            let data = {
              orderFormId: arr.id,
              state: 5
            }
            utils.setData(self, service.updateOrderForm, data, function (res) {
              console.log(res);
              wx.showToast({
                title: '存在失效订单',
                icon: 'none',
                duration: 1500,
                wrap: true
              })
              clearInterval(timer)
              setTimeout(() => {
                wx.redirectTo({
                  url: './order?i=4'
                })
              }, 1500);
            })
          }
      })
      self.setData({
        pays: self.data.pays,
        timer,
      })
    }, 1000)
  },
  //10分钟内未付款时或点击取消订单
  cancle(e) {
    let self = this
    let i = e.currentTarget.dataset.i
    let data = {
      orderFormId: this.data.pays[i].id,
      state: 5
    }
    wx.showModal({
      title: '温馨提示',
      content: '是否确认取消订单？',
      success: function (res) {
        if (res.confirm) {
          utils.setData(self, service.updateOrderForm, data, function (res) {
            console.log(res);
            wx.showToast({
              title: '取消订单成功',
              icon: 'success',
              duration: 1500,
              wrap: true,
              success: function () {
                setTimeout(() => {
                  wx.redirectTo({
                    url: './order?i=4'
                  })
                }, 1500);
              }
            })

          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  //待发货
  //退款
  refund(e) {
    let self = this
    let i = e.currentTarget.dataset.i
    let data = {
      orderFormId: this.data.waits[i].id
    }
    wx.showModal({
      title: '温馨提示',
      content: '是否确认退款？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: "加载中"
          })
          utils.setData(self, service.wxRefund, data, function (res) {
            console.log(res);
            wx.hideLoading()
            if (res.statusCode == 500) {
              wx.showToast({
                title: '服务器出错了，请重试',
                icon: 'none',
                duration: 2000,
                success: function () {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: './order?i=1'
                    })
                  }, 1500);
                }
              })
            } else {
              wx.showToast({
                title: '退款成功',
                icon: 'success',
                duration: 1500,
                wrap: true,
                success: function () {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: './order?i=4'
                    })
                  }, 1500);
                }
              })
            }

          })
        } else if (res.cancel) {
          return
        }
      }
    })

  },
  //提醒发货
  remind() {
    wx.showToast({
      title: '已联系商家，将尽快发货',
      icon: 'none',
      duration: 2000
    })
  }
})