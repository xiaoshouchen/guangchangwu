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
    restore_img_src: '../../resources/images/restore.png',
    restored_img_src: '../../resources/images/restored.png',
    share_img_src: '../../resources/images/share.png',
    abouts: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      video_id: options.id
    });
    //请求视频
    util.http.get(API.GET_VIDEO, {
      id: that.data.video_id
    }, {}).then(res => {
      that.setData({
        video: res.data.data
      })
    })
    //提交浏览
    util.http.post(API.VIEW_VIDEO, {
      id: options.id
    })
    //获取相关视频
    util.http.get(API.ABOUT, {
      id: that.data.video_id
    }, {}).then(res => {
      that.setData({
        abouts: res.data.data
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