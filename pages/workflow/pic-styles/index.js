import { fetchTemplateList } from '../../../services/workflow/fetchTemplateList';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    templateList: [],

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

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.templateListLoadStatus === 0) {
      this.loadtemplateList();
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

    fetchTemplateList().then((list) => {
      this.setData({
        templateList: list,
        // imgSrcs: swiper,
        pageLoading: false,
      });
    });
    // fetchHome().then(({ swiper, tabList }) => {

    //   this.loadtemplateList(true);
    // });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    // this.loadtemplateList(true);
  },

  onReTry() {
    // this.loadtemplateList();
  },

  async loadtemplateList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ templateListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchtemplateList(pageIndex, pageSize);
      this.setData({
        templateList: fresh ? nextList : this.data.templateList.concat(nextList),
        templateListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ templateListLoadStatus: 3 });
    }
  },

  templateListClickHandle(e) {
    const tid = e.detail.template.id;
    wx.navigateTo({
      url: `/pages/workflow/generate/index?template_id=${tid}`,
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/template/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
