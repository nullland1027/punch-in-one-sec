// pages/map/map.js
var util = require('../../utils/util.js');
Page({
  data: {
    Time:''
  },
	onLoad: function (e) {
    var that = this;
    setInterval(function(){
        that.setData({
            Time: util.formatTime(new Date())
        });    
    },1000);  
    // 使用 wx.createMapContext 获取 map 上下文
		this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.moveToLocation();
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        

      }
    })

  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
		
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:43.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:43.10229,
        longitude:123.3345211,
      }, {
        latitude:43.00229,
        longitude:113.3345211,
      }]
    })
  },
    confirm: function(){
      wx.showToast({
        title: "打卡成功", // 提示的内容
        icon: "success", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
        success: function () {
        },
        fail: function () {
        },
        complete: function () {
        }
    })
    }

})
