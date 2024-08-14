import Toast from 'tdesign-miniprogram/toast/index';
const app = getApp()
Page({
  data: {
    image: null,
    originImage: null,
    chooseSourceVisible: false,
    warning: '测试waring',



    skuId: '',
    imageList: [{}, {}],

  },

  chooseSource(e) {
    // const { item } = e.currentTarget.dataset;

    this.setData(
      {
        // cur: item,
      },
      () => {
        this.setData({ chooseSourceVisible: true });
      },
    );
  },

  chooseSourceVisible(e) {
    this.setData({
      chooseSourceVisible: e.detail.visible,
    });
  },

  onChooseSourceClose() {
    this.setData({
      chooseSourceVisible: false,
    });
  },

  onChoosePhone() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success: (res) => {
        console.log(res.tempFiles[0].tempFilePath)
        console.log(res)

        this.setData({
          originImage: res.tempFiles[0].tempFilePath,
        });

        wx.navigateTo({
          url: `/pages/order/image-cropper/index?source=1&imgSrc=${res.tempFiles[0].tempFilePath}`
        })
      }
    })
    this.onChooseSourceClose();
  },

  onChooseGallery() {
    console.log('ggg')
    wx.navigateTo({
      url: `/pages/gallery/choose-gallery/index?choose=1&skuId=${this.data.skuId}`
    })
    // wx.navigateTo({
    //   url: `/pages/gallery/index?choose=1&skuId=${this.data.skuId}`,
    // })
    this.onChooseSourceClose();
  },

  editImage() {
    wx.navigateTo({
      url: `/pages/order/image-cropper/index?imgSrc=${this.data.originImage}`
    })
  },

  submit() {
    console.log('submit', this.data.image)

    wx.setStorageSync("tempChooseImageData", this.data.image);

    wx.navigateBack({
      delta: 1
    })
  },

  onShow() {
    // const tempCropperData = wx.getStorageSync("tempCropperData");
    console.log('chooseImage show', app.globalData.tempCropperData);
    if (app.globalData.tempCropperData) {
      this.setData({
        image: app.globalData.tempCropperData.url,
        originImage: app.globalData.tempCropperOriginData,
      })
      app.globalData.tempCropperData = null;
    }
  },
  onLoad(query) {
    const { skuId } = query;
    this.setData({
      skuId: skuId,
    });
  },
});
