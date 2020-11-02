import data2 from "./foodList";
module.exports=function(prams="",method="GET",data1="",time){
  return new Promise((resolve)=>{
    if(method=="GET"){
      setTimeout(()=>{
        resolve({
          data:data1,
          statusCode:200
        })
      },time);
    }else{
      setTimeout(()=>{
        resolve({
          data:"OK",
          statusCode:200
        })
      },time);
    }
  })
}