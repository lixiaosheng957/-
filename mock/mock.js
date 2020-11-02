let {
    feedback,
    getIssue,
    getLogin,
    getVariety
} = require("./Router")

class Req {
    constructor(meta) {
        if(meta instanceof Array){
            return this.data=meta
        }
        this.data = {
            ...meta
        }
    }
}

function getParams(url) {
    let query = url.split("?")[1].split("&")
    let params = {}
    for (let item of query) {
        let arr = item.split("=")
        params[arr[0]] = arr[1]
    }
    return params
}

module.exports = function mock(url, data = {}, method = "GET", header = {}) {
    return new Promise(async (resolve, reject) => {
        if (method.toUpperCase() === "POST") {
            switch (url) {
                case "/orders/feedback":
                    try {
                        let meta = await feedback(data)
                        resolve(new Req(meta))
                    } catch (e) {
                        reject(new Req({
                            status: 400,
                            data: e
                        }))
                    }
                    break;
                    case "/orders/issue?issue=1":{
                        let params = getParams(url)
                        let meta = await getIssue(params['issue'])
                        resolve(meta)
                        break;
                    }
                    case "/orders/issue?issue=2":{
                        let params = getParams(url)
                        let meta = await getIssue(params['issue'])
                        resolve(meta)
                        break;
                    }
                    case "/orders/issue?issue=3":{
                        let params = getParams(url)
                        let meta = await getIssue(params['issue'])
                        resolve(meta)
                        break;
                    }
                    case "/orders/issue?issue=4":{
                        let params = getParams(url)
                        let meta = await getIssue(params['issue'])
                        resolve(meta)
                        break;
                    }
                    case "/orders/login":{
                        let meta =await getLogin(data)
                        resolve(new Req(meta))
                        break;
                    } 
                    case "/orders/login":{
                        let meta =await getLogin(data)
                        resolve(new Req(meta))
                        break;
                    }  
                    case "/orders/variety":{
                        let meta =await getVariety()
                        resolve(new Req(meta))
                        break;
                    }
                    default:
                        return reject(new Req({
                            data: "err",
                            status: 404
                        }))
            }
        }
    })
}