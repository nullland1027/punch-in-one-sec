// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    wx.cloud.init({
      traceUser:true
    })
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.adminpwd = "123456"

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: {},
    Myuser:null,
    adminpwd:null,
    hasUserInfo: false,
  },
})
