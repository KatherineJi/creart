// import { fetchTaskList } from '../../services/creation/fetchTaskList';
// import Toast from 'tdesign-miniprogram/toast/index';
import { config } from '../../../config/index';

const app = getApp();

Page({
  data: {
    img: '',
    imgs: [],
    product: {},
    // creation: {},
    // pageLoading: false,
    buyPopupVisible: false,

    themeList: ['danger', 'success', 'warning', 'primary'],
  },

  onLoad() {
    const previewPrintCreations = app.globalData.previewPrintCreations;
    const previewPrintUrl = app.globalData.previewPrintUrl;
    const previewPrintProduct = app.globalData.previewPrintProduct;

    if (previewPrintProduct) {
      const skus = previewPrintProduct.skus;

      const skuArray = [];

      let minSalePrice = 9999;
      let maxSalePrice = 0;

      const specList = [];
      const specInfo = {};

      skus.forEach((sku) => {
        if (minSalePrice > +sku.price) {
          minSalePrice = +sku.price;
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

      previewPrintProduct.specList = specList;
      previewPrintProduct.skuArray = skuArray;
      previewPrintProduct.minSalePrice = minSalePrice;
      previewPrintProduct.maxSalePrice = maxSalePrice;
    }


    if (Array.isArray(previewPrintCreations)) {
      this.setData({
        creations: previewPrintCreations,
        imgs: previewPrintCreations.map((c) => `http://${config.host}/output/1/${c.file_name}`),
        product: previewPrintProduct,
      });
    } else {
      this.setData({
        img: previewPrintUrl,
        product: previewPrintProduct,
      });
    }
    if (previewPrintProduct.selectedSkuDetail) {
      this.setData({
        selectedSkuDetail: previewPrintProduct.selectedSkuDetail,
      });
    }

    this.init();

    // app.globalData.previewPrintCreations = [];
    // app.globalData.previewPrintUrl = '';
    // app.globalData.previewPrintProduct = {};
  },

  init() {
    // this.loadPage();
  },

  specsConfirm() {
    const orderData = app.globalData.fromProductOrderData;
    app.globalData.fromProductOrderData = null;
    console.log('orderData', orderData);

    const { creations } = this.data;
    const attributes_kv = {};
    orderData.productRequestList.specInfo.forEach((spec) => {
      attributes_kv[spec.specTitle] = spec.specValue;
    });
    const orderDetail = {
      // "message": "请尽快发货",
      orderData,
      "products": [
        {
          "attributes_kv": attributes_kv,
          "creation_ids": creations.map((c) => c._id),
          "quantity": orderData.productRequestList.quantity,
          "sku_id": orderData.skuId
        }
      ],
      // "receiver_info": {
      //   "address": "安徽省安宁市大观区",
      //   "name": "受给验",
      //   "phone": "15383889052"
      // }
    };

    const path = `/pages/order/order-confirm/index?order=${JSON.stringify(orderDetail)}`;
    wx.navigateTo({
      url: path,
    });
  },

  buyNowClickHandle() {
    // this.setData({ buyPopupVisible: true });
    const orderDetail = {
      "message": "请尽快发货",
      "products": [
        [
          {
            "attributes_kv": {
              "尺寸": "A4",
              "材质": "纸质"
            },
            "creation_ids": creations.map((c) => c._id),
            "quantity": 26,
            "sku_id": "3-1"
          }
        ]
      ],
      // "receiver_info": {
      //   "address": "安徽省安宁市大观区",
      //   "name": "受给验",
      //   "phone": "15383889052"
      // }
    };

    const path = `/pages/order/order-confirm/index?order=${JSON.stringify(orderDetail)}`;
    wx.navigateTo({
      url: path,
    });
  },

  onVisibleChange(e) {
    this.setData({
      buyPopupVisible: e.detail.visible,
    });
  },

});
