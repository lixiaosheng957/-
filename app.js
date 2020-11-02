
App({
  globalData:{
    host:"https://localhost:8080",
    getFoodListUrl:"http://loacalhost:3000"
  },
  baseUrl:"http://localhost:3000",
  //客服电话
  phone:"10086",
  //红包类型总数
  redLength:8,
  onLaunch(){
    
  },
  onHide () {
    wx.removeStorageSync('selected')
    wx.removeStorageSync('redBag')
  },
  
})
