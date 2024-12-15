import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import { fetchProductList } from '../../services/product/fetchProductList';
import { fetchTemplateList } from '../../services/workflow/fetchTemplateList';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    swiperList: [],
    secondSwiperList: [],
    tabList: [],
    templateList: [],
    templateListLoadStatus: 0,
    // productList: [],
    // productListLoadStatus: 0,


    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 0,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
  },

  templateListPagination: {
    index: 0,
    num: 5,
  },

  productListPagination: {
    index: 0,
    num: 5,
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
    // TODO 加载更多商品
    // if (this.data.goodsListLoadStatus === 0) {
    //   this.loadGoodsList();
    // }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper, secondSwiper, tabList }) => {
      this.setData({
        tabList,
        swiperList: swiper,
        swiperImgs: swiper.map(item => item.img),
        secondSwiperList: secondSwiper,
        secondSwiperImgs: secondSwiper.map(item => item.img),
        pageLoading: false,
      });
      console.log(1)
      this.fetchProductList(true);
      this.loadTemplateList(true);

      console.log(2)
    });
  },

  async fetchProductList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ productListLoadStatus: 1 });

    const pageSize = this.productListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.productListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchProductList(pageIndex, pageSize);
      this.setData({
        productList: fresh ? nextList : this.data.productList.concat(nextList),
        productListLoadStatus: 0,
      });
      console.log('productList', this.data.productList);

      // this.goodListPagination.index = pageIndex;
      // this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ productListLoadStatus: 3 });
    }
  },

  async loadTemplateList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ templateListLoadStatus: 1 });

    const pageSize = this.templateListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.templateListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchTemplateList(pageIndex, pageSize);
      this.setData({
        templateList: fresh ? nextList : this.data.templateList.concat(nextList),
        templateListLoadStatus: 0,
      });

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

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  productListClickHandle(e) {
    console.log('e', e);
    const { product } = e.detail;
    const { spu_id } = product;
    wx.navigateTo({
      url: `/pages/product/details/index?spuId=${spu_id}`,
    });
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/product/search/index' });
  },

  handleSwiperClick(e) {
    const index = e.detail.index;
    const imgItem = this.data.swiperList[index];

    if (imgItem.type === 'template') {
      wx.navigateTo({
        url: `/pages/workflow/generate/index?template_id=${imgItem.id}`,
      });
    }
  },

  handleSecondSwiperClick(e) {
    const index = e.detail.index;
    const imgItem = this.data.secondSwiperList[index];

    if (imgItem.type === 'template') {
      wx.navigateTo({
        url: `/pages/workflow/generate/index?template_id=${imgItem.id}`,
      });
    }
  },

  goTemplateListClickHandle() {
    wx.navigateTo({
      url: '/pages/workflow/category/index',
    });
  },

  goProductListClickHandle() {
    wx.navigateTo({
      url: '/pages/product/category/index',
    });
  },
});
