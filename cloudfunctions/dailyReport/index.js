// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {id,name,sex,school,q1,q2}=event;
  db.collection('MRYB')
  .add({
    data:{
      id:id,
      name:name,
      sex:sex,
      school:school,
      juzhudi:q1,
      recent:q2
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}