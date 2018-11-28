function jump(method, url, data = null, success = () => { }, fail = () => { }, complete = () => { }) {
  let params = '?';
  for (let item in data) {
    params += `&${item}=${data[item]}`;
  }
  console.log('utils.js-jump');
  console.log(url+params);
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

function time_add_zero(num) {
  return `0${num}`.slice(-num.length);
}

function get_rand_color() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
export const util = {
  jump: jump,
  time_add_zero: time_add_zero,
  get_rand_color: get_rand_color
}