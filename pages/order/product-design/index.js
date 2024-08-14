import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    skuId: '',
    imageList: [],
    warning: '测试warning'
  },

  toAdd() {
    const path = `/pages/order/choose-image/index?skuId=${this.data.skuId}`;
    wx.navigateTo({
      url: path,
    });
  },

  submit() {
    console.log('提交', this.data.imageList);

    Toast({
      context: this,
      selector: '#t-success-toast',
      message: `创建订单成功！3s后跳转回首页...`,
      duration: 3000, // cur * 1000,
      theme: 'success',
      direction: 'column',
    });
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }, 3000);
  },

  onShow() {
    const tempChooseImageData = wx.getStorageSync("tempChooseImageData");
    console.log('show:product-design', tempChooseImageData);
    if (tempChooseImageData) {
      wx.removeStorage({
        key: 'tempChooseImageData',
        success(res) {
          console.log(res)
        }
      })
      const imageList = this.data.imageList;
      imageList.push({
        url: tempChooseImageData
      });
      this.setData({
        imageList,
      });
    }
  },

  onLoad(query) {
    const { skuId } = query;
    this.setData({
      skuId: skuId,
    });
  },
});
