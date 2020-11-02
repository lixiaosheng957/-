let {getData} = require("../../utils/getData")
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paysTest: [
      // {
      //   question: "订单显示未支付成功，款项却被扣了，怎么办？",
      //   answer: "这个情况属于第三方交易平台付款延迟问题，我们会立即将扣款退回到您的微信账户余额。这个情况属于第三方交易平台付款延迟问题，我们会立即将扣款退回到您的微信账户余额。这个情况。"
      // },
      // {
      //   question: "怎么查看退款是否成功？",
      //   answer: "退款会在一个工作日之内到美团账户余额，可在“账号管理——我的账号”中查看是否到账。"
      // },
      // {
      //   question: "在线支付取消订单后钱怎么返还？",
      //   answer: "订单取消后，款项会在一个工作日内，直接返还到您的美团账户余额。"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let {
      issue: id,
      title
    } = options
    wx.setNavigationBarTitle({
      title
    })
    wx.showLoading()
    let res = "";
    try {
      res = await getData(`/orders/issue?issue=${id}`,{},"post")
    } catch (e) {
      return wx.showToast({
        title: '数据获取失败',
        icon: "none"
      })
    } finally {
      wx.hideLoading()
    }
    if (res.status === 200) {
      let {
        list: paysTest
      } = res.data
      return this.setData({
        paysTest
      })
    }

    wx.showToast({
      title: '数据获取异常',
      icon: 'none'
    })
  },

  //拨打客服热线
  onCallHandle() {
    try{
      wx.makePhoneCall({
        phoneNumber: app.phone
      })
    }catch(e){

    }
  }
})