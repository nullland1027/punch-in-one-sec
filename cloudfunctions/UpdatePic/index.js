// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let {Stu_num,Email,Password,ImageId}= event;
  await db.collection('User').where({
    stu_num:_.eq(Stu_num)
  }).update({
    data:{
      imageId:ImageId
    }
  })
}