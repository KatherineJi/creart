import { config } from '../../../../config/index';

Component({
  externalClasses: ['wr-class'],

  properties: {
    creationList: {
      type: Array,
      value: [],
    },
    chooseList: {
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
    host: config.host,
  },

  lifetimes: {
    ready() {
      this.init();
    },
  },

  methods: {
    onClickCreation(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('click', { index });
    },

    init() {
      this.genIndependentID(this.id || '');
    },

    genIndependentID(id) {
      if (id) {
        this.setData({ independentID: id });
      } else {
        this.setData({
          independentID: `creation-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});