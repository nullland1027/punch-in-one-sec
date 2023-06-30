// 云函数入口文件
const cloud=require('wx-server-sdk')
const fs=require('fs')
const path=require('path')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context)=>{
  let {Username,Stu_num,Password,Imageid}= event;
  /* const fileSteam=fs.createReadStream(path.join(__dirname,'demo,jpg'))
  return await cloud.uploadFile({
    cloudPath:'demo.jpg',
    fileContent:fileSteam
  }) */
  var found=false
  var UserArray=await db.collection('User').get()
  var UserData=UserArray.data
  for(var i=0;i<UserData.length;i++){
   if(UserData[i].stu_num==Stu_num){
     found=true
   }
  }
  if(found==false){
  await db.collection('User').add(
    {
      data:{
        "username":Username,
        "password":Password,
        "imageId":Imageid,
        "stu_num":Stu_num,
        "isCheck":false
      }
    }
  )
}
return found
}