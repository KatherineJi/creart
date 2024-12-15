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
    debugger;
    const previewPrintCreations = app.globalData.previewPrintCreations;
    const previewPrintUrl = app.globalData.previewPrintUrl;
    const previewPrintProduct = app.globalData.previewPrintProduct;
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
    app.globalData.fromProductOrderData = {};
    console.log('orderData', orderData);

    const { creations } = this.data;
    const orderDetail = {
      // "message": "请尽快发货",
      orderData,
      "products": [
        [
          {
            // "attributes_kv": {
            //   "尺寸": "A4",
            //   "材质": "纸质"
            // },
            "creation_ids": creations.map((c) => c._id),
            "quantity": orderData.productRequestList.quantity,
            "sku_id": orderData.skuId
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
