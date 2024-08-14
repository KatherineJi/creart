Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: { multipleSlots: true },

  properties: {
    spuId: {
      type: String,
      value: '',
    },
    soldout: {
      // 商品是否下架
      type: Boolean,
      value: false,
    },
    jumpArray: {
      type: Array,
      value: [],
    },
    isStock: {
      type: Boolean,
      value: true,
    }, // 是否有库存
    isSlotButton: {
      type: Boolean,
      value: false,
    }, // 是否开启按钮插槽
    shopCartNum: {
      type: Number, // 购物车气泡数量
    },
    buttonType: {
      type: Number,
      value: 0,
    },
    minDiscountPrice: {
      type: String,
      value: '',
    },
    minSalePrice: {
      type: String,
      value: '',
    },
  },

  data: {
    fillPrice: false,
  },

  methods: {
    toWorkflow() {
      const path = '/pages/workflow/pic-styles/index';
      wx.navigateTo({
        url: path,
      });
    },

    toPrint() {
      const { isStock, spuId } = this.properties;
      // if (!isStock) return;
      // this.triggerEvent('toAddCart');
      const path = `/pages/workflow/pic-styles/index?spuId=${spuId}`;
      wx.navigateTo({
        url: path,
      });
    },

    toBuyNow(e) {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
      const { url } = e.currentTarget.dataset;
      return this.triggerEvent('toNav', {
        e,
        url,
      });
    },
  },
});
