import { config } from '../../config/index';
export function login({ code }) {
  // 直接用原生wx.request调用登录接口，成功后将token写入storage；
  // 封装 request 里会从storage中取token，所以这里不需要手动取
  // 默认在小程序启动时会调用handleWechatLogin，所以不需要手动调用login
  wx.request({
    url: `https://${config.host}/users/wechat-login`,
    method: 'POST',
    data: { code },
    success: (response) => {
      console.log('response', response)
      if (response.statusCode === 200) {
        const token = response.data.access_token;
        wx.setStorageSync('accessToken', token);
        wx.navigateTo({
          url: '/pages/home/home'
        });
      } else {
        wx.showToast({
          title: response.data.detail || '登录失败',
          icon: 'none'
        });
      }
    },
    fail: (error) => {
      console.log(error)
    },
  });
}

export function handleWechatLogin() {
  console.log('handleWechatLogin');
  wx.login({
    success: res => {
      if (res.code) {
        login({ code: res.code });
      }
    },
    fail: error => {
      wx.showToast({
        title: '获取登录凭证失败，请重试',
        icon: 'none'
      });
    }
  });
}
