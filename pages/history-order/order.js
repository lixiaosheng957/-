import api from '../../utils/api'
import { getOrderList } from '../../utils/conf'
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    loadingTime:1,
    show:true,
    animated:true,
    canLoading:true
  },


  onToOrdertailsHandle:function(e){
    let index=e.target.dataset.index
    let orderList=this.data.orderList
    wx.navigateTo({
      url: '/pages/orderdetails/orderdetails',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {data: orderList[index]})
      }
    })
  },
  _up(e) { //e为子组件传过来的值
    // console.log(e);    
    this.setData({
      [`orderList[${e.detail.index}].status`]:e.detail.status
    })
  },

onGetMoreHandle(){
  if(this.data.loadingTime<4){
   let orderList= this.data.orderList
    api.get(getOrderList,{data:''})
    .then(res=>{
      let temp=orderList.concat(res.orderList)
      // orderList.push(temp)
      this.setData({
        orderList:temp,
        loadingTime:this.data.loadingTime+1
      },res=>{
      })
    })
    .catch(res=>{
      console.log(res);
    })
  }else{
    this.setData({
      canLoading:false
    })
  }

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
    wx.showLoading({
      title: '加载中',
    })
    api.get(getOrderList,{data:''})
    .then(res=>{
      this.setData({
        orderList:res.orderList
      },res=>{
        wx.hideLoading()
      })
    })
    .catch(res=>{
      console.log(res);
    })
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