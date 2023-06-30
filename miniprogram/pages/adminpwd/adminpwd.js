// pages/adminpwd/adminpwd.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpassword:'',
    newpassword:'',
    checkpassword:'',
    adpw:''
  },
  onShow(){
    this.setData({
       adpw:app.globalData.adminpwd
    })
  },
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
    if(this.data.adpw == this.data.oldpassword && this.data.checkpassword == this.data.newpassword){
        app.globalData.adminpwd = this.data.newpassword
        wx.showToast({
          title: '修改成功',
        })
    }else{
      wx.showToast({
        title: '修改失败',
        icon:'none'
      })
    }
  }
})