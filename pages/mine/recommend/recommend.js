// pages/mine/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommends: [{
      app_id: "wxa6a0a8789c7d92d0",
      name: '表情包斗图',
      path: '/pages/index/index',
      img:'/resources/images/doutu.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  nav(e) {
    let mini = e.currentTarget.dataset.mini;
    wx.navigateToMiniProgram({
      appId: mini.app_id,
    })
  }
})