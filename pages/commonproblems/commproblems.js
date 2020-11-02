let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemType:[
      {id:1,title:"支付问题",url:"/pages/pays/pays?issue=1&title=支付问题"},
      {id:2,title:"订单问题",url:"/pages/pays/pays?issue=2&title=订单问题"},
      {id:3,title:"优惠问题",url:"/pages/pays/pays?issue=3&title=优惠问题"},
      {id:4,title:"其他问题",url:"/pages/pays/pays?issue=4&title=其他问题"},
    ]
  }, 

  //拨打客服电话
  onCallHandle(){
    try{
      wx.makePhoneCall({
        phoneNumber: app.phone
      })
    }catch(e){

    }
   
  }
 
})