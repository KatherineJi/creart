import { fetchProductCategoryList } from '../../../services/product/fetchProductCategoryList';
import { fetchProductList } from '../../../services/product/fetchProductList';
Page({
  data: {
    productList: [],
    tabList: [],
    productListLoadStatus: 0,
    currentTabValue: '',
  },

  async init() {
    try {
      const result = await fetchProductCategoryList();
      this.setData({
        tabList: result,
        currentTabValue: result[0]?.id
      });

      this.fetchProductList(true);
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },

  onChange() {
    wx.navigateTo({
      url: '/pages/product/list/index',
    });
  },

  onLoad() {
    this.init(true);
  },

  async fetchProductList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ productListLoadStatus: 1 });

    try {
      const nextList = await fetchProductList();
      this.setData({
        productList: fresh ? nextList : this.data.productList.concat(nextList),
        productListLoadStatus: 0,
      });
      console.log('productList', this.data.productList);

    } catch (err) {
      this.setData({ productListLoadStatus: 3 });
    }
  },

  tabChangeHandle(e) {
    const { value } = e.detail;
    this.setData({
      currentTabValue: value,
    })
    // this.loadGoodsList(true);
  },

  productListClickHandle(e) {
    console.log('e', e);
    const { product } = e.detail;
    const { spu_id } = product;
    wx.navigateTo({
      url: `/pages/product/details/index?spuId=${spu_id}`,
    });
  },
});
