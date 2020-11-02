// pages/redEnvelope/redEnvelope.js
import api from '../../utils/api'
import { getRed } from '../../utils/conf'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullList:null,
    mortgageList:null,
    currentTab:0
  },


  //红包页和抵押券页切换
  onChageCurrentTabHandle:function(e){
      this.setData({
        currentTab:Number( e.target.dataset.index)
      })
  },
  //
  onGoUseHandle(){
    wx.switchTab({
      url: '/pages/order/order'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    api.get(getRed,{data:''})
    .then(res=>{
      this.setData({
        fullList:res.fullReduction,
        mortgageList:res.mortgage
      },res=>{
        wx.hideLoading()
      })
    })
    .catch(res=>{
      console.log(res);
    })
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
    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selectIndex:3
      })
    }
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selectIndex: 2
      })
    }
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