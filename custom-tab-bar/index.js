// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "selectIndex":3,
    "color":'#555555',
    "selectColor":"#1FCEB3",
    "list":[
      {"pagePath":"/pages/order/order","text":"点餐","iconPath":"/image/menuorder@2x.png","selectedIconPath":"/image/menuorder@2x.png"},
      {"pagePath":"/pages/shoppingcar/shoppingcar","text":"购物车","iconPath":"/image/menucart@2x.png","selectedIconPath":"/image/menucart@2x.png"},
      {"pagePath":"/pages/menunotice/menunotice","text":"餐牌预告","iconPath":"/image/menuforetell@2x.png","selectedIconPath":"/image/menuforetell@2x.png"},
      {"pagePath":"/pages/me/me","text":"我的","iconPath":"/image/menumy@2x.png","selectedIconPath":"/image/menumy@2x.png"}
    ],
    count: 0
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听tabbar选中
    async onselectBarHandle(event){
        
        let data=event.currentTarget.dataset
        let url=data.path
        wx.switchTab({url})
        this.setData({selectIndex:data.index})
        
    },
  },
  lifetimes:{
    attached(){
      this.setData({
        count:wx.getStorageSync('total_num')||0
      })
    }
  }
})
