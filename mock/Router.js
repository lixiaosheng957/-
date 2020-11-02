let {payissue,variety}=require("./data")


/**
 * 意见反馈
 * @param {反馈的意见信息} data 
 */
function feedback(data) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({data:true,status:200})
        }, 3000);
    })
}

/**
 * 常见问题
 * @param {问题标识符}} id 
 */
function getIssue(id){
    return new Promise(async (resolve,reject)=>{
        setTimeout(()=>{
            resolve(payissue)
        },3000)
    })
}

/**
 * 用户登录
 * @param {用户登录数据} data 
 */
function getLogin(data){
    // {code:wx.getStorageSync('code'),avatarUrl,nickName,encryptedData,iv}
    // user:{username:"天使爱美丽",phone:"18607102432",head:"../../image/head.png",uuid:""},
    return new Promise((resolve,reject)=>{
        let uuid=guid()
        let {avatarUrl:head,nickName:username}=data
        setTimeout(()=>{
            resolve({data:{uuid,user:{head,username,phone:"15988888888",packet:5}},status:200})
        },3000)
    })
    
}


function getVariety(){
    return new Promise(async (resolve,reject)=>{
        setTimeout(()=>{
            resolve(variety)
        },1000)
    })
}

/**
 * 模拟生成uuid
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

module.exports={
    feedback,getIssue,getLogin,getVariety
}