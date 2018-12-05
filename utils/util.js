import {
  CONFIG
} from './conf.js';
import {
  API
} from './api.js';

function log(message) {
  if (CONFIG.enviroment == 'dev') {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var options = currentPage.options //如果要获取url中所带的参数可以查看options
    let params = '';
    for (let i in options) {
      params += i + ":" + options[i];
    }
    console.log('路径：' + url + '\n' + '参数：' + params + '\n' + '输出信息为：' + message);
  } else {
    //DO NOTHING
  }
}

function jump(method, url, data = null, success = () => {}, fail = () => {}, complete = () => {}) {
  let params = '?';
  for (let item in data) {
    params += `&${item}=${data[item]}`;
  }
  switch (method) {
    case 'to':
      wx.navigateTo({
        url: url + params,
        success: success,
        fail: fail,
        complete: complete
      });
      break;
    case 'redirect':
      wx.redirectTo({
        url: url + params,
        success: success,
        fail: fail,
        complete: complete
      });
      break;
    case 'switch':
      data ? console.log('切换界面不支持参数') : '';
      wx.switchTab({
        url: url,
        success: success,
        fail: fail,
        complete: complete
      });
      break;
    default:
      //do nothing
      console.log('方法可选项为：to，redirect,switch')
  }
}

function timeAddZero(num) {
  return `0${num}`.slice(-num.length);
}

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

function replaceUrlParams(url, params) {
  for (let p in params) {
    url = url.replace(/({[a-zA-Z0-9]+})/, params[p]);
  }
  return url;
}

function http_request(url, params, data, header = {}, method) {
  let user_id = wx.getStorageSync('user_id');
  let token = wx.getStorageSync('token');
  if (user_id && token) {
    return new Promise((resovle, reject) => {
      wx.request({
        url: replaceUrlParams(url, params),
        header: header,
        method: method,
        data: data,
        success(res) {
          resovle(res)
        },
        fail(res) {
          reject(res)
        }
      })
    });
  } else {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: API.LOGIN,
            success(res) {
              wx.setStorageSync(user_id, res.data.data.user_id);
              wx.setStorageSync(token, res.data.data.token);
              http_request(url, params, data, header, method);
            },
            fail(res) {
              console.log('报错啦');
            }
          })
        }
      }
    })
  }

}
const http = {
  get(url, params, data, header) {
    Object.assign(data, {
      user_id: wx.getStorageSync('user_id'),
      token: wx.getStorageSync('token')
    })
    return http_request(url, params, data, header, 'GET');
  },
  post(url, params, data, header) {
    Object.assign(data, {
      user_id: wx.getStorageSync('user_id'),
      token: wx.getStorageSync('token')
    })
    return http_request(url, params, data, header, 'POST');
  },
  update(url, params, data, header) {
    Object.assign(data, {
      user_id: wx.getStorageSync('user_id'),
      token: wx.getStorageSync('token')
    })
    return http_request(url, params, data, header, 'UPDATE');
  },
  delete(url, params, data, header) {
    Object.assign(data, {
      user_id: wx.getStorageSync('user_id'),
      token: wx.getStorageSync('token')
    })
    return http_request(url, params, data, header, 'DELETE');
  },
};
export const util = {
  log,
  jump,
  timeAddZero,
  getRandomColor,
  http,
}