// index.js
// 获取应用实例
const app = getApp();

Page({
  cancel1(e1){
    this.setData({
      oldpassword:e1.detail.value
    })
  },
  c1(){
    this.setData({
      oldpassword:''
    })
  },
  cancel2(e2){
    this.setData({
      newpassword:e2.detail.value
    })
  },
  c2(){
    this.setData({
      newpassword:''
    })
  },
  cancel3(e3){
    this.setData({
      checkpassword:e3.detail.value
    })
  },
  c3(){
    this.setData({
      checkpassword:''
    })
  },
  submit:function(){
    if(this.data.newpassword == this.data.checkpassword){
     /*  const db=wx.cloud.database()
      db.collection('User').where({
        stu_num:this.data.stu_num
      }).get().then(res=>{
        console.log(res.data[0].password)
      }) */
      wx.cloud.callFunction({
        name: "cl_modifyPassword",
        data:{
          Stu_num:this.data.stu_num,
          oldpassword:this.data.oldpassword,
          newpassword:this.data.newpassword,
        },
        success:res=>{
          console.log(res)
          if(res.result==false){
            wx.showToast({
              title: '旧密码输入错误',
              icon:"none"
            })
          }
          else{
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
             }, 2000) //延迟时间 这里是2秒     
          }
        }
      })
    }
    else{
     wx.showToast({
       title: '密码输入不相同',
       icon:"none"
     })
    }
  },
  onLoad: function(options) {
    var app=getApp()
    this.setData({
      stu_num: app.globalData.Myuser
    })
  },
  data:{
      oldpassword:'',
      newpassword:'',
      checkpassword:'',
      stu_num:""
  }
})
