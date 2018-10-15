const request = (params) => {
	return new Promise((resolve, reject) => {
		wx.showLoading({
			mask: true
		});
		wx.request({
			url: `https://www.dongpinhui.xyz:8443/${params.url}`,
			method: params.method || 'GET',
			header: params.header || {
				Authorization: ('Bearer '+wx.getStorageSync('token') )|| ''
			},
			data: { ...params.data},
			success: (res) => {
				switch (res.statusCode) {
					case 200:
						resolve(res.data);
						break;
					default:
						reject(res);
						break;
				}
			},
			fail: (err)=> {
				reject(err)
			},
			complete: wx.hideLoading,
		});
	}).catch((err)=>{
		console.log(err);		
		wx.showToast({
			title: params.errMsg || '数据请求失败',
			icon: 'none'
		})
	});
};
export default request;