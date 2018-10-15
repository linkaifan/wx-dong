import request from './request'
const Goodlist = {
  getSearchGoods(message) {
    let data = {
      message,
    };
    if (wx.getStorageSync('cityId')) {
      data['cityId'] = wx.getStorageSync('cityId')
    }
    return request({
      data,
      url: 'selectGoods'
    })
  }
}
module.exports = Goodlist;