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
  }
  const http = {
    get(url, params, data, header) {
      return http_request(url, params, data, header, 'GET');
    },
    post(url, params, data, header) {
      return http_request(url, params, data, header, 'POST');
    },
    update(url, params, data, header) {
      return http_request(url, params, data, header, 'UPDATE');
    },
    delete(url, params, data, header) {
      return http_request(url, params, data, header, 'DELETE');
    },
  };
  export const util = {
    jump,
    timeAddZero,
    getRandomColor,
    http,
  }