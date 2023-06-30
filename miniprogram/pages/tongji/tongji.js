Page({
  data: {
  object:[],
  isCheck:false,
  cur_year:new Date().getFullYear(),
  cur_month:new Date().getMonth()+1
  },
  onLoad: function () {
  console.log('onLoad') 
  const db=wx.cloud.database()
  wx.cloud.callFunction({
    name:'SearchUser',
    success:res=>{
      console.log(res.result.data)
      this.setData({
        object:res.result.data
      })
    }
  })
  db.collection('Date').where({
    month:this.data.cur_month,
    year:this.data.cur_year
  }).get().then(res=>{
    var cur_day=new Date().getDate()
    var cur_cell=new Date(Date.UTC(this.data.cur_year, this.data.cur_month - 1, 1)).getDay()
    console.log(res.data[0].days[cur_day+cur_cell-2].isSign)
   this.setData({
     isCheck:res.data[0].days[cur_day+cur_cell-2].isSign
   })
  })
  }
 
 })
 