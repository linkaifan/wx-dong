import request from './request'
const Detail = {
  getOneGood(goodsId) {
    return request({
      data: {
        goodsId,
      },
      errMsg: '请求商品失败，请稍后重试',
      url: 'selectOneGoods'
    })
  },
  getComments(goodsId) {
    return request({
      data: {
        goodsId,
      },
      errMsg: '请求评价失败，请稍后重试',
      url: 'selectCommentByGoodsId'
    })
  }
}
module.exports = Detail;