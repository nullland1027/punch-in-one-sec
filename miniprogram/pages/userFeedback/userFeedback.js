Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    content:'',
  },
  Content:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  
  },
    add(){
      if(this.data.content == ""){
        wx.showToast({
          title: '输入不能为空',
          icon:"none"
        })
      }else{
        wx.cloud.database().collection('problem')
        .add({
          data:{
            content:this.data.content
          }
        })
        wx.showToast({
          title: '提交成功',
        })
      }
  }
})