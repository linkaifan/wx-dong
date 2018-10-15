import request from './request' 
const Home = {
  getCity(){
    return request({
      url: 'getCity'
    })
  },
  getBannerPicture(){
    let data = {};
    if (wx.getStorageSync('cityId')) {
      data['cityId'] = wx.getStorageSync('cityId')
    }
    return request({
      data,
      url: 'getBannerPicture'
    })
  },
  getSpecial(state,num){  
    let data = {
      state,
      num
    };
    if (wx.getStorageSync('cityId')) {
      data['cityId'] = wx.getStorageSync('cityId')
    }
    return request({
      data,
      url: 'selectStateGoods'
    })    
  },
  getDiscounts(num){
    return this.getSpecial(3,num)
  },
  getRecommendations(num){
    return this.getSpecial(2,num)
  },
}
module.exports = Home;