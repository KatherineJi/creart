import updateManager from './common/updateManager';
import { config } from './config/index';
import { handleWechatLogin } from './services/_utils/auth';
App({
  onLaunch: function () {
    wx.cloud.init({ // 初始化云开发环境
      traceUser: true,
      env: config.cloudEnv
    })
  },
  onShow: function () {
    updateManager();
    handleWechatLogin();
  },
  globalData: {
    galleryTab: 0,
    previewCreation: {},
    previewTask: {},
    previewPrintUrl: '',
  },
});
