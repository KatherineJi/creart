import { fetchTemplateList } from '../../../services/workflow/fetchTemplateList';
Page({
  data: {
    templateList: [],
    templateListLoadStatus: 0,
    currentTabValue: '',
  },

  async init() {
    try {
      this.fetchTemplateList(true);
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() { },

  onChange() {
    wx.navigateTo({
      url: '/pages/template/list/index',
    });
  },

  onLoad() {
    this.init(true);
  },

  async fetchTemplateList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ templateListLoadStatus: 1 });

    try {
      const nextList = await fetchTemplateList();
      const allTemplateList = fresh ? nextList : this.data.templateList.concat(nextList);

      this.setData({
        templateList: allTemplateList,
        templateListLoadStatus: 0,
      });
    } catch (err) {
      this.setData({ templateListLoadStatus: 3 });
    }
  },

  templateListClickHandle(e) {
    console.log('e', e);
    // const { template } = e.detail;
    // const { spu_id } = template;
    // wx.navigateTo({
    //   url: `/pages/template/details/index?spuId=${spu_id}`,
    // });
    const tid = e.detail.template.id;
    wx.navigateTo({
      url: `/pages/workflow/generate/index?template_id=${tid}`,
    });
  },
});
