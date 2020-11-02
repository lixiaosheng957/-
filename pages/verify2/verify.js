
import api from '../../utils/api'
import { postOrder,postOrderNot,getRed } from '../../utils/conf'
const app = getApp()
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
    redBag:null,
    tablewareList:[0,1,2,3,4,5],
    remakeList:["口味、偏好","不要辣","微辣","中辣","变态辣"],
    index:0,
    indexRemake:0,
    cartList:null,
    order: null,
    total_price: null,
    redList:null,
    redCan:null,
    redBag:null
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
    let cartList = this.data.cartList
    let total_price=0
    cartList.forEach(element => {
      total_price+=element.food_num*element.food_price
   });
    this.setData({
      total_price:total_price
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let value = wx.getStorageSync('redBag')
    this.setData({
      redBag:value
    })
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data=> {
      let data1=JSON.parse(JSON.stringify(data.data))
      this.setData({
        order:data1,
        cartList:data1.row_list,
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
    wx.removeStorageSync('selected')
    wx.removeStorageSync('redBag')
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

  onBindPickerChangeHandle:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  onBindPickerChange2Handle:function(e){
    this.setData({
      indexRemake: e.detail.value
    })
  },
  //去支付处理
  onGoPayHandle: function(){
    wx.showModal({
      title: '提示',
      content: '是否确认支付？',
      success:res=> {
        if (res.confirm) {
          wx.showLoading({
            title: '支付中',
          })
          let totalPrice =(this.data.redBag?(this.data.total_price-this.data.redBag.money<=0?0.01:this.data.total_price-this.data.redBag.money):this.data.total_price)
          api.post(postOrder,{
            address:this.data.userInfo.address,
            user:this.data.userInfo.userName,
            phone:this.data.userInfo.phone,
            rowList:this.data.cartList,
            redId:this.redBag,
            mode:"微信支付",
            tableWareNum:this.data.tablewareList[this.data.index],
            totalPrice:totalPrice,
            remark:this.data.remakeList[this.data.indexRemake]
          }).then(res=>{
            wx.hideLoading()
            if (res.code==200) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1500
              })
              wx.redirectTo({
                url: '/pages/paySuccess/paySuccess?price=' + totalPrice,
              })
            }else{
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 1500
              })
            }
          
          }).catch(res=>{
              wx.hideLoading()
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 1500
              })
            })
        } else if (res.cancel) {
          wx.showLoading({
            title: '加载中',
          })
          api.post(postOrderNot,{
            address:this.data.userInfo.address,
            user:this.data.userInfo.userName,
            phone:this.data.userInfo.phone,
            redId:this.redBag,
            rowList:this.data.cartList,
            tableWareNum:this.data.tablewareList[this.data.index],
            totalPrice:this.data.total_price,
            remark:this.data.remakeList[this.data.indexRemake]
          }).then(res=>{
            wx.hideLoading()
            wx.reLaunch({
              url: '/pages/history-order/order'
            })
          }).catch(res=>{
            wx.hideLoading()
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 1500
              })
            })
        }
      }
    })
   
  },

  onLessHandle: function(e){
    let index = e.currentTarget.dataset.index;
    let total_price=0;
    let cartList = this.data.cartList;
    let length=cartList.length;
    let redBag=this.data.redBag
    if (length==1&&cartList[index].food_num==1) {
      wx.showModal({
        content: "数量不能再减了"
      })
      return ;
    }else if(cartList[index].food_num>1){
      cartList[index].food_num--;
    }else{
      cartList.splice(index,1)
    }
    cartList.forEach(element => {
       total_price+=element.food_num*element.food_price
    });
    this.setData({
      cartList: cartList,
      total_price:total_price
    },res=>{
      if (redBag) {
        this.onCartChageHandle()
      }
    })
  },
  //结算页购物车改变红包加载情况
  onCartChageHandle:function(){
    let cartList=this.data.cartList
    let total_price=this.data.total_price
    let redBag=this.data.redBag
    let temp= new Array(app.redLength).fill(0)
    cartList.forEach(element => {
      temp[element.typeId]+= (element.food_price)*element.food_num
    });
    if (redBag.typeId!=999) {
      if (temp[redBag.typeId]<redBag.full) {
         this.setData({
           redBag:null
         })
         wx.removeStorageSync('selected')
         wx.removeStorageSync('redBag')
      }
    }else{
      if (total_price<redBag.full) {
        this.setData({
          redBag:null
        })
        wx.removeStorageSync('selected')
        wx.removeStorageSync('redBag')
     }
    }
  },
  onAddHandle: function(e){
    var index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList
    let total_price=0
    cartList[index].food_num ++;
    cartList.forEach(element => {
      total_price+=element.food_num*element.food_price
   });
    this.setData({
      cartList: cartList,
      total_price:total_price
    })
  },

  onGoRedHandle:function(){
    wx.navigateTo({
      url: '/pages/redEnvelope2/redEnvelope',
      success: res=> {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {data: this.data.cartList})
      }
    })
  }
})