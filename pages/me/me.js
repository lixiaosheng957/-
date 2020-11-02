let setCount=require("../../utils/count")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 未登录的状态
    meItem1: [{
        id: 1,
        url: "/pages/history-order/order",
        img1: "../../image/order.png",
        title: "我的订单",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 2,
        url: "/pages/redEnvelope/redEnvelope",
        img1: "../../image/money.png",
        title: "平台红包",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 3,
        url: "",
        img1: "../../image/costomerservice_icon_hotline.png",
        title: "客服中心",
        content: "40012345678",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 4,
        url: "/pages/feedback/feedback",
        img1: "../../image/costomerservice_icon_feedback.png",
        title: "用户反馈",
        content: "让我们做得更好",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 5,
        url: "/pages/commonproblems/commproblems",
        img1: "../../image/problem.png",
        title: "常见问题",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 6,
        url: "/pages/mobile/mobile",
        img1: "../../image/icon_phone1.png",
        title: "修改手机号",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
    ],

    user1: {
      username: "天使爱美丽",
      phone: "18607102432",
      head: "../../image/head.png"
    },

    meItem: [{
        id: 1,
        url: "/pages/history-order/order",
        img1: "../../image/order.png",
        title: "我的订单",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 2,
        url: "/pages/redEnvelope/redEnvelope",
        img1: "../../image/money.png",
        title: "平台红包",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 3,
        url: "",
        img1: "../../image/costomerservice_icon_hotline.png",
        title: "客服中心",
        content: "40012345678",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 4,
        url: "/pages/feedback/feedback",
        img1: "../../image/costomerservice_icon_feedback.png",
        title: "用户反馈",
        content: "让我们做得更好",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 5,
        url: "/pages/commonproblems/commproblems",
        img1: "../../image/problem.png",
        title: "常见问题",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
      {
        id: 6,
        url: "/pages/mobile/mobile",
        img1: "../../image/icon_phone1.png",
        title: "修改手机号",
        content: "",
        img2: "../../image/costomerservice_icon_arrow.png"
      },
    ],
    user: {
      username: "天使爱美丽",
      phone: "18607102432",
      head: "../../image/head.png"
    },

    login: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selectIndex: 3
      })
    }
    setCount.apply(this)
    let uuid = wx.getStorageSync('uuid')
    if (uuid) {
      let user = wx.getStorageSync('user')
      this.setData({
        "meItem[1].content": user.packet,
        "meItem[5].content": this.setPhone(user.phone),
        user,
        login: true
      })
    }
  },
  onNavigaterHandle(event) {
    let {
      login
    } = this.data
    if (!login) {
      return wx.showToast({
        title: '请先登录',
        icon: "none"
      })
    }
    let {
      url
    } = event.currentTarget.dataset
    wx.navigateTo({
      url
    })
  },

  //隐藏手机号码
  setPhone(phone) {
    return phone.slice(0, 4) + "****" + phone.slice(-4)
  },

  //退出账号
  async onQuitHandle() {
    let {
      confirm
    } = await wx.showModal({
      title: "注销",
      content: "你确定要退书账号吗"
    })
    if (confirm) {
      wx.removeStorageSync('uuid')
      wx.removeStorageSync('user')
      this.setData({
        login: false,
        meItem: this.data.meItem1,
        user:this.data.user1
      })
    }

  }
})