let {getData}=require("../../utils/getData")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取code
  async getCode() {
    let {code} = await wx.login()
    wx.setStorageSync("code", code)
  },
  //微信授权登录
  async onImpowerHandle({detail}) {
    
    try {
      await this.getCode()
      let {authSetting}=await wx.getSetting()
      if(authSetting['scope.userInfo']){
        let {avatarUrl,nickName}=detail.userInfo

        //用于获取用户手机号码
        let encryptedData=detail.encryptedData
        let iv=detail.iv

        wx.showLoading({title:"正在登录"})
        let {data:res}=await getData("/orders/login",{code:wx.getStorageSync('code'),avatarUrl,nickName,encryptedData,iv},"post")
        wx.hideLoading()
        if(res.status===200){
          wx.setStorageSync("uuid",res.data.uuid)
          wx.setStorageSync('user',res.data.user)
          return wx.navigateBack({
            delta:2
          })
        }
        wx.showToast({
          title: '登录失败',
          icon:"none"
        })
      }
    } catch (e) {
      return wx.showToast({
        title: "登录异常",
        icon: "none"
      })
    }
  }
})