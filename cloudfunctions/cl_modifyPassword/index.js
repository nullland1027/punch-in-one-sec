// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
	let {newpassword,Stu_num,oldpassword}=event;
	let isChanged=false
	db.collection('User').where({
		stu_num:Stu_num
	}).get().then(res=>{
		let old_pwd=res.data[0].password
		if(old_pwd==oldpassword){
			 db.collection('User').where({
				stu_num:Stu_num
			}).update({
				data: {
					password:newpassword
				}
			})
		}
	})
	if(newpassword!=oldpassword) isChanged=true
  return isChanged
}