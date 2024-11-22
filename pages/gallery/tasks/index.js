import { fetchTaskList } from '../../../services/task/fetchTaskList';
import Toast from 'tdesign-miniprogram/toast/index';

const app = getApp();

Page({
  data: {
    galleryTab: 0,
    taskList: [],
    skuId: '',
    isChooseImage: false,

    imgSrcs: [],
    tabList: [
      {
        key: 0,
        text: '全部'
      },
      {
        key: 1,
        text: '生成中'
      },
      {
        key: 2,
        text: '已完成'
      }
    ],
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

  onLoad() {
    this.setData({
      galleryTab: app.globalData.galleryTab
    });

    this.init();

    app.globalData.galleryTab = 0;
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
    const task = e.detail.task;

    app.globalData.previewTask = task;

    wx.navigateTo({
      url: `/pages/gallery/task-detail/index?task_id=${task.id}`,
    });
    // const image = e.detail.task.tasks_preview_img;

    // TODO 四选一
  },

  tabChangeHandle(e) {
    this.setData({
      galleryTab: e.detail.value,
    });
  }

});
