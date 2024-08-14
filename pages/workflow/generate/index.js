import { fetchTemplate } from '../../../services/workflow/fetchTemplate';
import { uploadImage } from '../../../services/workflow/uploadImage';
import { generateImage } from '../../../services/workflow/generateImage';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    template_id: 0,
    template: {},
    formData: [],
    autosize: {
      maxHeight: 120,
      minHeight: 20,
    },
    fileList: [],
    formValue: {},

    imgSrcs: [],
    tabList: [],
    templateList: [],
    templateListLoadStatus: 0,
    pageLoading: false,
    current: 1,
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

  onLoad(query) {
    const { template_id } = query;
    this.setData({
      template_id,
    });
    this.init();
  },

  onReachBottom() {
    if (this.data.templateListLoadStatus === 0) {
      this.loadtemplateList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadPage();
  },

  loadPage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    fetchTemplate(this.data.template_id).then((data) => {
      this.setData({
        template: data,
        formData: Object.keys(data.workflow.params).map(key => {
          return {
            ...data.workflow.params[key],
            key
          };
        }),
        pageLoading: false,
      });
    });
  },

  handleAddImage(e) {
    const { fileList } = this.data;
    const { files } = e.detail;

    console.log(files);

    // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
    this.setData({
      fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    });

    // 方法2：每次选择图片都上传，展示每次上传图片的进度
    // files.forEach(file => this.uploadFile(file))
  },

  handleRemoveImage(e) {
    const { index } = e.detail;
    const { fileList } = this.data;

    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },

  onTextChange(e) {
    this.setData({
      formValue: {
        ...this.data.formValue,
        [e.mark.key]: e.detail.value,
      },
    });
    console.log(e);
  },

  async handleFileUpload() {
    const { template_id, fileList, formValue, formData } = this.data;
    const res = await uploadImage(fileList[0]);
    // console.log(res);
    return res.file_name;
    // return new Promise((resolve) => {
    //   uploadImage(fileList[0]).then((res) => {
    //     console.log('1', res, res.file_name)
    //     resolve(res.file_name);
    //   })
    // })
  },

  async handleFormSubmit(e) {
    const { template_id, fileList, formValue, formData } = this.data;

    // 先上传图片
    let imageUrl = await this.handleFileUpload();
    //   this.handleFileUpload().then((imageUrl) => {
    //     console.log('2', imageUrl)
    //     this.handleGenerateImage(imageUrl);
    //   })
    // },

    // async handleGenerateImage(imageUrl) {
    //   const { template_id, fileList, formValue, formData } = this.data;

    // 提交表单
    const params = {};

    console.log(imageUrl, formData);
    formData.forEach((item) => {
      if (item.type === 'string') {
        params[item.key] = formValue[item.key];
      } else if (item.type === 'image') {
        // TODO 校验
        params[item.key] = imageUrl;
      }
    });

    const res = await generateImage({
      template_id,
      params,
    });

    console.log('res', res);

    // TODO bug 提示 + 跳转
    if (res.task_id) {
      const count = 3;
      (new Array(count)).forEach((t, i) => {
        const cur = count - i;
        setTimeout(() => {
          Toast({
            context: this,
            selector: '#t-success-toast',
            message: `创建任务成功！${cur}s后跳转至画廊...`,
            duration: cur * 1000,
            theme: 'success',
            direction: 'column',
          });
        }, i * 1000)
      });

      Toast({
        context: this,
        selector: '#t-success-toast',
        message: `创建任务成功！3s后跳转至画廊...`,
        duration: 3000, // cur * 1000,
        theme: 'success',
        direction: 'column',
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/gallery/index',
        })
      }, 3000)
    }
  },

  handleSuccessToastClose() {
    // TODO 跳转画廊
    // console.log('跳转画廊');
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    // this.loadtemplateList(true);
  },

  onReTry() {
    // this.loadtemplateList();
  },

  async loadtemplateList(fresh = false) {
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
      const nextList = await fetchtemplateList(pageIndex, pageSize);
      this.setData({
        templateList: fresh ? nextList : this.data.templateList.concat(nextList),
        templateListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
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

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/template/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
