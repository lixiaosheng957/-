// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //微信登录
  async onLoginHandle(){
    let {confirm}=await wx.showModal({title:"登录",content:"是否确认登录",confirmText:"确认"})
    if(confirm){
      wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
    }
  }
})