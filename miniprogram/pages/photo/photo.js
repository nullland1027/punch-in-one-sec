// index.js
// 获取应用实例
const app = getApp();
var status = true;

Page({
  data:{
       stu_num:"",
       showModal: false,
       imgURL:"",
       status:status
      },
    
      // 点击更换手机相册或者电脑本地图片     
  headimage:function () {
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
               imgURL: res.tempFilePaths
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
            imgURL:res.fileID,
          })
          status = false
          this.setData({status:status})
          console.log(this.data.stu_num)
          wx.cloud.callFunction({
            name:'UpdatePic',
            data:{
              Stu_num:this.data.stu_num,
              ImageId:this.data.imgURL
            }
          })
        },
        fail: console.error
      })
    },
    onLoad:function(options){
      var that =this
      var app=getApp()
      this.setData({
        stu_num: app.globalData.Myuser
      })
      console.log(options.stu_num)
      wx.cloud.callFunction({
        name:'SearchUser',
        success:res=>{
          var obj=res.result.data;
          for(var i=0;i<obj.length;i++){
            console.log(obj[i].stu_num==that.data.stu_num)
            if(obj[i].stu_num==that.data.stu_num){    
              this.setData({
                imgURL:obj[i].imageId
              })
            }
          }
        }
      })
    },
    toastHide:function(event){
      console.log("触发bindchange，隐藏toast")
      status =true
      this.setData({status:status})
  },
})