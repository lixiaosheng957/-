let setCount=require("../../utils/count")
import { postOrder,postOrderNot,getRed } from '../../utils/conf'
import imgUrl from "../../utils/imgUrl"
let mock=require("../../utils/mockData")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //因为不知道有多少个菜，或许可以尝试数组，里面存每一个菜的对象
    // cartList: {
    //   "米饭": { count: 1, price: 3},
    //   "小炒黄牛肉": { count: 2, price: 10}
    // }
    cartList: [],
    total_price: 0,
    total_num: wx.getStorageSync('total_num'),
    redBag: null,
    left:true,
    color1:"#1FCEB3",
    color2:"#666666",
    imgListUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mock("imgurl","GET",imgUrl,1500).then(res=>{
      this.setData({
        imgListUrl:res.data
      })
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selectIndex: 1
      })
    }
    setCount.apply(this)
    if(wx.getStorageSync('total_num') == 0){
      wx.removeStorageSync('selected')
      wx.removeStorageSync('redBag')
    }
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      total_num: wx.getStorageSync('total_num'),
      redBag: wx.getStorageSync('redBag')
    })
    
    this.getTotal()
    // this.onCartChageHandle()
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
    this.onCartChageHandle()
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
  /**
   * 结算跳转
   */
  onOrderSubmitHandle: function() {
    if(this.data.total_price != 0 && wx.getStorageSync('user')){
      wx.navigateTo({
        //price等于价格
        url: '/pages/verify/verify',
        success: res=> {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {data: {cartList: this.data.cartList, total_price: this.data.total_price, redBag: this.data.redBag}})
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请检查商品数量或登录状态',
        success (res) {
          if (res.confirm) {
            if(!wx.getStorageSync('user')){
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }else{
              wx.switchTab({
                url: '/pages/order/order',
              })
            }
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },

  onLessHandle: function (e) {
    var index = e.currentTarget.dataset.index;

    var cartList = this.data.cartList
    cartList[index].food_num --;
    wx.setStorageSync('total_num', wx.getStorageSync('total_num') - 1)

    this.setData({
      cartList: cartList,
      total_num: wx.getStorageSync('total_num')
    },res=>{
      if (this.data.redBag) {
        this.onCartChageHandle()
      }
    })
    wx.setStorageSync('cartList', this.data.cartList)
    this.getTotal()
    setCount.apply(this)
  },

  onAddHandle: function (e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList
    cartList[index].food_num ++;
    wx.setStorageSync('total_num', wx.getStorageSync('total_num') + 1)
    this.setData({
      cartList: cartList,
      total_num: wx.getStorageSync('total_num')
    })
    //实时更新
    wx.setStorageSync('cartList', this.data.cartList)
    this.getTotal()
    setCount.apply(this)
  },


  onActiveHandle(e) {
    if(e.currentTarget.dataset.index==1){
      this.setData({
        left:true,
        imgListUrl:[]
      })
      mock("imgurl","GET",imgUrl,1500).then(res=>{
        this.setData({
          imgListUrl:res.data
        })
      })
    }else{
      this.setData({
        left:false,
        imgListUrl:[]
        
      })
      mock("imgurl","GET",imgUrl,1500).then(res=>{
        this.setData({
          imgListUrl:res.data
        })
      })
    }
  },


























  getTotal: function () {
    var temp_num = 0;
    for(var i = 0; i < this.data.cartList.length; i++){
      temp_num = temp_num + this.data.cartList[i].food_num * this.data.cartList[i].food_price
    }
    var money =  this.data.redBag?parseInt(this.data.redBag.money):0
    this.setData({
      total_price:temp_num - money
    })
  },

  onGoOrderHandle: function () {
    wx.switchTab({
      url: '/pages/order/order',
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
    this.getTotal()
  },

  //获取红包
  onGoRedHandle:function(){
    if(wx.getStorageSync('user')){
      wx.navigateTo({
        url: '/pages/redEnvelope2/redEnvelope',
        success: res=> {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {data: this.data.cartList})
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请您登录',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            
          }
        }
      })
    }
    
  }
})