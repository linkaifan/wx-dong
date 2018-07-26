// common/good/good.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good:Object
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
    updata(){
      this.triggerEvent('updata')     
    },
    toDetail(){
      let goodid = this.properties.good.id
      wx.navigateTo({
        url: '../detail/detail?goodsId='+goodid
      })  
    }
  }
})
