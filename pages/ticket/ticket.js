// pages/ticket/ticket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testArray:[
      {name1: '中晚餐饭票 - 3元立减券×10张', price1: '¥10', originalPrice: null, xuLine:false, discount: '立减3元x10次', saveMoney: '单单省钱 包月通用'},
      {name1: '中晚餐饭票 - 4元立减券×10张', price1: '¥10', originalPrice: '¥30', xuLine:true, discount: '立减3元x10次', saveMoney: '单单省钱 包月通用'},
      {name1: '中晚餐饭票 - 5元立减券×10张', price1: null, originalPrice: null, xuLine:false, discount: '立减3元x10次', saveMoney: '单单省钱 包月通用'},
      {name1: '中晚餐饭票 - 6元立减券×10张', price1: '¥23', originalPrice: '¥30', xuLine:true, discount: '立减3元x10次', saveMoney: '单单省钱 包月通用'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})