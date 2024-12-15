import { config } from '../../config/index';
import { fetchNotFinishedTaskList } from '../../services/task/fetchNotFinishedTaskList';
import { fetchCreationList } from '../../services/creation/fetchCreationList';
import { fetchExportCreations } from '../../services/creation/fetchExportCreations';
import { fetchProductList } from '../../services/product/fetchProductList';
import Toast from 'tdesign-miniprogram/toast/index';

const app = getApp();

Page({
  data: {
    galleryTab: 0,
    creationList: [],
    notFinishedTaskList: [],
    skuId: '',

    chooseList: [],
    isChooseImage: false,
    printLoading: false,
    fromProductOrderData: null,

    popupVisible: false,
    productList: [],
    productListLoading: false,

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

  onShow() {
    this.getTabBar().init();

    this.init();

    this.setData({
      printLoading: false,
    })
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
    const fromProductOrderData = app.globalData.fromProductOrderData;
    this.setData({
      galleryTab: app.globalData.galleryTab,
    });
    if (fromProductOrderData) {
      this.setData({
        isChooseImage: true,
        fromProductOrderData,
      });
      app.globalData.fromProductOrderData = null;
    }
    app.globalData.galleryTab = 0;

    this.loadPage();
  },

  loadPage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    fetchCreationList().then((list) => {
      this.setData({
        creationList: list,
        pageLoading: false,
      });
    });

    fetchNotFinishedTaskList().then((list) => {
      this.setData({
        notFinishedTaskList: list,
      });
    });
  },

  creationListClickHandle(e) {
    console.log(e);
    const creation = e.detail.creation;

    app.globalData.previewCreation = creation;

    wx.navigateTo({
      url: `/pages/gallery/preview/index?creation_id=${creation.id}`,
    });
    // const image = e.detail.task.creations_preview_img;

    // TODO 四选一
  },

  tasksJumpClickHandle(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/gallery/tasks/index',
    });
  },

  tabChangeHandle(e) {
    this.setData({
      galleryTab: e.detail.value,
    });
  },

  creationChooseClickHandle(e) {
    const targetIndex = e.detail.index;

    const chooseList = [...this.data.chooseList];
    const index = chooseList.indexOf(targetIndex);
    if (index > -1) {
      chooseList.splice(index, 1);
    } else {
      chooseList.push(targetIndex);
    }

    this.setData({
      chooseList: chooseList,
    });
  },

  jumpChooseClickHandle() {
    this.setData({
      isChooseImage: true,
    });
  },

  printClickHandle(e) {
    // 从产品页过来不需要选产品
    if (this.data.fromProductOrderData) {
      this.productListClickHandle({ detail: this.data.fromProductOrderData });
    } else {
      this.setData({
        // printLoading: true,
        popupVisible: true,
        productListLoading: true,
      });

      fetchProductList().then((list) => {
        this.setData({
          productList: list,
          productListLoading: false,
        });
      });
    }
  },

  chooseCancelClickHandle() {
    this.setData({
      isChooseImage: false,
    });
  },

  onPopupVisibleChange(e) {
    this.setData({
      popupVisible: e.detail.visible,
    });
  },

  productListClickHandle(e) {
    console.log(e);
    // e.detail.product._id

    const previewPrintUrl = this.data.chooseList.map((i) => `http://${config.host}/output/1/${this.data.creationList[i].file_name}`);
    app.globalData.previewPrintCreations = this.data.chooseList.map((i) => this.data.creationList[i]);
    app.globalData.previewPrintUrl = previewPrintUrl;
    app.globalData.previewPrintProduct = e.detail.product;

    wx.navigateTo({
      url: '/pages/gallery/print-preview/index',
    });

    // fetchExportCreations(
    //   // { creation_ids: 
    //   this.data.chooseList.map((i) => this.data.creationList[i]._id),
    //   // }
    // ).then((data) => {
    //   console.log(data);

    //   app.globalData.previewPrintUrl = data.url;
    //   wx.navigateTo({
    //     url: '/pages/gallery/print-preview/index',
    //   });
    // });
  }

});
