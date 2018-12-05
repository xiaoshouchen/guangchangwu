const app = getApp();
import {
  API
} from '../../utils/api.js';

import {
  util
} from '../../utils/util.js';
Page({
  data: {
    videos: [],
    page: 1,
    isLoading: false,
    reachBottom: false,
    liked_img_src:'/resources/images/like-fill.png',
    like_img_src:'/resources/images/like.png',
    share_img_src:'/resources/images/share.png',
  },
  onPullDownRefresh: function() {
    var that = this;
  },
  onLoad: function() {
    util.log('加载')
    let that = this;
    util.http.get(API.VIDEO_LIST, {}, {
      page: 1
    }).then(res => {
      that.setData({
        videos: res.data.data,
        page: that.data.page + 1
      })
    });
  },
  onReady: function(res) {

  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      if (res.target.dataset.type == 'video') {
        return {
          title: res.target.dataset.title,
          path: '/pages/video/video?id=' + res.target.dataset.id,
          imageUrl: res.target.dataset.cover,
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
      }

    }
    return {
      title: '捏捏宠，吸猫一口，精神抖擞',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onReachBottom: function(e) {
    let that = this;
    that.setData({
      isLoading: true
    })
    util.http.get(API.VIDEO_LIST, {}, {
      page: this.data.page
    }).then(res => {
      if (res.data.code && res.data.data.length > 0) {
        this.setData({
          videos: that.data.videos.concat(res.data.data),
          isLoading: false
        });
      } else {
        that.setData({
          reachBottom: true
        })
      }
    }).catch(res => {
      that.setData({
        isLoading: false
      })
    })
  },
  onPullDownRefresh: function(e) {
    wx.showNavigationBarLoading();
    wx.hideNavigationBarLoading();
  },
  playVideo(e) {
    let data = {
      id: e.currentTarget.dataset.id
    }
    util.jump('to', '/pages/video/video', data);
  }
})