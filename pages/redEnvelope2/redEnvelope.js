// pages/redEnvelope/redEnvelope.js
import api from '../../utils/api'
import { getRed } from '../../utils/conf'
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fullList:null,
    mortgageList:null,
    currentTab:0,
    selected:null,
    redCan:null,
  },
  //红包页和抵押券页切换
  onChageCurrentTabHandle:function(e){
      this.setData({
        currentTab:Number( e.target.dataset.index)
      })
  },
  //红包选择
  onSelectedRedHandle:function(e){
    if (e.currentTarget.dataset.index==this.data.selected) {
      this.setData({
        selected:null
      })
    }else{
      this.setData({
        selected:e.currentTarget.dataset.index
      })
    }
  },
  //
  onUseHandle(){
    
      wx.setStorageSync('redBag',this.data.redCan[this.data.selected])
      wx.setStorageSync('selected',this.data.selected)
      wx.navigateBack({
        delta: 1
      })
      
  },
  onReadyDataHandle:function(){
    let cartList=this.data.cartList
    
    let redList=this.data.fullList

    if(redList.length==0){
      return
    }
    // 存储能够使用的红包                           
    let redCan=[]
    // 存储购物列表每种类型的金额
    let temp= new Array(app.redLength).fill(0)
    let total_price=0
    cartList.forEach(element => {
      temp[element.typeId]+= (element.food_price)*element.food_num
    });
    temp.forEach(element => {
      total_price+=element
    });
    
    redList.forEach(element => {
      if (element.typeId!=999) {
        if (temp[element.typeId]>=element.full) {
          redCan.push(element)
        }
      }else{
        if (element.full<=total_price) {
          redCan.push(element)
        }
      }
    });
    this.setData({
      redCan:redCan
    },res=>{
      // wx.setStorageSync('redCan',this.data.redCan)
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let value = wx.getStorageSync('selected')
    if (value==null) {
      this.setData({
        selected:null
      })
    }else{
      this.setData({
        selected:value
      })
    }
   
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data=> {
      let data1=JSON.parse(JSON.stringify(data.data))
      this.setData({
        cartList:data1,
      })
    })
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
        this.onReadyDataHandle()
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