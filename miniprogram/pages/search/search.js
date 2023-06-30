// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

   /**
   * 搜索框
   */
  onSearchChange(e) {
    console.log('onSearchChange', e)
    this.setData({
      search_value: e.detail.value
    })
  },
  onSearchFocus(e) {
    console.log('onSearchFocus', e)
  },
  onSearchBlur(e) {
    console.log('onSearchBlur', e)
  },
  onSearchConfirm(e) {
    console.log('onSearchConfirm', e)
  },
  onSearchClear(e) {
    console.log('onSearchClear', e)
    this.setData({
      search_value: null
    })
  },
  onSearchCancel(e) {
    console.log('onSearchCancel', e)
    this.setData({
      searchValue: null
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})