// miniprogram/pages/userLogin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_num: "",
    password: ""
  },

  getAccount(event) {
    console.log(event.detail.value)
    this.setData({
      stu_num: event.detail.value
    })
  },
  getPwd(event) {
    //console.log(event.detail.value)
    this.setData({
      password: event.detail.value
    })
  },
  login() {
    // console.log(this.data.stu_num);
    // console.log(this.data.password);
    if (this.data.stu_num.length != 12) {
      wx.showToast({
        title: "用户名须为学号",
        icon: "none"
      })
    } else {
      //调用云函数
      wx.cloud.callFunction({
        name: "cl_login",
        data: {
          stu_num: this.data.stu_num,
          password: this.data.password
        },

      }).then(res=> {
        console.log("云函数调用成功",res)
        let userInfor = res.result.stu_num
        let isLogin = res.result.isLogin
        if (isLogin == true) {
          wx.showToast({
            title: '登陆成功',
          })
          //跳转到我的页面
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/my/my?username=' + userInfor,
              fail(ex){
                console.log(ex)//fail can not redirectTo a tabbar page"
                wx.switchTab({
                  url: '/pages/my/my?username=' + userInfor
                })
                var app=getApp()
                app.globalData.Myuser=userInfor
              }
            })
           }, 2000) //延迟时间 这里是2秒     
          //保存登陆状态
          //wx.setStorageSync('user', userInfor)

        } else {
          wx.showToast({
            icon:"none",
            title: '账号或密码错误',
          })
        }
      }).catch(res=>{
        console.log("云函数调用失败",res)
      })
      
    }

  },

  feedback(){
    wx.navigateTo({
      url: '../userFeedback/userFeedback',
    })
  },
//跳到管理员登录界面
  adminLogin(){
    wx.navigateTo({
      url: '../adminLogin/adminLogin'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.hideTabBar({
      animation: true,
    })
  },
  onShow:function(){
    wx.hideHomeButton({
      success: (res) => {},
    })
  },
  onShareAppMessage: function () {

  },
  ccmm:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})