// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

	try {
		const wxContext = cloud.getWXContext()
		let stu_num = event.stu_num;
		let password = event.password;
		let isLogin = false;
		let dataFromDB = await db.collection("User").where({
			stu_num: stu_num
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