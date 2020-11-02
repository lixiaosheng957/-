// pages/menunotice/menunotice.js
import data2 from "../../utils/foodList";
var getFoodList = require("../../utils/mockData");
let setCount=require("../../utils/count")
//DEBUG模式下用mock模拟数据
let DEBUG = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectId: 1,
    datelist: [{
        id: 1,
        date: "周一"
      },
      {
        id: 2,
        date: "周二"
      },
      {
        id: 3,
        date: "周三"
      },
      {
        id: 4,
        date: "周四"
      },
      {
        id: 5,
        date: "周五"
      },
      {
        id: 6,
        date: "周六"
      },
      {
        id: 7,
        date: "周日"
      },
    ],
    cateList: [],
    loadingTimes: [0, 0, 0, 0, 0, 0, 0],
    show:true,
    animated: true,
    canLoading:true
  },
  //监听星期选中
  onSelectItemHandle1(e) {
    //事件委托
    let target = e.target;
    if (target.id != "day") return;
    if (DEBUG) {
      this.setData({
        selectId: target.dataset.id
      })
      wx.showLoading({
        title: '数据加载中',
      })
      // getFoodList("getFoodlist", "GET", data2, 1500).then((res) => {
      //   let data = res.data;
      //   let object = {};
      //   //只要最内层的菜品数据
      //   for (let key in data) {
      //     for (let item in data[key]) {
      //       object[item] = data[key][item];
      //     }
      //   }
      //   this.setData({
      //     cateList: object,
      //     [`loadingTimes[${target.dataset.id-1}]`]: this.data.loadingTimes[target.dataset.id - 1] + 1
      //   })
      //   wx.hideLoading();
      // })
      getFoodList("getFoodlist", "GET", data2, 1500).then((res) => {
        let data = res.data;
        let object = {};
        for (let key in data) {
          for (let item in data[key]) {
            object[item] = data[key][item];
          }
        }
        this.setData({
          [`cateList[${this.data.cateList.length}]`]: object,
          ['loadingTimes[0]']: this.data.loadingTimes[0]+1
        })
        wx.hideLoading();
      })
    } else {
      this.setData({
        selectId: target.dataset.id
      });
      //发送请求
      getFoodList(`day=${e.target.dataset.id}&loadingTimes=${this.data.loadingTimes[e.target.dataset.id-1]}`).then(res => {
        let data = res;
        let object = {};
        for (let key in data) {
          for (let item in data[key]) {
            object[item] = data[key][item];
          }
        }
        this.setData({
          cateList: object,
          [`loadingTimes[${target.dataset.id-1}]`]: this.data.loadingTimes[target.dataset.id - 1] + 1
        })
      }).catch(err => {
        wx.hideLoading();
        this.setData({
          cateList: []
        })
      })
    }
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selectIndex: 2
      })
    }
    setCount.apply(this)
  },
  onLoad() {
    if (DEBUG) {
      wx.showLoading({
        title: '数据加载中',
      })
      getFoodList("getFoodlist", "GET", data2, 1500).then((res) => {
        let data = res.data;
        let object = {};
        for (let key in data) {
          for (let item in data[key]) {
            object[item] = data[key][item];
          }
        }
        this.setData({
          [`cateList[${this.data.cateList.length}]`]: object,
          ['loadingTimes[0]']: 1
        })
        wx.hideLoading();
  
      })
    } else {
      getFoodList("day=1&loadingTimes=0").then(res => {
        let data = res
        let object = {};
        for (let key in data) {
          for (let item in data[key]) {
            object[item] = data[key][item];
          }
        }
        this.setData({
          cateList: object,
          ['loadingTime[0]']: 1
        })
      }).catch((err) => console.log(err));
    }
  },
  onGetMoreHandle(){
    if(this.data.loadingTimes[0]<4){
      getFoodList("getFoodlist", "GET", data2, 1500).then((res) => {
        let data = res.data;
        let object = {};
        for (let key in data) {
          for (let item in data[key]) {
            object[item] = data[key][item];
          }
        }
        
        this.setData({
          [`cateList[${this.data.cateList.length}]`]: object,
          ['loadingTimes[0]']: this.data.loadingTimes[0]+1
        })
      })
    }else{
      this.setData({
        canLoading:false
      })
    }
  }
})