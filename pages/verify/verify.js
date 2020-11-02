// pages/verify/verify.js
import api from '../../utils/api'
import { postOrder } from '../../utils/conf'
let {getData}=require("../../utils/getData")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      address:"门诊大楼消化内科3楼301室",
      userName:"Amilkey",
      phone:"18607123456"
    },
    cartList: null,
    total_price: null,
    tableware_Number: ["无需餐具，绿色环保", "1份", "2份", "3份", "4份", "5份", "6份", "7份", "8份", "9份", "10份", "10份以上"],
    tableware_Index: -1,
    order_Notes: ["不要辣", "微辣", "中辣", "变态辣"],
    notes_Index: -1,
    redBag: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data=> {
      let data1=JSON.parse(JSON.stringify(data.data))
      console.log(data1)
      this.setData({
        cartList: data1.cartList,
        total_price: data1.total_price,
        redBag: data1.redBag
      })
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

  },

  onRemoveStorageHandle:async function(){
    //清除缓存中的内容
    wx.removeStorageSync('cartList')
          
    //默认支付成功，不然在支付成功后调用下面一段代码
    wx.setStorageSync('total_num', 0)

    let res=await getData("/orders/variety",null,"post")
    console.log(res)
    wx.setStorageSync('variety', res)
    // wx.setStorageSync('cartList', [])
  },

  //去支付处理
  onGoPayHandle:function(){
    wx.showLoading({
      title: '支付中',
    })
    api.post(postOrder,{
      address:this.data.userInfo.address,
      user:this.data.userInfo.userName,
      phone:this.data.userInfo.phone,
      rowList:this.data.cartList,
      mode:"微信支付",
      tableWareNum:this.data.tableware_Index>=0?this.data.tableware_Number[this.data.tableware_Index]:"未选择",
      totalPrice:this.data.total_price,
      remark:this.data.notes_Index>=0?this.data.order_Notes[this.data.notes_Index]:"口味、偏好"
    }).then(res=>{
      wx.hideLoading()
      if (res.code==200) {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1500
        })
        
        this.onRemoveStorageHandle()
        wx.redirectTo({
          url: '/pages/paySuccess/paySuccess?price=' + this.data.total_price,
        })
      }else{
        wx.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 1500
        })
        this.onRemoveStorageHandle()
      }
    
    },res=>{
      wx.hideLoading()
      wx.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 1500
      })
      this.onRemoveStorageHandle()
    })
    
    
  },

  onBindPickerChangeHandle: function(e) {
    this.setData({
      tableware_Index: e.detail.value
    })
  },

  onBindNotesChangeHandle: function(e) {
    this.setData({
      notes_Index: e.detail.value
    })
  },
})