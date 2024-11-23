// import { fetchTaskList } from '../../services/creation/fetchTaskList';
// import Toast from 'tdesign-miniprogram/toast/index';
import { config } from '../../../config/index';

const app = getApp();

Page({
  data: {
    creation: {},
    pageLoading: false,

    themeList: ['danger', 'success', 'warning', 'primary'],
  },

  onLoad() {
    const creation = app.globalData.previewCreation;
    console.log(creation);
    this.setData({
      creation: {
        ...creation,
        img: `http://${config.host}/output/1/${creation.file_name}`,
        // img: creation.preview_img?.startsWith('http') ? creation.preview_img : `http://${config.host}${creation.preview_img}`,
        // preview_img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/5c755fcb6ef03.png?sign=983d61fec331a9b9c4ff083f3dc0444a&t=1730909474',
        tags: creation.param_list.map(item => item.value),
        // 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/muxia-template-banner.png?sign=f03a0314eb94e0aea84c2ec96fd9afc0&t=1730908990',
      }
    });

    this.init();

    app.globalData.previewCreation = {};
  },

  init() {
    // this.loadPage();
  },

});
