import updateManager from './common/updateManager';
import { config } from './config/index';

App({
  onLaunch: function () {
    wx.cloud.init({ // 初始化云开发环境
      traceUser: true,
      env: config.cloudEnv
    })
  },
  onShow: function () {
    updateManager();
  },
  globalData: {
    galleryTab: 0,
    previewCreation: {},
    previewTask: {},
  },
});
