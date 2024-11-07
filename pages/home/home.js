import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
// import { fetchProductList } from '../../services/product/fetchProductList';
import { fetchTemplateList } from '../../services/workflow/fetchTemplateList';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    swiperList: [],
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
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
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
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        swiperList: swiper,
        imgSrcs: swiper.map(item => item.img),
        pageLoading: false,
      });
      console.log(1)
      // this.fetchProductList(true);
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

    // const pageSize = this.goodListPagination.num;
    // let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    // if (fresh) {
    //   pageIndex = 0;
    // }

    try {
      const nextList = await fetchProductList();
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

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
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

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
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

  navToActivityDetail(e) {
    const index = e.detail.index;
    const imgItem = this.data.swiperList[index];

    if (imgItem.type === 'template') {
      wx.navigateTo({
        url: `/pages/workflow/generate/index?template_id=${imgItem.id}`,
      });
    }
  },
});
