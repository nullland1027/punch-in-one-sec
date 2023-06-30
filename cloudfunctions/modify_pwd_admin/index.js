// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {newpassword,name,oldpassword}=event;
	let isChanged=false
	db.collection('admin').where({
		admin_name: name
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