import { fetchTemplate } from '../../../services/workflow/fetchTemplate';
import { uploadImage } from '../../../services/workflow/uploadImage';
import { generateImage } from '../../../services/workflow/generateImage';
import Toast from 'tdesign-miniprogram/toast/index';
import Message from 'tdesign-miniprogram/message/index';

const app = getApp();

Page({
  data: {
    template_id: 0,
    template: {},
    formImage: null,
    formData: [],
    autosize: {
      maxHeight: 120,
      minHeight: 20,
    },
    fileList: [],
    formValue: {},
    // 0: 上传前 1: 上传中 2: 上传成功 99: 上传失败 3: 生成前 4: 开始生成
    generateStatus: 0,
    uploadImageUrl: '',

    themeList: ['danger', 'success', 'warning', 'primary'],

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

    gridConfig: {
      column: 1,
      width: 640,
      height: 640,
    },
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

    const formValue = {};

    fetchTemplate(this.data.template_id).then((data) => {
      const formData = [];
      let formImage = null;

      Object.keys(data.workflow.params).forEach(key => {
        const item = data.workflow.params[key];
        if (item?.type === 'image') {
          formImage = {
            ...item,
            key
          };
        } else {
          if (item.type === 'select' && item.options) {
            item.keys = item.options.map(option => option.key)
            // Object.keys(item.options);
            if (item.required && item.default) {
              formValue[key] = item.default;
            }
          }
          formData.push({
            ...item,
            key
          });
        }
      });

      console.log(formValue);

      this.setData({
        template: data,
        formData,
        formValue,
        formImage,
        pageLoading: false,
        generateStatus: !!formImage ? 0 : 3,
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
      generateStatus: 0,
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

  onOptionSelect(e) {
    this.setData({
      formValue: {
        ...this.data.formValue,
        [e.mark.key]: e.mark.value,
      },
    });
    console.log(e);
  },

  async handleFileUpload() {
    const { template_id, fileList, formValue, formData } = this.data;

    if (!fileList.length) {
      Message.info({
        context: this,
        offset: [32, 32],
        duration: 3000,
        // icon: false,
        // single: false, // 打开注释体验多个消息叠加效果
        content: '请选择参考图',
      });
      return;
    }

    this.setData({
      generateStatus: 1,
    });

    const res = await uploadImage(fileList[0]);
    console.log(res);

    // TODO 先不管失败-99
    this.setData({
      generateStatus: 2,
      uploadImageUrl: res.file_name || res.path,
    });

    // return new Promise((resolve) => {
    //   uploadImage(fileList[0]).then((res) => {
    //     console.log('1', res, res.file_name)
    //     resolve(res.file_name);
    //   })
    // })
  },

  handleFileReupload() {
    this.setData({
      fileList: [],
      generateStatus: 0,
    });
  },

  handleNext() {
    this.setData({
      generateStatus: this.data.generateStatus + 1,
    });
  },

  handleBack() {
    this.setData({
      generateStatus: 2,
    });
  },

  handleJumpGallery() {
    // app.globalData.galleryTab = 2;
    wx.switchTab({
      url: '/pages/gallery/index',
    });
  },

  async handleFormSubmit(e) {
    const { template_id, formImage, formValue, formData, uploadImageUrl } = this.data;

    // 先上传图片
    // let imageUrl = await this.handleFileUpload();
    //   this.handleFileUpload().then((imageUrl) => {
    //     console.log('2', imageUrl)
    //     this.handleGenerateImage(imageUrl);
    //   })
    // },

    // async handleGenerateImage(imageUrl) {
    //   const { template_id, fileList, formValue, formData } = this.data;

    // 提交表单
    const params = {};

    formData.forEach((item) => {
      if (item.type === 'string') {
        params[item.key] = formValue[item.key];
      } else if (item.type === 'select') {
        // TODO 校验
        params[item.key] = formValue[item.key];
      }
      // else if (item.type === 'image') {
      //   // TODO 校验
      //   params[item.key] = uploadImageUrl;
      // }
    });

    if (formImage) {
      // TODO 校验
      params[formImage.key] = uploadImageUrl;
    }

    console.log('params', params);

    const res = await generateImage({
      template_id,
      params,
    });

    console.log('res', res);

    // TODO bug 提示 + 跳转
    if (res.task_id) {
      this.setData({
        // fileList: [],
        generateStatus: 4,
      });
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
      this.setData({ templateListLoadStatus: 99 });
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
