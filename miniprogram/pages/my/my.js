
Page({
  data: {
    username:"",
    stu_num:'',
    password:'12345',
    imagePath:'',
    userInfo:{},
    hasUserInfo:false,
  },
  // 获取用户的头像和名称
  onLoad:function(options){
    var that =this
    var app=getApp()
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo:app.globalData.userInfo,
      hasUserInfo:app.globalData.hasUserInfo
    })
    console.log(this.data.userInfo)
    this.setData({
      stu_num: app.globalData.Myuser
    })
    wx.cloud.callFunction({
      name:'SearchUser',
      success:res=>{
        var obj=res.result.data;
        for(var i=0;i<obj.length;i++){
          console.log(obj[i].stu_num==that.data.stu_num)
          if(obj[i].stu_num==that.data.stu_num){    
            this.setData({
              imagePath:obj[i].imageId,
              username:obj[i].username
            })
          }
        }
      }
    })
  },
  // 跳转到修改密码的页面
  gotopassword:function(){
    var stu_num = this.data.stu_num
    wx.navigateTo({
      url: '/pages/password/password?stu_num=' + stu_num,
    })
  },
  // 跳转到用户反馈界面
  gotofeedback:function(){
    wx.navigateTo({
      url: '/pages/userFeedback/userFeedback',
    })
  },
  // 退出登录按钮
  logout:function(){
    wx.redirectTo({
      url: '/pages/userLogin/userLogin',
    })
  },
  // 跳转到修改头像页面
  // changephoto:function(){
  //   var name = this.data.stu_num;
  //   wx.navigateTo({
  //     url: '/pages/photo/photo?stu_num='+ name,
  //   })
  // },
  // 页面跳转到此页面时重新加载onload函数
  onShow:function(t){
    this.onLoad();
  },
  // 跳转到关于我们页面
  gotoaboutus:function(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },
  changephoto:function () {
        var  that = this;   
         wx.chooseImage({
           count: 1, // 默认9       
           sizeType: ['original', 'compressed'],  
          // 指定是原图还是压缩图，默认两个都有        
           sourceType: ['album', 'camera'],
          // 指定来源是相册还是相机，默认两个都有      
           success(res) {      
             that.uploadImage(res.tempFilePaths[0])
             that.setData({
              imagePath: res.tempFilePaths
             })
          }   
        })  
      },  
  uploadImage(fileURL) {
      wx.cloud.uploadFile({
        cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
        filePath: fileURL, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log("上传成功",res)
          //获取文件路径
          this.setData({
            imagePath:res.fileID,
          })
          console.log(this.data.stu_num)
          wx.cloud.callFunction({
            name:'UpdatePic',
            data:{
              Stu_num:this.data.stu_num,
              ImageId:this.data.imagePath
            }
          })

        },
        fail: console.error
      })
    },
})