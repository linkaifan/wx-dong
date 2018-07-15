/**
 * 小程序配置文件
 */

// 此处主机域名
var host = 'https://www.guohanghuang.cn:8443';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        login:host+'/login',
        register:host+'/register',
    }
};

module.exports = config;