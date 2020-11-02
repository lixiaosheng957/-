module.exports=function setCount(){
  this.getTabBar().setData({
    count:wx.getStorageSync('total_num')
  })
}