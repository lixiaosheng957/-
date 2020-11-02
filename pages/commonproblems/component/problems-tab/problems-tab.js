Component({
  /**
   * 组件的属性列表
   */
  properties: {
    problemType:{
      type:Object
    },
    index:Number,
    length:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //页面跳转
    onNavigetorHandle(event){
      let {path:url}=event.currentTarget.dataset
      wx.navigateTo({url:url})  
    }
  }, 
})
