const app = getApp()
import {  getOrderList,postOrder,getRed,postSureOrder,cancelOrder,refund,postOrderNot} from './conf'
import data from './data.js'
let DEBUG = true //切换数据入口
const request = (url, options) => {
   return new Promise((resolve, reject) => {
       if(!DEBUG){
        wx.request({
            url: `${app.globalData.host}${url}`,
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                'Content-Type': 'application/json; charset=UTF-8',
               //  'x-token': 'x-token'  // 看自己是否需要
            },
            success(request) {
                if (request.data.code === 200) {
                    resolve(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {
                reject(error.data)
            }
        })
       }else{
        if (url==getOrderList) {
                setTimeout(()=>{
                    resolve(
                        data.data
                    )
                },1000)
           }
        if (url==postOrder) {          
            setTimeout(()=>{
                resolve(
                    data.paydata
                )
            },3000)
           }
        if (url==getRed) {
            setTimeout(()=>{
                resolve(
                    data.reddata
                )
            },3000)
        }
        if (url==postSureOrder) {
            setTimeout(()=>{
                resolve(
                    data.suredata
                )
            },3000)
        }
        if (url==cancelOrder) {
            setTimeout(()=>{
                resolve(
                    data.suredata
                )
            },3000)
        }
        if (url==refund) {
            setTimeout(()=>{
                resolve(
                    data.suredata
                )
            },3000)
        }
        if (url==postOrderNot) {          
            setTimeout(()=>{
                resolve(
                    data.paydata
                )
            },3000)
           }
       }
     
   })
}

const get = (url, options = {}) => {
   return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
   return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
   return request(url, { method: 'PUT', data: options })
}

const remove = (url, options) => {
   return request(url, { method: 'DELETE', data: options })
}

module.exports = {
   get,
   post,
   put,
   remove
}