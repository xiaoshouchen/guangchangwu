// pages/video/video.js
import {
  util
} from '../../utils/util.js';
import {
  API
} from '../../utils/api.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {},
    liked_img_src: '../../static/liked.png',
    like_img_src: '../../static/like.png',
    restore_img_src: '../../static/restore.png',
    restored_img_src: '../../static/restored.png',
    share_img_src: '../../static/share.png',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      video_id: options.id
    });
    console.log(that.data.video_id);
    util.http.get(API.GET_VIDEO, {
      id: that.data.video_id
    }, {}).then(res => {
      that.setData({
        video: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo')
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
  goToIndex: function() {

  },
  getTime: function(e) {
    //console.log(e.detail.currentTime);
    this.currentTime = e.detail.currentTime;
  },
})