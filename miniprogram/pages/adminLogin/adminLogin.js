// pages/adminLogin/adminLogin.js
var app = getApp()
Page({
  data: {
     username:'',
     password:'',
     adpw:''
  },
  onShow(){
    this.setData({
       adpw:app.globalData.adminpwd
    })
  },
  fhdl:function(){
    wx.navigateTo({
      url: '../userLogin/userLogin',
    })
  },
  feedback:function(){
    wx.navigateTo({
      url: '../userFeedback/userFeedback',
    })
  },
  getAccount:function(event){
    this.setData({
      username:event.detail.value
    })
  },
  getPwd:function(event){
    this.setData({
      password:event.detail.value
    })
  },
  login:function(){
    if(this.data.username == "admin" && this.data.password == this.data.adpw){
      wx.redirectTo({
        url: '../adminmy/adminmy',
       })
    }else{
      wx.showToast({
        title: '用户名或密码错误',
        icon:'none'
      })
    }
  }
})