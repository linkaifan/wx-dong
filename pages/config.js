/**
 * 小程序配置文件
 */

// 此处主机域名
var host = 'https://www.guohanghuang.cn:8443';

var config = {

	// 下面的地址配合云端 Demo 工作
	service: {
		host,
		//user
		login: host + '/login',
		register: host + '/register',
		getSms: host + '/getSms',
		updatePassword: host + '/updatePassword',
		//个人中心
		selectAddressByUserId: host + '/selectAddressByUserId',
		updateAddress: host + '/updateAddress',
		deleteAddress: host + '/deleteAddress',
		insertAddress: host + '/insertAddress',
		setDefaultAddress: host + '/setDefaultAddress',
		//home
		getBannerPicture: host + '/getBannerPicture',
		getCity: host + '/getCity',
		selectStateGoods: host + '/selectStateGoods',
	},
	utils: {
		getData: function (self,url, setData, data,header) {
			wx.request({
				url: url,
				method: "GET",
				data,
				header,
				success: function (res) {
					self.setData({
						[setData]: res.data
					})					
				},
				fail: function() {
					wx.showToast({
						title: `获取${setData}失败`,
						duration: 2000,
						icon:"none"
					})
				}
			})
		},	
		setData: function (self,url,data,succ_cb,fail_cb) {
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
				fail: function(res) {
					fail_cb(res)
				}
			})
		},
	}
};

module.exports = config;