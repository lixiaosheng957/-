let app=getApp()
let mock=require("../mock/mock")
function getData1(url, data = {}, method = "get", header = {}){
    return new Promise((resolve,reject)=>{
        wx.request({
            url:app.baseUrl+url,
            data,
            method,
            header,
            timeout:3000,
            success(data){
                resolve(data)
            },
            fail(e){
                reject(e)
            }
        })
    })
}
function getData(url,data={},method="get",header={}){
    return new Promise(async (resolve,reject)=>{
        try{
            let data1=await mock(url,data,method,header)
            return resolve(data1)
        }catch(e){
            return reject(e)
        }        
    })
}
module.exports={
    getData1,getData
}