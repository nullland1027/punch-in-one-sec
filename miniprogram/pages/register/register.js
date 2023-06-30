//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    stu_numInput:"",
    usernameInput: '',
    passwordInput: '',
    rightwordInput:'',
    imageid:'',
    navH: 0
  },
  //事件处理函数
  onLoad: function () {
    this.setData({
      navH: app.globalData.navHeight
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  stu_numInput: function (e) {//账号判断
    this.setData({
      stu_numInput:e.detail.value
    })
  },
  usernameInput: function (e) {//账号判断
    this.setData({
      usernameInput: e.detail.value
    })
  },
  passwordInput: function (e) {//密码判断
    this.setData({
      passwordInput: e.detail.value
    })
  },
  rightwordInput: function (e) {//密码判断
    this.setData({
      rightwordInput: e.detail.value
    })
  }, 
  registerBtnClick:function(e) {
    if (this.data.usernameInput == "") {
      wx.showToast({
        title: '请输入姓名!',
        icon: 'none',
        duration: 2000
      })
    }else if (this.data.stu_numInput == "") {
      wx.showToast({
        title: '请输入账号！',
        icon: 'none',
        duration: 2000
      })
    }else if (this.data.passwordInput == "") {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.rightwordInput == "") {
      wx.showToast({
        title: '请确认密码！',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.rightwordInput != this.data.passwordInput ) {
      wx.showToast({
        title: '密码不相同，请确认后再输入！',
        icon: 'none',
        duration: 2000
      })
    } else{
      wx.showModal({       //弹框显示注册成功
        title: '注册成功!',
        showCancel: false,
        success(res) {
          wx.navigateTo({
            url: '../userLogin/userLogin',
          })
        }
      })
    }
  },
  registerBtnClick:function(){
    if(this.data.stu_numInput !="" && this.data.usernameInput != "" && this.data.passwordInput == this.data.rightwordInput && this.data.stu_numInput.length == 12){
      wx.cloud.callFunction({
        name:"AddUser",
        data:{
          Username:this.data.usernameInput,
          Password:this.data.passwordInput,
          Stu_num:this.data.stu_numInput,
          Imageid:this.data.imageid
        },
  
      }).then(res=>{
        wx.showToast({
          title: '注册成功',
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../userLogin/userLogin',
          })
         }, 2000) //延迟时间 这里是2秒     
      })
      var app=getApp()
        wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          app.globalData.userInfo=res.userInfo
          app.globalData.hasUserInfo=true
          console.log(app.globalData.userInfo)
        }
      })
      }
    else if(this.data.stu_numInput =="" || this.data.usernameInput == ""){
      wx.showToast({
        title: '用户名或学号不能为空',
        icon:'none'
      })
    }else if(this.data.passwordInput != this.data.rightwordInput){
     wx.showToast({
       title: '密码输入不相同',
       icon:'none'
     })
    }else if(this.data.stu_numInput.length != 12){
     wx.showToast({
       title: '学号输入错误',
       icon:'none'
     })
    }
  }
   
})
