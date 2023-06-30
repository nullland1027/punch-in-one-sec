// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
/**
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {

	try {
		const wxContext = cloud.getWXContext()
		let stu_num = event.stu_num;
		let password = event.password;
		let isLogin = false;
		let dataFromDB = await db.collection("user").where({
			account: stu_num
		}).get();
		let DBPassword = dataFromDB.data[0].password

		if (DBPassword == password) {
			isLogin = true
		}
			return {
				isLogin,
				stu_num
			}
	} catch (e) {
		return error(e);
	}

}