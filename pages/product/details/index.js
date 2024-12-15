import Toast from 'tdesign-miniprogram/toast/index';
import { fetchProduct } from '../../../services/product/fetchProduct';
import { fetchSkus } from '../../../services/product/fetchSkus';
// import {
//   getProductDetailsCommentList,
//   getProductDetailsCommentsCount,
// } from '../../../services/product/fetchProductDetailsComments';

import { cdnBase } from '../../../config/index';
import { getRandomNum } from '../../../utils/mock';

const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;
const obj2Params = (obj = {}, encode = false) => {
  const result = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`),
  );

  return result.join('&');
};

const app = getApp();

Page({
  data: {
    spuId: '',
    details: {},

    commentsList: [],
    commentsStatistics: {
      badCount: 0,
      commentCount: 0,
      productCount: 0,
      productRate: 0,
      hasImageCount: 0,
      middleCount: 0,
    },
    isShowPromotionPop: false,
    activityList: [],
    recLeftImg,
    recRightImg,
    productTabArray: [
      {
        name: '商品',
        value: '', // 空字符串代表置顶
      },
      {
        name: '详情',
        value: 'product-page',
      },
    ],
    storeLogo: `${imgPrefix}common/store-logo.png`,
    storeName: '云mall标准版旗舰店',
    jumpArray: [
      {
        title: '首页',
        url: '/pages/home/home',
        iconName: 'home',
      },
      {
        title: '画廊',
        url: '/pages/gallery/index',
        iconName: 'image',
        showCartNum: true,
      },
    ],
    isStock: true,
    cartNum: 0,
    soldout: false,
    buttonType: 1,
    buyNum: 1,
    selectedAttrStr: '',
    skuArray: [],
    primaryImage: '',
    specImg: '',
    isSpuSelectPopupShow: false,
    isAllSelectedSku: false,
    buyType: 0,
    outOperateStatus: false, // 是否外层加入购物车
    operateType: 0,
    selectSkuSellsPrice: 0,
    maxLinePrice: 0,
    minSalePrice: 0,
    maxSalePrice: 0,
    list: [],
    navigation: { type: 'fraction' },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    soldNum: getRandomNum(10, 999), // TODO 已售数量
  },

  // 关闭popup
  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },

  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  // 底部点：立即制作
  buyItNow() {
    const { specList } = this.data.details;
    this.showSkuSelectPopup(1);

    // 模拟单个sku默认点击
    if (specList.length <= 0) {
      this.chooseSpecItem({
        detail: {
          selectedSku: {},
          isAllSelectedSku: true,
          skipSelectSpec: true,
          selectItem: this.data.skuArray[0],
        }
      });
    }
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  // 底部跳转（首页, 画廊）
  toNav(e) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  showCurImg(e) {
    const { index } = e.detail;
    const { images } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onPageScroll({ scrollTop }) {
    const productTab = this.selectComponent('#productTab');
    productTab && productTab.onScroll(scrollTop);
  },

  chooseSpecItem(e) {
    const { specList } = this.data.details;
    const { selectedSku, isAllSelectedSku, skipSelectSpec, selectItem } = e.detail;
    console.log(selectedSku, isAllSelectedSku)
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku, skipSelectSpec, selectItem);
  },

  getSkuItem(specList, selectedSku, skipSelectSpec, selectItem) {
    const { skuArray, primaryImage } = this.data;
    const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
    let selectedAttrStr = ` 件  `;
    selectedSkuValues.forEach((item) => {
      selectedAttrStr += `，${item.specValue}  `;
    });
    // eslint-disable-next-line array-callback-return
    const skuItem = skipSelectSpec ? selectItem : skuArray.filter((item) => {
      let status = true;
      (item.specInfo || []).forEach((subItem) => {
        if (
          !selectedSku[subItem.specId] ||
          selectedSku[subItem.specId] !== subItem.specValueId
        ) {
          status = false;
        }
      });
      if (status) return item;
    })[0];
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
    console.log(skuItem)
    if (skuItem) {
      this.setData({
        selectItem: skuItem,
        selectSkuSellsPrice: skuItem.price || 0,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    });
  },

  // 获取已选择的sku名称
  getSelectedSkuValues(skuTree, selectedSku) {
    const normalizedTree = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue = skuValues.filter((value) => {
          return value.specValueId === skuValueId;
        })[0];
        skuValue && selectedValues.push(skuValue);
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  updateSelectedAttrStr(e) {
    this.setData({
      selectedAttrStr: e.detail.selectedAttrStr,
    });
  },

  selectSpecsName(selectSpecsName) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },

  addCart() {
    const { isAllSelectedSku } = this.data;
    Toast({
      context: this,
      selector: '#t-toast',
      message: isAllSelectedSku ? '点击加入购物车' : '请选择规格',
      icon: '',
      duration: 1000,
    });
  },

  gotoBuy(type) {
    const { isAllSelectedSku, buyNum } = this.data;
    // if (!isAllSelectedSku) {
    //   Toast({
    //     context: this,
    //     selector: '#t-toast',
    //     message: '请选择规格',
    //     icon: '',
    //     duration: 1000,
    //   });
    //   return;
    // }
    this.handlePopupHide();
    const query = {
      quantity: buyNum,
      storeId: '1',
      spuId: this.data.spuId,
      productName: this.data.details.title,
      skuId:
        type === 1 ? this.data.skuList[0].skuId : this.data.selectItem?.skuId,
      available: this.data.details.available,
      price: this.data.details.minSalePrice,
      specInfo: this.data.details.specList?.map((item) => ({
        specTitle: item.title,
        specValue: item.specValueList[0].specValue,
      })),
      primaryImage: this.data.details.primaryImage,
      // spuId: this.data.details.spuId,
      thumb: this.data.details.primaryImage,
      title: this.data.details.title,
    };
    console.log('跳转', query, this.data);
    let urlQueryStr = obj2Params({
      productRequestList: JSON.stringify([query]),
      skuId: query.skuId,
    });
    urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
    // const path = `/pages/order/product-design/index${urlQueryStr}`;
    // const path = `/pages/order/order-confirm/index`;
    app.globalData.fromProductOrderData = {
      productRequestList: query,
      skuId: query.skuId,
      product: this.data.details,
    };
    wx.switchTab({
      url: '/pages/gallery/index',
    });

    // wx.navigateTo({
    //   url: path,
    // });
  },

  // 选了SKU之后点确认
  specsConfirm() {
    // const { buyType } = this.data;
    // this.gotoBuy();
    // if (buyType === 1) {
    //   this.gotoBuy();
    // } else {
    //   this.addCart();
    // }
    // this.handlePopupHide();
    wx.switchTab({
      url: '/pages/gallery/index',
    });
  },

  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  },

  closePromotionPopup() {
    this.setData({
      isShowPromotionPop: false,
    });
  },

  promotionChange(e) {
    const { index } = e.detail;
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${index}`,
    });
  },

  showPromotionPopup() {
    this.setData({
      isShowPromotionPop: true,
    });
  },

  // 根据spu获取商品详情
  async getDetail(spuId) {
    Promise.all([fetchProduct(spuId), fetchSkus(spuId)]).then((res) => {
      console.log(res);
      // 
      const [details,] = res;
      const skus = details.skus;

      const skuArray = [];

      let minSalePrice = 9999;
      let maxSalePrice = 0;

      const specList = [];
      const specInfo = {};

      skus.forEach((sku) => {
        if (minSalePrice > +sku.price) {
          minSalePrice = +sku.price;
          console.log(+sku.price);
        }
        if (maxSalePrice < +sku.price) {
          maxSalePrice = +sku.price;
        }

        skuArray.push({
          skuId: sku.sku_id,
          quantity: sku.stock, // item.stockInfo ? item.stockInfo.stockQuantity : 0,
          specInfo: Object.keys(sku.attributes_kv).map((key) => {
            const value = sku.attributes_kv[key];
            if (!specInfo[key]) {
              specInfo[key] = [];
            }
            if (!specInfo[key].find((item) => item === value)) {
              specInfo[key].push(value);
            }

            return {
              specId: key,
              specTitle: null,
              specValueId: value,
              specValue: null,
            }
          }),
          price: +sku.price,
        });
      });

      Object.keys(specInfo).forEach((key) => {
        specList.push({
          specId: key,
          title: key,
          specValueList: specInfo[key].map(item => ({
            specValueId: item,
            specId: null,
            saasId: null,
            specValue: item,
            image: null,
          }))
        })
      });

      details.specList = specList;

      console.log('details', details);

      this.setData({
        details: {
          ...details,
          minSalePrice,
          maxSalePrice,
          skuArray,
        },
        skuArray: skuArray,
        minSalePrice,
        maxSalePrice,
        primaryImage: details.preview_imgs[0],
      });
    });
  },

  // async getCommentsList() {
  //   try {
  //     const code = 'Success';
  //     const data = await getProductDetailsCommentList();
  //     const { homePageComments } = data;
  //     if (code.toUpperCase() === 'SUCCESS') {
  //       const nextState = {
  //         commentsList: homePageComments.map((item) => {
  //           return {
  //             productSpu: item.spuId,
  //             userName: item.userName || '',
  //             commentScore: item.commentScore,
  //             commentContent: item.commentContent || '用户未填写评价',
  //             userHeadUrl: item.isAnonymity
  //               ? this.anonymityAvatar
  //               : item.userHeadUrl || this.anonymityAvatar,
  //           };
  //         }),
  //       };
  //       this.setData(nextState);
  //     }
  //   } catch (error) {
  //     console.error('comments error:', error);
  //   }
  // },

  onShareAppMessage() {
    // 自定义的返回信息
    const { selectedAttrStr } = this.data;
    let shareSubTitle = '';
    if (selectedAttrStr.indexOf('件') > -1) {
      const count = selectedAttrStr.indexOf('件');
      shareSubTitle = selectedAttrStr.slice(count + 1, selectedAttrStr.length);
    }
    const customInfo = {
      imageUrl: this.data.details.primaryImage,
      title: this.data.details.title + shareSubTitle,
      path: `/pages/product/details/index?spuId=${this.data.spuId}`,
    };
    return customInfo;
  },

  /** 获取评价统计 */
  // async getCommentsStatistics() {
  //   try {
  //     const code = 'Success';
  //     const data = await getProductDetailsCommentsCount();
  //     if (code.toUpperCase() === 'SUCCESS') {
  //       const {
  //         badCount,
  //         commentCount,
  //         productCount,
  //         productRate,
  //         hasImageCount,
  //         middleCount,
  //       } = data;
  //       const nextState = {
  //         commentsStatistics: {
  //           badCount: parseInt(`${badCount}`),
  //           commentCount: parseInt(`${commentCount}`),
  //           productCount: parseInt(`${productCount}`),
  //           /** 后端返回百分比后数据但没有限制位数 */
  //           productRate: Math.floor(productRate * 10) / 10,
  //           hasImageCount: parseInt(`${hasImageCount}`),
  //           middleCount: parseInt(`${middleCount}`),
  //         },
  //       };
  //       this.setData(nextState);
  //     }
  //   } catch (error) {
  //     console.error('comments statiistics error:', error);
  //   }
  // },

  /** 跳转到评价列表 */
  navToCommentsListPage() {
    wx.navigateTo({
      url: `/pages/product/comments/index?spuId=${this.data.spuId}`,
    });
  },

  onLoad(query) {
    const { spuId } = query;
    this.setData({
      spuId: spuId,
    });
    this.getDetail(spuId);
    // this.getCommentsList(spuId);
    // this.getCommentsStatistics(spuId);
  },
});
