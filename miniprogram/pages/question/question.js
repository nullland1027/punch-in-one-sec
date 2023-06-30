// pages/question/question.js
// index.js
// 获取应用实例
const app = getApp();
var status = true;

Page({
  data:{
    id:"",
    name:"",
    s1:"",
    school:"",
    q1:"",
    q2:"",
  },
  xuehao:function(e){
    this.setData({
      id:e.detail.value
    })
  },
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  sex1:function(e){
    this.setData({
      s1:e.detail.value
    })
  },
  xiaoqu:function(e){
    this.setData({
      school:e.detail.value
    })
  },
  juzhudi:function(e){
    this.setData({
      q1:e.detail.value
    })
  },
  recent:function(e){
    this.setData({
      q2:e.detail.value
    })
  },
  submit:function(e) {
    if(this.data.id != "" && this.data.name != "" && this.data.s1 != "" && this.data.q1 !="" && this.data.q2 !="" && this.data.school !=""){
      console.log(this.data);
      wx.cloud.callFunction({
        name: "dailyReport",
        data: {
          id: this.data.id,
          name:this.data.name,
          sex:this.data.s1,
          school: this.data.school,
          q1: this.data.q1,
          q2: this.data.q2
        },
  
      }).then(res=> {
        console.log("云函数调用成功",res)
      }).catch(res=>{
        console.log("云函数调用失败",res)
      })
      wx.showToast({
        title: '提交成功',
      })
      
    }else{
      wx.showToast({
        title: '请完善表格',
        icon:'none'
      })
    }
    
  }
    
  
})
