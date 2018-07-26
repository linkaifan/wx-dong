// common/nbtn/nbtn.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good: Object,
    goodid: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //购物车商品+,-数量,+：{mode:'1'},-:{mode:'0'}
    edit(e) {
      //判断是否已登录
      if (!wx.getStorageSync('token')) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000,
          mask: true,
          complete: function () {
            setTimeout(() => {
              wx.navigateTo({
                url: '../user/user'
              })
            }, 2000);
          }
        })
        return
      }
      let mode = e.currentTarget.dataset.mode
      let shops = app.globalData.shops
      let self = this
      let properties = this.properties
      this.setData({
        good: this.properties.good
      })
      //点击事件控制的商品在购物车里的序号
      let indexOfShops = -1;
      if (mode == 1) {
        //加1          
        properties.good.buyNum++
        app.globalData.total++
        app.globalData.sum += properties.good.price
        this.setData({
          good: this.properties.good,
        })
        if (properties.good.buyNum == 1) {
          //说明是购物车shops新增商品
          console.log("新增商品进入购物车shops");
          shops.push({
            goodsId: this.properties.goodid,
            buyNum: this.data.good.buyNum,
            priceId: this.data.good.id,
            isCheck: false
          })
        } else {
          shops.forEach((item, index) => {
            //排除第一次编辑的时候连续添加2件以上商品从而没goods属性报错
            if (!item.goods) {
              if (properties.good.id == item.priceId && properties.goodid == item.goodsId) {
                indexOfShops = index    
                shops[indexOfShops].buyNum = properties.good.buyNum           
              }                          
            } else {              
              if (properties.good.id == item.price.id && properties.goodid == item.goods.id) {
                indexOfShops = index
                shops[indexOfShops].price.buyNum = properties.good.buyNum
              }                         
            }
          });                    
        }

      } else if (mode == 0) {
        //减1
        this.properties.good.buyNum--
          app.globalData.total--
          app.globalData.sum -= properties.good.price
        this.setData({
          good: this.properties.good
        })
        shops.forEach((item, index) => {
          //排除第一次编辑的时候连续添加2件以上商品从而没goods属性报错
          if (!item.goods) {
            if (properties.good.id == item.priceId && properties.goodid == item.goodsId) {
              indexOfShops = index
            }
          } else {
            if (properties.good.id == item.price.id && properties.goodid == item.goods.id) {
              indexOfShops = index
            }
          }
        });
        if (this.properties.good.buyNum == 0) {
          //说明是购物车shops删除商品
          console.log("删除购物车商品shops");
          shops.splice(indexOfShops, 1)
        } else {
          if (!shops[indexOfShops].goods) {
            shops[indexOfShops].buyNum = properties.good.buyNum
          }else{
            shops[indexOfShops].price.buyNum = properties.good.buyNum
          }         
        }
      }
      this.triggerEvent('updata')
      console.log('nbtn编辑后shops：');
      console.log(shops);
    },
  }
})