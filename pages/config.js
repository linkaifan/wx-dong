/**
 * 小程序配置文件
 */
// 此处主机域名
var host = 'https://www.dongpinhui.xyz:8443';

var config = {

	// 下面的地址配合云端 Demo 工作
	service: {
		host,
		//user
		login: host + '/login',
		wxLogin: host + '/wxLogin',
		register: host + '/register',
		getSms: host + '/getSms',
		updatePassword: host + '/updatePassword',
		//个人中心
		selectAddress: host + '/selectAddress',
		updateAddress: host + '/updateAddress',
		deleteAddress: host + '/deleteAddress',
		insertAddress: host + '/insertAddress',
		setDefaultAddress: host + '/setDefaultAddress',
		selectAddressByPrimaryKey: host + '/selectAddressByPrimaryKey',
		selectDefaultAddress: host + '/selectDefaultAddress',
		//home
		getBannerPicture: host + '/getBannerPicture',
		getCity: host + '/getCity',
		selectStateGoods: host + '/selectStateGoods',
		//goodlist搜索结果页
		selectGoods: host + '/selectGoods',
		//商品详情页
		selectOneGoods: host + '/selectOneGoods',
		//type分类页
		smallType: host + '/smallType',
		selectTypeGoods: host + '/selectTypeGoods',
		//购物车
		shoppingCar: host + '/shoppingCar',
		updateShoppingCar: host + '/updateShoppingCar',
		//订单
		selectOrderForm: host + '/selectOrderForm',
		selectOrderFormById: host + '/selectOrderFormById',
		createOrderForm: host + '/createOrderForm',
		updateOrderForm: host + '/updateOrderForm',
		selectOrderFormById: host + '/selectOrderFormById',
		//商品评价
		createComment: host + '/createComment',
		selectCommentByGoodsId: host + '/selectCommentByGoodsId',
		//支付
		wxPay: host + '/wxPay',
		wxRefund: host + '/wxRefund',
	},
	utils: {
		getData: function (self, url, setData, data, header, succ_cb) {	
			wx.request({
				url: url,
				method: "GET",
				data,
				header,
				success: function (res) {
					self.setData({
						[setData]: res.data
					})
					if (succ_cb) {
						succ_cb(res)
					}				
				},
				fail: function () {
					wx.showToast({
						title: `获取${setData}失败`,
						duration: 2000,
						icon: "none"
					})
				}
			})
		},
		setData: function (self, url, data, succ_cb, fail_cb) {
			wx.request({
				url: url,
				method: "GET",
				data,
				header: {
					'Authorization': 'Bearer ' + self.data.token
				},
				success: function (res) {
					succ_cb(res)
				},
				fail: function (err) {
					if (fail_cb) {
						fail_cb(err)
					}					
				}
			})
		},
	}
};

module.exports = config;