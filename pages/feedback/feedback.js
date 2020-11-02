let {getData}=require("../../utils/getData")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:"../../image/iconfont-yuanquan.svg",
    selectIcon:"../../image/feedback_icon_selected.svg",
    issuemold:[
      [{id:1,title:"提意见",bool:false},{id:2,title:"软件错误",bool:false},],
      [{id:3,title:"新功能错误",bool:false},{id:4,title:"其他",bool:false},],
    ],
    //意见反馈
    feed:{
      title:"",
      content:""
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  initHandle(){
    let {issuemold}=this.data
    let issuemold1=[...issuemold[0],...issuemold[1]]

    issuemold1.forEach(item=>{
      item.bool=false
    })
    let feed={
      title:"",
      content:""
    }
    this.setData({
      issuemold,feed
    })
  },
  //监听问题类型选中
  onMoldHandle(event){
    let {id,title}=event.currentTarget.dataset.item1
    let {issuemold,feed}=this.data
    let issuemold1=[...issuemold[0],...issuemold[1]]

    issuemold1.forEach(item=>{
      item.bool=false;
      if(item.id===id){
        item.bool=true
        feed.title=title
      }
    })

    this.setData({
      issuemold
    })
  },

  //存储输入的意见内容
  onInputHandle(event){
    let {value}=event.detail
    this.setData({
      "feed.content":value
    })
  },




  //提交意见反馈
  async onSubmitHandle(){
    let {feed}=this.data
    wx.showLoading({title: '意见反馈中'})
    let {data:res}=await getData("/orders/feedback",feed,"post");
    wx.hideLoading()
    if(res.status===200){
      this.initHandle()
      return wx.showToast({
        title: '意见反馈成功',
        icon:"success",
        duration:5000,
        success(){
          wx.navigateBack({
            delta:1
          })
        }
      })
    }
    return wx.showToast({
      title: '意见反馈失败',
      icon:"none"
    })
  }
})