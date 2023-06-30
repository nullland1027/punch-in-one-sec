// pages/adminmy/adminmy.js
Page({
  data: {
    username:"admin",
    imagePath:'cloud://cloud1-7gj9ep54aff5aab7.636c-cloud1-7gj9ep54aff5aab7-1305741815/my.png'
  },
  // 跳转到修改密码的页面
  gotopassword:function(){
    var stu_num = this.data.stu_num
    wx.navigateTo({
      url: '/pages/adminpwd/adminpwd',
    })
  },
  // 跳转到用户反馈界面
  gotodata:function(){
    wx.navigateTo({
      url: '/pages/tongji/tongji',
    })
  },
  // 退出登录按钮
  logout:function(){
    wx.redirectTo({
      url: '/pages/userLogin/userLogin',
    })
  },
  onShow:function(t){
    this.onLoad();
  },
  // 跳转到关于我们页面
  gotoaboutus:function(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },
  onShow: function() {
    wx.hideHomeButton({
    })
    },
    gotofeedback:function(){
      wx.navigateTo({
        url: '/pages/checkfeedback/checkfeedback',
      })
    }
})