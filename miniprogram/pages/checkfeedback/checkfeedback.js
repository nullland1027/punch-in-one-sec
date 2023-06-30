Page({
  data: {
  object:[],
  },
  onLoad: function () {
    wx.cloud.callFunction({
      name:'problem',
      success:res=>{
        console.log(res)
        this.setData({
          object:res.result.data
        })
      }
    })
  }
 })