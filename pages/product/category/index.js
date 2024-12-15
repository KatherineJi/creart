import { fetchProductCategoryList } from '../../../services/product/fetchProductCategoryList';
import { fetchProductList } from '../../../services/product/fetchProductList';
Page({
  data: {
    productList: [],
    allProductList: [],
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

  onShow() { },

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
      const allProductList = fresh ? nextList : this.data.productList.concat(nextList);
      const productList = this.data.currentTabValue === 'ALL' ? allProductList : allProductList.filter((p) => p.product_type === this.data.currentTabValue);

      this.setData({
        productList: productList,
        allProductList: allProductList,
        productListLoadStatus: 0,
      });
    } catch (err) {
      this.setData({ productListLoadStatus: 3 });
    }
  },

  tabChangeHandle(e) {
    const { value } = e.detail;
    this.setData({
      currentTabValue: value,
    });

    // 更新产品列表productList
    const productList = value === 'ALL' ? this.data.allProductList : this.data.allProductList.filter((p) => p.product_type === value);

    this.setData({
      productList: productList,
    });
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
