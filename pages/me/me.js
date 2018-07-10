// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressItems:[
      {
        contact:"广工吴彦祖",
        phone:"15521153111",
        address:"广东省广州市番禺区小谷围街道广东工业大学xxxxxxxxxxxxx",
        place:["广东省","广州市","番禺区"],
        isChecked:true,
        id:0,
      },
      {
        contact:"广工vtmer",
        phone:"15521153222",
        address:"广东省广州市番禺区小谷围街道广东工业大学xxxxxxxxxxxxx",
        place:["广东省","广州市","番禺区"],
        isChecked:false,
        id:1
      },
      {
        contact:"广工吴彦祖",
        phone:"15521153333",
        address:"广东省广州市番禺区小谷围街道广东工业大学xxxxxxxxxxxxx",
        place:["广东省","广州市","番禺区"],
        isChecked:false,
        id:2
      },
    ],
    detail:{
      contact:"",
      phone:"",
      address:"",  
      place:["广东省","广州市","番禺区"],
      //在点击完成时判断是否为-1，是的话就执行新增
      id:-1
    },
    isShow:false
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
  radioChange(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let index = e.detail.value
    this.data.addressItems.forEach(item => {
      item.isChecked = false;
    });
    this.data.addressItems[index].isChecked = true;
    this.setData({
      addressItems:this.data.addressItems
    })
  },
  bindKeyInput: function(e) {
    let key = e.currentTarget.dataset.key
    console.log(key);  
    this.data.detail[key] = e.detail.value
    this.setData({
      detail:this.data.detail
    })
  },
  showWrap(e){
    let index = e.currentTarget.dataset.index;
    if (index != -1) {    
      this.data.detail = this.data.addressItems[index]
    }       
    this.setData({
      detail:this.data.detail,
      isShow:true
    })   
  },
  complete(){
    if (this.data.detail.id != -1) {
      //修改
    }else{
      //新增
      
    }
  },
  close(){
    this.setData({
      isShow:false,
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.detail.place = e.detail.value
    this.setData({
      detail: this.data.detail
    })
  }
})