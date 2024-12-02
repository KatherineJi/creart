// import { fetchTaskList } from '../../services/creation/fetchTaskList';
// import Toast from 'tdesign-miniprogram/toast/index';
import { config } from '../../../config/index';

const app = getApp();

Page({
  data: {
    img: '',
    creation: {},
    pageLoading: false,
    buyPopupVisible: false,

    themeList: ['danger', 'success', 'warning', 'primary'],
  },

  onLoad() {
    const previewPrintUrl = app.globalData.previewPrintUrl;
    console.log(previewPrintUrl);
    this.setData({
      img: previewPrintUrl
    });

    this.init();

    app.globalData.previewPrintUrl = '';
  },

  init() {
    // this.loadPage();
  },

  buyNowClickHandle() {
    this.setData({ buyPopupVisible: true });
  },

  onVisibleChange(e) {
    this.setData({
      buyPopupVisible: e.detail.visible,
    });
  },

});
