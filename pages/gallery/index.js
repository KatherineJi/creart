import { fetchTaskList } from '../../services/task/fetchTaskList';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    taskList: [],
    skuId: '',
    isChooseImage: false,

    imgSrcs: [],
    tabList: [],
    templateList: [],
    templateListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.templateListLoadStatus === 0) {
      // this.loadtemplateList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadPage();
  },

  loadPage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    fetchTaskList().then((list) => {
      this.setData({
        taskList: list,
        pageLoading: false,
      });
    });
  },

  taskListClickHandle(e) {
    console.log(e);
    const image = e.detail.task.creations_preview_img;

    // TODO 四选一
  },

});
