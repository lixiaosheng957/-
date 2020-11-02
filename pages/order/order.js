import flyCart from '../../utils/flexCart'
// import api from '../../utils/api'
// import { getOrderList } from '../../utils/conf'

// let {getIssue}=require("../../mock/Router")
let setCount=require("../../utils/count")
let {getData}=require("../../utils/getData")
//获取应用实例
const app = getApp()



Page({
  data: {
    variety:null,
    bnrUrl:[
      {url:"./images/banner@2x.png"},
      {url:"./images/banner@2x.png"},
      {url:"./images/banner@2x.png"},
    ],
    indexId: 0,
    toTitle:"type-0",
    scrollTop:0,
    top:[],
    cartPositionX:null,
    cartPositionY:null,
    heightArr:[],
    contentH:null,
    titleTop:[]
  },
  // 点击跳转事件菜单
  onJumpHandle:function(e){
    let index = e.currentTarget.dataset.index;
    let toTitle="type-"+index
    this.setData({
     indexId: index,
     toTitle:toTitle
    });
  },
  onNewSrcoll(e){
   let scrollTop=Math.floor(e.detail.scrollTop) 
   let arr=this.data.titleTop;
   if(scrollTop>=arr[this.data.indexId]&&scrollTop<arr[this.data.indexId+1]){
     return
   }else{
      for (let i = 0; i < arr.length; i++) {
        if ((arr[i] - arr[0] < (scrollTop)) && (i <= arr.length-1  && ((arr[i + 1] - arr[0] > scrollTop)||i===arr.length-1))) {
          if(this.data.indexId!=i){
            this.setData({
              indexId:i
            })
            return
          }
         
        }
       
        // const element = array[i];
        
      }
   }
  
  },

  onScrollToLeftHandle:function(e){
    // clearTimeout( this.timeoutList); 
    // this.timeoutList = setTimeout(() => {
      let scrollTop=e.detail.scrollTop +100
   
      
      let length = this.data.heightArr.length;
      if(scrollTop+this.data.boxHeight>=this.data.contentH){
        this.setData({
          indexId: length-2,
        });
      }else if(scrollTop>this.data.heightArr[this.data.indexId]&&scrollTop<this.data.heightArr[this.data.indexId+1]){      
          return
       }else {
        for(var i=0;i<this.data.heightArr.length;i++){
          if ((this.data.heightArr[i] - this.data.heightArr[0] <= (scrollTop)) && (i <= length-1  && ((this.data.heightArr[i + 1] - this.data.heightArr[0] > scrollTop)))){
            if(this.data.indexId!=i){
            this.setData({
              indexId: i,
            }); 
            }
          }
          }
       }
  // },500)
  },
  //点击购物事件  
   onToCartHandle:function(e){
      let x=e.detail.x.toFixed(2);
      let y=e.detail.y.toFixed(2);
      this.setData({
        bus_x: x,
        bus_y:y,
    })
      let cartY=this.data.cartPositionY
      let cartX=this.data.cartPositionX
      const travelList = flyCart([0,0] ,[ cartX-x,cartY-y],10,100 )
      // this.startAnimation(travelList)
      this.onToCartClickHandle(travelList)
      this.onModifyNumberHandle(e)
   },

   //触发商品数量改变  add用来判断是增加还是减少数量，默认为true
   onModifyNumberHandle: function(e, add=true){
      //将需要购买商品加入缓存中，然后购物车从缓存中读取数据
      //id代表数据所在的大类型在variety中的索引，index代表数据在foodlist中的索引
      var id = e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index
      //判断需不需要增加数据
      let flag = true
      // if (wx.getStorageSync('cartList') != '[]'){
      var cart = wx.getStorageSync('cartList')
      var variety = wx.getStorageSync('variety')
      let varFlag = false
      let varCount = 0
      //循环，判断点击的菜品是否已经存在，如果存在，只改变数量，否则新增
      for(let i = 0;i < cart.length &&  wx.getStorageSync('total_num'); i++){
        for(var varIndex = 0;varIndex < variety.length;varIndex++){
          for(var fooIndex = 0;fooIndex < variety[varIndex].foodlist.length;fooIndex++){
            if(variety[varIndex].foodlist[fooIndex].id == variety[id].foodlist[index].id && variety[id].foodlist[index].id == cart[i].id){
              varCount++
              varFlag = true
              flag = false
              if(add){
                variety[varIndex].foodlist[fooIndex].food_num++
              }else{
                variety[varIndex].foodlist[fooIndex].food_num--
              }
              break
            }
          }
          if(varCount >= 2){
            // varCount = 0
            break
          }
        }
        if (varFlag){
          if(add){
            cart[i].food_num++
            wx.setStorageSync('total_num', wx.getStorageSync('total_num') + 1)
            varFlag = false
            break
          }else{
            cart[i].food_num--
            wx.setStorageSync('total_num', wx.getStorageSync('total_num') - 1)
            varFlag = false
            break
          }
        }
      }
      if(flag){
        for(var varIndex = 0;varIndex < variety.length;varIndex++){
          for(var fooIndex = 0;fooIndex < variety[varIndex].foodlist.length;fooIndex++){
            if(variety[varIndex].foodlist[fooIndex].id == variety[id].foodlist[index].id){
              varCount++
              variety[varIndex].foodlist[fooIndex].food_num++
              break
            }
          }
          if(varCount >= 2){
            break
          }
      }
      wx.setStorageSync('total_num', wx.getStorageSync('total_num') + 1)
      cart.push(variety[id].foodlist[index])
    }
      this.setData({
        variety: variety
      })
      wx.setStorageSync('cartList', cart)
      wx.setStorageSync('variety', variety)
      

      setCount.apply(this)

   },
  //  位移方式动画
   startAnimation(travelList) {
    let index = 0
    this.setData({
        cartHidden: true,
        bus_x: travelList[0][0],
        bus_y: travelList[0][1]
    },res=>{
    })
    if(travelList.length===0) return
    this.timer = setInterval( ()=> {
        index++
          const currentPoint = travelList.shift()
          this.setData({
              bus_x: currentPoint[0],  /* left 值 */
              bus_y: currentPoint[1],  /* top值 */
              scale: 1 - index / 10    /* 缩放比 */
          })
          if (travelList.length === 0) {
              clearInterval(this.timer)
              this.triggerEvent('close')
          }
      }, 40)
    },
    //防抖
    onDebounceHandle:function(e){
      // var timeout = null; // 创建一个标记用来存放定时器的返回值
      if(this.timeout) clearTimeout( this.timeout); 
      this.timeout = setTimeout(() => {
        this.onToCartHandle(e)
          }, 300);
      if(!this.timeout)  this.onToCartHandle(e)
    },

    // 原生方式动画
    onToCartClickHandle(travelList){
    this.animation.opacity(1).step();
    this.setData({
      animationList:this.animation.export()
    })
    travelList.forEach((item,index)=>{
      this.animation.translate(...item).step()
      // this.animation.scale( 1 - index / 20).step()
    })
    this.animation.opacity(0).step(); 
    this.animation.translate(0,0).step()
    this.setData({
         animationList:this.animation.export()
    })

    },
    // 滚动二
    scrollProductList(e){
      this.data.variety.forEach(item => {
        if (e.detail.scrollTop >= (item.offsetTop - 119) && e.detail.scrollTop <= (item.offsetTop - 119 + item.height)){
          this.setData({
            indexId: item.id,
          }); 
        }
      })
    },
    // 滚动三
    onSrcoll(e){
    // clearTimeout( this.timeoutList1); 
    // this.timeoutList1 = setTimeout(() => {
      let scrollTop=e.detail.scrollTop;
      let heightArr = this.data.heightArr;
      if(scrollTop>heightArr[this.data.indexId]&&scrollTop<heightArr[this.data.indexId+1]){
        return
      }else{
      for (let i = 0; i < heightArr.length; i++) {
        if(scrollTop<=heightArr[i]){
          this .setData({
            indexId:i
          })
          return
        }       
      }
    }
  // },300)
    
    
    },
onReadyHandle(){
    let heightArr=[0];
    let s=0;
    wx.createSelectorQuery().selectAll('.variety_item').boundingClientRect(rect => {
      // item.offsetTop = rect.top;
      
      rect.forEach((res)=>{
        s+=res.height;
        heightArr.push(s)
      })
      this.setData({
        heightArr:heightArr
      })
    }).exec()
    wx.createSelectorQuery().select('.variety').boundingClientRect(rect2=>{
      this.setData({
        contentH:rect2.height
      })
    }).exec()
  },
onGetCartHandle(){
        
      //获取购物车位置
  const query = wx.createSelectorQuery().in(this.getTabBar())

      query.select("#cart").boundingClientRect((res)=>{
        this.setData({
          cartPositionX:Number(res.left).toFixed(2),
          cartPositionY:Number(res.top).toFixed(2)
        })
      }).exec()
},
onGetMenuHandle(){
 // 获取菜单高
  wx.getSystemInfo({
    success: (result) => {
      this.setData({
        
        boxHeight: result.windowHeight-168,
        // meunHeight:result.windowHeight-168
      })
    },
    fail:res=>{
      console.log(res.errMsg);
    }
  });
},
onGetSrcoll(){
   // 滚动一获取内容
      let top2 =[] 
      let temp=0;
      for(let i=0;i<this.data.variety.length;i++){
        wx.createSelectorQuery().select('#type-' + this.data.variety[i].id).boundingClientRect( (rect)=> {
         var isTop=Number(rect.top);
         temp +=isTop        
         top2.push(isTop);
        }).exec();
       }
       top2.push(temp)
       this.setData({
        top: top2
       });
},
onScrollHandle(e){
  let scrollTop=e.detail.scrollTop;
  let scrollArr=this.data.heightArr;
  if(scrollTop>=scrollArr[scrollArr.length-1]-this.data.contentH){
    return
  }else{
    for (let i = 0; i < scrollArr.length; i++) {
      if(scrollTop>=0&&scrollTop<scrollArr[0]){
        console.log(2);
        
        this.setData({
          indexId: 0,
        })
      }else if(scrollTop>=scrollArr[i-1]&&scrollTop<scrollArr[i]){
        this.setData({
          indexId: 0,
        })
      }
      
    }
  }
},
onGetTitleHeightHander(){
  let titleTop =[] 
  let temp;
  wx.createSelectorQuery().select('#title-' + this.data.variety[0].id).boundingClientRect( (rect)=> {
    temp=Number(rect.top)+10;   
    titleTop.push(0);
   }).exec();
  for(let i=1;i<this.data.variety.length;i++){
    wx.createSelectorQuery().select('#title-' + this.data.variety[i].id).boundingClientRect( (rect)=> {
    
     var isTop=Number(rect.top)- temp;   
     titleTop.push(isTop);
    }).exec();
   }
  //  top2.push(temp)
   this.setData({
    titleTop: titleTop
   },res=>{
   });
   
   
},

  // 生命周期函数
  onLoad:async function(){
    if (wx.getStorageSync('variety')){
      this.setData({
        variety: wx.getStorageSync('variety')
      })
    }else {
      let res=await getData("/orders/variety",null,"post")
      this.setData({
        variety:res
      })
    }
    this.onReadyHandle()
    this.onGetTitleHeightHander()
    // this.onGetSrcoll()
    this.onGetCartHandle()
    this.onGetMenuHandle()
    
  },
   onShow:async function(){

    if(typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        selectIndex:0,
      })
    }
    

    setCount.apply(this)
    this.animation = wx.createAnimation({
      duration: 33,
      timingFunction: 'ease-out',
    })

    if(!wx.getStorageSync('total_num')){
      wx.setStorageSync('total_num', 0)
    }
    
    if(!wx.getStorageSync('cartList')){
      wx.setStorageSync('cartList', [])
    }else {
      var cartList = wx.getStorageSync('cartList')
      var variety = wx.getStorageSync('variety')
      var varCount = 0
      for(let i = 0;i < cartList.length; i++){
        for(var varIndex = 0;varIndex < variety.length;varIndex++){
          for(var fooIndex = 0;fooIndex < variety[varIndex].foodlist.length;fooIndex++){
            if(variety[varIndex].foodlist[fooIndex].id == cartList[i].id){
              varCount++
              variety[varIndex].foodlist[fooIndex] = cartList[i]
              break
            }
          }
          if(varCount >= 2){
            varCount = 0
            break
          }
        }
      }
      wx.setStorageSync('variety', variety)
    }

    if (wx.getStorageSync('variety')){
      this.setData({
        variety: wx.getStorageSync('variety')
      })
    }else {
      let res=await getData("/orders/variety",null,"post")
      this.setData({
        variety:res
      })
      wx.setStorageSync('variety', this.data.variety)
    }

  },

  onLessHandle: function(e){
    this.onModifyNumberHandle(e, false)
  },

  onAddHandle: function(e){
    this.onDebounceHandle(e)
  },

  onHide: function(){
    
  },

  onUnload: function(){
    
  },

  //跳转饭票页面
  onGoTicketHandle: function(){
    wx.navigateTo({
      url: '/pages/ticket/ticket',
    })
  }

})
