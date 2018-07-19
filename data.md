## 用户
```
  //字符串还是数字，确定一下。
  login:{    
    phone:0,
    password:0
  },
  register:{
    contact:"",//联系人
    phone:0,
    password:0,
  },
  //找回密码
  forget:{
    phone:0,
    password:0,
  },
  //获取验证码
  {
    phone:0,
  }
```
## 首页：
### 轮播图：
```
  banners:['src1','src2'...]
```
### 专区：
```
  //数组长度最好是偶数
  types:["xx专区","yy专区"...]
```
### 商品详情页：
```
  good: {
    name: '六和 鸭腿',
    weight: '10kg',
    price: 95.00,
    count: 1,
    brand: "新希望六和",
    factory: "广东工业大学",
    seller:'广州番禺 长江桂柳',
    storage: "-18℃",
    shelf: "365",
    note: "一箱约38个，单个质量约260g,减肥啦大家发了大家发垃圾法拉第就樊辣椒劳动法就法拉家纺辣椒粉垃圾法拉第就老夫加大了就",
    //categorys是一个数组，就是有些商品有*12，*6这几种规格
    categorys:[{
      value:"650g*12盒",
      price:22,
      count:1
    },{
      value:"650g*6盒",
      price:11,
      count:1
    }]
  }
```
### 促销，推荐
```
  //促销和推荐，长度6,后台记得设置最少6个
  [{
    
    img:"../../assets/test/1.jpg",
    name:"印度飞饼",
    seller:"广工食品 广州番禺",
    weight:"11 kg",
    price:11,
  },{
    。。。
  }]
  //点击查看更多
  [{
    img:"../../assets/test/1.jpg",
    name:"印度飞饼",
    seller:"广工食品 广州番禺",
    weight:"11 kg",
    priceRange:"22-66",//价格范围
    //categorys是一个数组，就是有些商品有*12，*6这几种规格
    categorys:[{
      value:"650g*12盒",
      price:22,
      count:1
    }]
  }]
```

## 网络请求操作
- config.js中写了两个网络请求的函数，getData,setData
- getData,参数：self,url, setData, data,header
- setData,参数：self,url,data,succ_cb,fail_cb,[请求头已加Authorization]
1. user页没有用到这两个，操作的时候，发起请求request前先弹出Loading,success和fail后再hidden
2. me页中初始化加载数据的时候[onshow],用getData请求数据。在地址操作的时候，发起请求前弹出Loading，fail的时候再hidden[通过第4，5参数传入成功或失败的回调函数]