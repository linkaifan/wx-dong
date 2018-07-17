// common/nbtn/nbtn.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good: Object
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
      let mode = e.currentTarget.dataset.mode
      if (mode == 1) {
        //加1  
        this.triggerEvent('add',e)
      } else if (mode == 0) {
        //减1
        this.triggerEvent('subtract',e)
      }    
    },
  }
})