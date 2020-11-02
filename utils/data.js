module.exports ={
  "data": {
    "code": 200,
    "orderList":[
      /*
        * -4 退款中      (再来一单)
        * -3 已退款      (再来一单)
        * -2 商家拒单    (再来一单)
        * -1 订单取消    (再来一单)
        * 1 待付款       (去付款，取消订单)
        * 2 客户已付款    （申请退款，再来一单)
        * 3 商家接单      （申请退款，再来一单)
        * 6 商品配送       （确认订单，再来一单）
        * 7 商品送达       （确认订单，再来一单）
        * 8 确认收货       （确认订单，再来一单）
        * 9 订单完成         (再来一单)
        * 
      */
     {
      "id":"123456789012456",
      "time":"2018-12-25 12:30",
      "status":-4, 
      "row_list":[
        {"id":1,"typeId":5,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
        {"id":2,"typeId":4,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10},
        {"id":3,"typeId":5,"food_img":"../../image/orderpic1@2x.png","food_name":"面包","food_num":4,"food_price":10}
      ],
      "bag":2,
      "total": 3,
      "total_price":28,
      "contact": "方（女士）18612123456",
      "address":"湖北省妇幼保健院2楼产科",
      "remark":"不要辣",
      "table_ware_num":1,
      "mode":"微信支付"
    },
     {
      "id":"123456789012456",
      "time":"2018-12-25 12:30",
      "status":-3, 
      "row_list":[
        {"id":1,"typeId":5,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
        {"id":2,"typeId":4,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
      ],
      "bag":2,
      "total": 3,
      "total_price":28,
      "contact": "方（女士）18612123456",
      "address":"湖北省妇幼保健院2楼产科",
      "remark":"不要辣",
      "table_ware_num":1,
      "mode":"微信支付"
     },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":-2, 
        "row_list":[
          {"id":1,"typeId":5,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"typeId":4,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":-1,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":1,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":2,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":3,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },  
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":6,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":7,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":8,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
      {
        "id":"123456789012456",
        "time":"2018-12-25 12:30",
        "status":9,
        "row_list":[
          {"id":1,"food_img":"../../image/orderpic1@2x.png","food_name":"米饭","food_num":2,"food_price":10},
          {"id":2,"food_img":"../../image/orderpic1@2x.png","food_name":"藕汤","food_num":1,"food_price":10}
        ],
        "bag":2,
        "total": 3,
        "total_price":28,
        "contact": "方（女士）18612123456",
        "address":"湖北省妇幼保健院2楼产科",
        "remark":"不要辣",
        "table_ware_num":1,
        "mode":"微信支付"
      },
    ]
  },
  "paydata":{
    "code":200,
    "message":"支付成功"
  },
  "reddata":{
    "fullReduction":[
      {
        "id":"123",
        "typeId":"4",
        "money":"1",
        "type":"汤品类",
        "full":"49",
        "start":"2018-12-01",
        "end":"2018-12-31"
      },
      {
        "id":"124",
        "typeId":"5",
        "money":"10",
        "type":"主食类",
        "full":"49",
        "start":"2018-12-01",
        "end":"2018-12-31"
      },
      {
        "id":"125",
        "typeId":"999",
        "money":"5",
        "type":"通用类",
        "full":"0",
        "start":"2018-12-01",
        "end":"2018-12-31"
      }
    ],
    "mortgage":[

    ] 
  },
  "suredata":{
    "code":200,
    "message":"确认成功"
  }

}