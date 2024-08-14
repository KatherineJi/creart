Component({
  externalClasses: ['wr-class'],

  properties: {
    productList: {
      type: Array,
      value: [],
    },
    id: {
      type: String,
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    thresholds: {
      type: Array,
      value: [],
    },
  },

  data: {
    independentID: '',
  },

  lifetimes: {
    ready() {
      this.init();
    },
  },

  methods: {
    onClickProduct(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('click', { ...e.detail, index });
    },

    onAddCart(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('addcart', { ...e.detail, index });
    },

    onClickProductThumb(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('thumb', { ...e.detail, index });
    },

    init() {
      this.genIndependentID(this.id || '');
    },

    genIndependentID(id) {
      if (id) {
        this.setData({ independentID: id });
      } else {
        this.setData({
          independentID: `product-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});
