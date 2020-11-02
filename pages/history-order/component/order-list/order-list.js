// pages/order/component/order-list/order-list.js
import api from '../../../../utils/api'
import {  
  getOrderList,
  postOrder,
  getRed,
  postSureOrder,
  cancelOrder,
  refund } from '../../../../utils/conf'
Component({
  /**
   * 组件的属性列表
   */
  externalClasses:['my-class'],
  properties: {
    orderInfo:Object,
    index:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderInfo1:null
  },
  
  /**
   * 组件的方法列表
   */
  methods: { 

    // 再来一单OR去支付
    onAnotherOrderHandle:function(e){
      wx.removeStorageSync('selected')
      wx.removeStorageSync('redBag')
      wx.navigateTo({
        url: '/pages/verify2/verify',
        success: res=> {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {data: this.properties.orderInfo})
        }
      })
    },
    // 确认订单
    onSureOrderHandle:function(e){
      let index=e.currentTarget.dataset.index
      wx.showModal({
        title: '提示',
        content: '是否确认收货？',
        success:res=> {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            api.post(postSureOrder,{id:this.properties.orderInfo.id})
            .then(res=>{
              this.triggerEvent("up",{index:index,status:9},)
              if (res.code==200) {
                wx.showToast({
                  title: '确认成功',
                  icon: 'success',
                  duration: 1500
                })
              }
            })
            .catch(res=>{
              console.log(res);
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    },
    //取消订单
    onCancelOrderHandle:function(e){
      let index=e.currentTarget.dataset.index
      wx.showModal({
        title: '提示',
        content: '是否确认取消？',
        success:res=> {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            api.post(cancelOrder,{id:this.properties.orderInfo.id})
            .then(res=>{
              this.triggerEvent("up",{index:index,status:-1})
              if (res.code==200) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1500
                })
              }
            })
            .catch(res=>{
              console.log(res);
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    },
    //申请退款
    onRefundHandle:function(e){
      let index=e.currentTarget.dataset.index
      wx.showModal({
        title: '提示',
        content: '是否申请退款，且取消订单？',
        success:res=> {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            api.post(refund,{id:this.properties.orderInfo.id})
            .then(res=>{
              this.triggerEvent("up",{index:index,status:-4})
              if (res.code==200) {
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 1500
                })
              }
            })
            .catch(res=>{
              console.log(res);
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  }
})
