// pages/date/date.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   cur_year:new Date().getFullYear(),
   cur_month:new Date().getMonth()+1,
   weeks_ch:['日','一','二','三','四','五','六'],
   days:[],
   cur_days:[],
   isDisable:false,
   text:'打卡',
   ischeck:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database()
    const _=db.command
  /*  this.setData({
     cur_year:cur_year,
     cur_month:cur_month
   }
   ) */
   this.calculateEmptyGrids(this.data.cur_year,this.data.cur_month)
   this.calculateGrids(this.data.cur_year,this.data.cur_month)
    db.collection('Date').get({
     success:res=>{
      var found=false
      var obj=res.data
      for(var i=0;i<obj.length;i++){
        if(this.data.cur_year==obj[i].year && this.data.cur_month==obj[i].month){
          found=true
          this.setData({
            cur_days:obj[i].days
          })
          var cur_day=new Date().getDate()
          var cur_cell=new Date(Date.UTC(this.data.cur_year, this.data.cur_month - 1, 1)).getDay()
          var app=getApp()
          console.log(app.globalData.Myuser)
          if(this.data.cur_days[cur_day+cur_cell-2].isSign==true){
            this.setData({
              isDisable:true,
              text:'已打卡',
              ischeck:true
            })
           }else{
             this.setData({
               ischeck:false
             })
           }
           db.collection('User').where({
            stu_num:_.eq(app.globalData.Myuser)
          }).update({
            data:{
              isCheck:this.data.ischeck
            }
          })
        }
      }
      if(found==false){
       db.collection('Date').add({
         data:{
          year:this.data.cur_year,
          month:this.data.cur_month,
          days:this.data.days
         }
       }).then(res=>{
         this.setData({
          cur_days:this.data.days,
          isDisable:false,
          text:'打卡'
         })
       })
      }
     }
   })
  },
  getFirstDayOfWeek:function(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids:function(year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({days:[]});
    var days=that.data.days
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);    
    if (firstDayOfWeek > 0) {
      for (let i = 1; i < firstDayOfWeek; i++) {
        var obj  = {
          date:null,
          isSign:false
        }
        days.push(obj);
      }
      console.log(days)
      this.setData({
        days:days
      });
    //清空
    } else {
      this.setData({
        days: []
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  calculateGrids:function(year,month){
    var that = this;
    var days=that.data.days
    const max_day=new Date(year,month,0).getDate()
    for(var i=0;i<max_day;i++){
      var obj={
        date:i+1,
        isSign:false
      }
      days.push(obj)
    }
    this.setData({
      days:days
    })
  },
  Signup:function(){
    const db=wx.cloud.database()
    const _=db.command
    var cur_day=new Date().getDate()
    var cur_cell=new Date(Date.UTC(this.data.cur_year, this.data.cur_month - 1, 1)).getDay()
    var newday=cur_day+cur_cell-2
    var getdays=this.data.cur_days
    getdays[newday].isSign=true
    console.log(getdays)
    db.collection('Date').where({
      year:_.eq(this.data.cur_year),
      month:_.eq(this.data.cur_month)
    }).update({
      data:{
        days:getdays
      }
    })
    this.setData({
      cur_days:getdays,
      isDisable:true,
      text:'已打卡'
    })
  },
  back:function(){
   if(this.data.cur_month==1){
     this.setData({
       cur_year:this.data.cur_year-1,
       cur_month:12
     })
   }
   else{
    this.setData({
      cur_month:this.data.cur_month-1,
    })
   }
   this.onLoad()
  },
  forward:function(){
    if(this.data.cur_month==12){
      this.setData({
        cur_year:this.data.cur_year+1,
        cur_month:1
      })
    }
    else{
     this.setData({
       cur_month:this.data.cur_month+1,
     })
    }
    this.onLoad()
  }
})