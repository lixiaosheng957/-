import verification from "../../utils/verification-code";
let mock=require("../../utils/mockData");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canGetVcode:false,
    getVcodeColor:"",
    canNotGetVcodeColor:"#778899",
    phoneNumber:"",
    getVCodeContent:"获取验证码",
    Vcode:""
  },


//监听手机号输入框的变化

onPhoneNumberHandle(e){
  //验证用户输入的手机号的格式是否正确
  if(/^1[3456789]\d{9}$/.test(this.data.phoneNumber)){
    this.setData({
      canGetVcode:true
    })
  }else{
    this.setData({
      canGetVcode:false
    })
  }
},

//监听点击获取验证码

onGetVcodeHandle(){
  if(this.data.canGetVcode){
    let time=60;

  //点击获取验证码后，60秒内不能重复获取

    let timer=setInterval(() => {
      this.setData({
        getVCodeContent:`${time--}S`,
        canGetVcode:false
      });
      if(time==0){
        clearInterval(timer);
        this.setData({
          getVCodeContent:"获取验证码",
          canGetVcode:true
        })
      }
    }, 1000);
    mock("getVcode","GET",verification.verificationCode,5000).then((res)=>{
      this.setData({
        Vcode:res.data,
      })
    })
  }else{

  }
},

//监听确认按钮

onSubmitHandle(){
  //判断用户是否输入验证码
  if(this.data.Vcode){
    wx.showLoading({
      title: '请稍后'
    })
    mock("getVcode","POST",this.data.Vcode,2000).then((res)=>{
      if(res.statusCode==200){
        // wx.setStorageSync('phoneNumber', this.data.phoneNumber);
        let user=wx.getStorageSync("user")
        user.phone=this.data.phoneNumber
        wx.setStorageSync('user', user)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '修改成功',
              icon:"success",
              success(){
                wx.switchTab({
                  url: '../../pages/me/me',
                })
              }
            })
          },
        })
      }
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