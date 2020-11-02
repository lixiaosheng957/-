
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    phoneNumber:18178122263
  },
  onMakePhoneHandle:function(){
    wx.showLoading({
      title: '加载中',
    })
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
      success:res=>{
        wx.hideLoading()
      },
      fail:res=>{
        wx.hideLoading()
        wx.showToast({
          title: '拨打失败',
          icon: 'none',
          duration: 2000
        })

      }
    })
  },
  onLoad: function(option){

    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data=> {
      this.setData({
        order:{...data.data}
      })
    })
  },
  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  
})