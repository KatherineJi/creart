import Toast from 'tdesign-miniprogram/toast/index';
import { fetchSettleDetail } from '../../../services/order/orderConfirm';
// import { commitPay, wechatPayOrder } from './pay';
import { getAddressPromise } from '../../usercenter/address/list/util';

const stripeImg = `https://cdn-we-retail.ym.tencent.com/miniapp/order/stripe.png`;

import Dialog from 'tdesign-miniprogram/dialog/index';
// import Toast from 'tdesign-miniprogram/toast/index';
// import { Toast } from 'tdesign-miniprogram';

import { dispatchCommitPay } from '../../../services/order/orderConfirm';

// 真实的提交支付
export const commitPay = (params) => {
  return dispatchCommitPay({
    goodsRequestList: params.goodsRequestList, // 待结算的商品集合
    invoiceRequest: params.invoiceRequest, // 发票信息
    // isIgnore: params.isIgnore || false, // 删掉 是否忽视库存不足和商品失效,继续结算,true=继续结算 购物车请赋值false
    userAddressReq: params.userAddressReq, // 地址信息(用户在购物选择更换地址)
    currency: params.currency || 'CNY', // 支付货币: 人民币=CNY，美元=USD
    logisticsType: params.logisticsType || 1, // 配送方式 0=无需配送 1=快递 2=商家 3=同城 4=自提
    // orderMark: params.orderMark, // 下单备注
    orderType: params.orderType || 0, // 订单类型 0=普通订单 1=虚拟订单
    payType: params.payType || 1, // 支付类型(0=线上、1=线下)
    totalAmount: params.totalAmount, // 新增字段"totalAmount"总的支付金额
    userName: params.userName, // 用户名
    payWay: 1,
    authorizationCode: '', //loginCode, // 登录凭证
    storeInfoList: params.storeInfoList, //备注信息列表
    couponList: params.couponList,
    groupInfo: params.groupInfo,
  });
};

export const paySuccess = (payOrderInfo) => {
  const { payAmt, tradeNo, groupId, promotionId } = payOrderInfo;
  // 支付成功
  Toast({
    context: this,
    selector: '#t-toast',
    message: '支付成功',
    duration: 2000,
    icon: 'check-circle',
  });

  const params = {
    totalPaid: payAmt,
    orderNo: tradeNo,
  };
  if (groupId) {
    params.groupId = groupId;
  }
  if (promotionId) {
    params.promotionId = promotionId;
  }
  const paramsStr = Object.keys(params)
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  // 跳转支付结果页面
  wx.redirectTo({ url: `/pages/order/pay-result/index?${paramsStr}` });
};

export const payFail = (payOrderInfo, resultMsg) => {
  if (resultMsg === 'requestPayment:fail cancel') {
    if (payOrderInfo.dialogOnCancel) {
      //结算页，取消付款，dialog提示
      Dialog.confirm({
        title: '是否放弃付款',
        content: '商品可能很快就会被抢空哦，是否放弃付款？',
        confirmBtn: '放弃',
        cancelBtn: '继续付款',
      }).then(() => {
        wx.redirectTo({ url: '/pages/order/order-list/index' });
      });
    } else {
      //订单列表页，订单详情页，取消付款，toast提示
      Toast({
        context: this,
        selector: '#t-toast',
        message: '支付取消',
        duration: 2000,
        icon: 'close-circle',
      });
    }
  } else {
    Toast({
      context: this,
      selector: '#t-toast',
      message: `支付失败：${resultMsg}`,
      duration: 2000,
      icon: 'close-circle',
    });
    setTimeout(() => {
      wx.redirectTo({ url: '/pages/order/order-list/index' });
    }, 2000);
  }
};

// 微信支付方式
export const wechatPayOrder = (payOrderInfo) => {
  // const payInfo = JSON.parse(payOrderInfo.payInfo);
  // const { timeStamp, nonceStr, signType, paySign } = payInfo;
  return new Promise((resolve) => {
    // demo 中直接走支付成功
    paySuccess(payOrderInfo);
    resolve();
    /* wx.requestPayment({
      timeStamp,
      nonceStr,
      package: payInfo.package,
      signType,
      paySign,
      success: function () {
        paySuccess(payOrderInfo);
        resolve();
      },
      fail: function (err) {
        payFail(payOrderInfo, err.errMsg);
      },
    }); */
  });
};

Page({
  data: {
    orderDetail: {},

    placeholder: '备注信息',
    stripeImg,
    loading: false,
    settleDetailData: {
      storeGoodsList: [], //正常下单商品列表
      outOfStockGoodsList: [], //库存不足商品
      abnormalDeliveryGoodsList: [], // 不能正常配送商品
      inValidGoodsList: [], // 失效或者库存不足
      limitGoodsList: [], //限购商品
      couponList: [], //门店优惠券信息
    }, // 获取结算页详情 data
    orderCardList: [], // 仅用于商品卡片展示
    couponsShow: false, // 显示优惠券的弹框
    invoiceData: {
      email: '', // 发票发送邮箱
      buyerTaxNo: '', // 税号
      invoiceType: null, // 开票类型  1：增值税专用发票； 2：增值税普通发票； 3：增值税电子发票；4：增值税卷式发票；5：区块链电子发票。
      buyerPhone: '', //手机号
      buyerName: '', //个人或公司名称
      titleType: '', // 发票抬头 1-公司 2-个人
      contentType: '', //发票内容 1-明细 2-类别
    },
    goodsRequestList: [],
    userAddressReq: null,
    popupShow: false, // 不在配送范围 失效 库存不足 商品展示弹框
    notesPosition: 'center',
    storeInfoList: [],
    storeNoteIndex: 0, //当前填写备注门店index
    promotionGoodsList: [], //当前门店商品列表(优惠券)
    couponList: [], //当前门店所选优惠券
    submitCouponList: [], //所有门店所选优惠券
    currentStoreId: null, //当前优惠券storeId
    userAddress: null,
  },

  payLock: false,
  noteInfo: [],
  tempNoteInfo: [],

  onLoad(options) {
    this.setData({
      loading: true,
    });
    this.handleOptionsParams(options);
  },
  onShow() {
    const invoiceData = wx.getStorageSync('invoiceData');
    if (invoiceData) {
      //处理发票
      this.invoiceData = invoiceData;
      this.setData({
        invoiceData,
      });
      wx.removeStorageSync('invoiceData');
    }
  },

  init() {
    this.setData({
      loading: true,
    });
    const { goodsRequestList } = this;
    this.handleOptionsParams({ goodsRequestList });
  },
  // 处理不同情况下跳转到结算页时需要的参数
  handleOptionsParams(options, couponList) {
    if (options.order) {
      const order = JSON.parse(options.order);
      this.setData({
        orderDetail: order,
      });
    }


    let { goodsRequestList = [] } = this; // 商品列表
    let { userAddressReq } = this; // 收货地址

    const storeInfoList = []; // 门店列表
    // 如果是从地址选择页面返回，则使用地址显选择页面新选择的地址去获取结算数据
    if (options.userAddressReq) {
      userAddressReq = options.userAddressReq;
    }
    if (options.type === 'cart') {
      // 从购物车跳转过来时，获取传入的商品列表数据
      const goodsRequestListJson = wx.getStorageSync('order.goodsRequestList');
      goodsRequestList = JSON.parse(goodsRequestListJson);
    } else if (typeof options.goodsRequestList === 'string') {
      goodsRequestList = JSON.parse(options.goodsRequestList);
    }
    //获取结算页请求数据列表
    const storeMap = {};
    goodsRequestList.forEach((goods) => {
      if (!storeMap[goods.storeId]) {
        storeInfoList.push({
          storeId: goods.storeId,
          storeName: goods.storeName,
        });
        storeMap[goods.storeId] = true;
      }
    });
    this.goodsRequestList = goodsRequestList;
    this.storeInfoList = storeInfoList;
    const params = {
      goodsRequestList,
      storeInfoList,
      userAddressReq,
      couponList,
    };
    fetchSettleDetail(params).then(
      (res) => {
        this.setData({
          loading: false,
        });
        this.initData(res.data);
      },
      () => {
        //接口异常处理
        this.handleError();
      },
    );
  },
  initData(resData) {
    // 转换商品卡片显示数据
    const data = this.handleResToGoodsCard(resData);
    this.userAddressReq = resData.userAddress;

    if (resData.userAddress) {
      this.setData({ userAddress: resData.userAddress });
    }
    this.setData({ settleDetailData: data });
    this.isInvalidOrder(data);
  },

  isInvalidOrder(data) {
    // 失效 不在配送范围 限购的商品 提示弹窗
    if (
      (data.limitGoodsList && data.limitGoodsList.length > 0) ||
      (data.abnormalDeliveryGoodsList &&
        data.abnormalDeliveryGoodsList.length > 0) ||
      (data.inValidGoodsList && data.inValidGoodsList.length > 0)
    ) {
      this.setData({ popupShow: true });
      return true;
    }
    this.setData({ popupShow: false });
    if (data.settleType === 0) {
      return true;
    }
    return false;
  },

  handleError() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '结算异常, 请稍后重试',
      duration: 2000,
      icon: '',
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
    this.setData({
      loading: false,
    });
  },
  getRequestGoodsList(storeGoodsList) {
    const filterStoreGoodsList = [];
    storeGoodsList &&
      storeGoodsList.forEach((store) => {
        const { storeName } = store;
        store.skuDetailVos &&
          store.skuDetailVos.forEach((goods) => {
            const data = goods;
            data.storeName = storeName;
            filterStoreGoodsList.push(data);
          });
      });
    return filterStoreGoodsList;
  },
  handleGoodsRequest(goods, isOutStock = false) {
    const {
      reminderStock,
      quantity,
      storeId,
      uid,
      saasId,
      spuId,
      goodsName,
      skuId,
      storeName,
      roomId,
    } = goods;
    const resQuantity = isOutStock ? reminderStock : quantity;
    return {
      quantity: resQuantity,
      storeId,
      uid,
      saasId,
      spuId,
      goodsName,
      skuId,
      storeName,
      roomId,
    };
  },
  handleResToGoodsCard(data) {
    // 转换数据 符合 goods-card展示
    const orderCardList = []; // 订单卡片列表
    const storeInfoList = [];
    const submitCouponList = []; //使用优惠券列表;

    data.storeGoodsList &&
      data.storeGoodsList.forEach((ele) => {
        const orderCard = {
          id: ele.storeId,
          storeName: ele.storeName,
          status: 0,
          statusDesc: '',
          amount: ele.storeTotalPayAmount,
          goodsList: [],
        }; // 订单卡片
        ele.skuDetailVos.forEach((item, index) => {
          orderCard.goodsList.push({
            id: index,
            thumb: item.image,
            title: item.goodsName,
            specs: item.skuSpecLst.map((s) => s.specValue), // 规格列表 string[]
            price: item.tagPrice || item.settlePrice || '0', // 优先取限时活动价
            settlePrice: item.settlePrice,
            titlePrefixTags: item.tagText ? [{ text: item.tagText }] : [],
            num: item.quantity,
            skuId: item.skuId,
            spuId: item.spuId,
            storeId: item.storeId,
          });
        });

        storeInfoList.push({
          storeId: ele.storeId,
          storeName: ele.storeName,
          remark: '',
        });
        submitCouponList.push({
          storeId: ele.storeId,
          couponList: ele.couponList || [],
        });
        this.noteInfo.push('');
        this.tempNoteInfo.push('');
        orderCardList.push(orderCard);
      });

    this.setData({ orderCardList, storeInfoList, submitCouponList });
    return data;
  },
  onGotoAddress() {
    /** 获取一个Promise */
    getAddressPromise()
      .then((address) => {
        this.handleOptionsParams({
          userAddressReq: { ...address, checked: true },
        });
      })
      .catch(() => { });

    const { userAddressReq } = this; // 收货地址

    let id = '';

    if (userAddressReq?.id) {
      id = `&id=${userAddressReq.id}`;
    }

    wx.navigateTo({
      url: `/pages/usercenter/address/list/index?selectMode=1&isOrderSure=1${id}`,
    });
  },
  onNotes(e) {
    const { storenoteindex: storeNoteIndex } = e.currentTarget.dataset;
    // 添加备注信息
    this.setData({
      dialogShow: true,
      storeNoteIndex,
    });
  },
  onInput(e) {
    const { storeNoteIndex } = this.data;
    this.noteInfo[storeNoteIndex] = e.detail.value;
  },
  onBlur() {
    this.setData({
      notesPosition: 'center',
    });
  },
  onFocus() {
    this.setData({
      notesPosition: 'self',
    });
  },
  onTap() {
    this.setData({
      placeholder: '',
    });
  },
  onNoteConfirm() {
    // 备注信息 确认按钮
    const { storeInfoList, storeNoteIndex } = this.data;
    this.tempNoteInfo[storeNoteIndex] = this.noteInfo[storeNoteIndex];
    storeInfoList[storeNoteIndex].remark = this.noteInfo[storeNoteIndex];

    this.setData({
      dialogShow: false,
      storeInfoList,
    });
  },
  onNoteCancel() {
    // 备注信息 取消按钮
    const { storeNoteIndex } = this.data;
    this.noteInfo[storeNoteIndex] = this.tempNoteInfo[storeNoteIndex];
    this.setData({
      dialogShow: false,
    });
  },

  onSureCommit() {
    // 商品库存不足继续结算
    const { settleDetailData } = this.data;
    const { outOfStockGoodsList, storeGoodsList, inValidGoodsList } =
      settleDetailData;
    if (
      (outOfStockGoodsList && outOfStockGoodsList.length > 0) ||
      (inValidGoodsList && storeGoodsList)
    ) {
      // 合并正常商品 和 库存 不足商品继续支付
      // 过滤不必要的参数
      const filterOutGoodsList = [];
      outOfStockGoodsList &&
        outOfStockGoodsList.forEach((outOfStockGoods) => {
          const { storeName } = outOfStockGoods;
          outOfStockGoods.unSettlementGoods.forEach((ele) => {
            const data = ele;
            data.quantity = ele.reminderStock;
            data.storeName = storeName;
            filterOutGoodsList.push(data);
          });
        });
      const filterStoreGoodsList = this.getRequestGoodsList(storeGoodsList);
      const goodsRequestList = filterOutGoodsList.concat(filterStoreGoodsList);
      this.handleOptionsParams({ goodsRequestList });
    }
  },
  // 提交订单
  submitOrder() {
    const {
      settleDetailData,
      userAddressReq,
      invoiceData,
      storeInfoList,
      submitCouponList,
    } = this.data;
    const { goodsRequestList } = this;

    if (!userAddressReq && !settleDetailData.userAddress) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请添加收货地址',
        duration: 2000,
        icon: 'help-circle',
      });

      return;
    }
    if (
      this.payLock ||
      !settleDetailData.settleType ||
      !settleDetailData.totalAmount
    ) {
      return;
    }
    this.payLock = true;
    const resSubmitCouponList = this.handleCouponList(submitCouponList);
    const params = {
      userAddressReq: settleDetailData.userAddress || userAddressReq,
      goodsRequestList: goodsRequestList,
      userName: settleDetailData.userAddress.name || userAddressReq.name,
      totalAmount: settleDetailData.totalPayAmount, //取优惠后的结算金额
      invoiceRequest: null,
      storeInfoList,
      couponList: resSubmitCouponList,
    };
    if (invoiceData && invoiceData.email) {
      params.invoiceRequest = invoiceData;
    }
    commitPay(params).then(
      (res) => {
        this.payLock = false;
        const { data } = res;
        // 提交出现 失效 不在配送范围 限购的商品 提示弹窗
        if (this.isInvalidOrder(data)) {
          return;
        }
        if (res.code === 'Success') {
          this.handlePay(data, settleDetailData);
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.msg || '提交订单超时，请稍后重试',
            duration: 2000,
            icon: '',
          });
          setTimeout(() => {
            // 提交支付失败   返回购物车
            wx.navigateBack();
          }, 2000);
        }
      },
      (err) => {
        this.payLock = false;
        if (
          err.code === 'CONTAINS_INSUFFICIENT_GOODS' ||
          err.code === 'TOTAL_AMOUNT_DIFFERENT'
        ) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: err.msg || '支付异常',
            duration: 2000,
            icon: '',
          });
          this.init();
        } else if (err.code === 'ORDER_PAY_FAIL') {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '支付失败',
            duration: 2000,
            icon: 'close-circle',
          });
          setTimeout(() => {
            wx.redirectTo({ url: '/order/list' });
          });
        } else if (err.code === 'ILLEGAL_CONFIG_PARAM') {
          Toast({
            context: this,
            selector: '#t-toast',
            message:
              '支付失败，微信支付商户号设置有误，请商家重新检查支付设置。',
            duration: 2000,
            icon: 'close-circle',
          });
          setTimeout(() => {
            wx.redirectTo({ url: '/order/list' });
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: err.msg || '提交支付超时，请稍后重试',
            duration: 2000,
            icon: '',
          });
          setTimeout(() => {
            // 提交支付失败  返回购物车
            wx.navigateBack();
          }, 2000);
        }
      },
    );
  },

  // 处理支付
  handlePay(data, settleDetailData) {
    const { channel, payInfo, tradeNo, interactId, transactionId } = data;
    const { totalAmount, totalPayAmount } = settleDetailData;
    const payOrderInfo = {
      payInfo: payInfo,
      orderId: tradeNo,
      orderAmt: totalAmount,
      payAmt: totalPayAmount,
      interactId: interactId,
      tradeNo: tradeNo,
      transactionId: transactionId,
    };

    if (channel === 'wechat') {
      wechatPayOrder(payOrderInfo);
    }
  },

  hide() {
    // 隐藏 popup
    this.setData({
      'settleDetailData.abnormalDeliveryGoodsList': [],
    });
  },
  onReceipt() {
    // 跳转 开发票
    const invoiceData = this.invoiceData || {};
    wx.navigateTo({
      url: `/pages/order/receipt/index?invoiceData=${JSON.stringify(
        invoiceData,
      )}`,
    });
  },

  onCoupons(e) {
    const { submitCouponList, currentStoreId } = this.data;
    const { goodsRequestList } = this;
    const { selectedList } = e.detail;
    const tempSubmitCouponList = submitCouponList.map((storeCoupon) => {
      return {
        couponList:
          storeCoupon.storeId === currentStoreId
            ? selectedList
            : storeCoupon.couponList,
      };
    });
    const resSubmitCouponList = this.handleCouponList(tempSubmitCouponList);
    //确定选择优惠券
    this.handleOptionsParams({ goodsRequestList }, resSubmitCouponList);
    this.setData({ couponsShow: false });
  },
  onOpenCoupons(e) {
    const { storeid } = e.currentTarget.dataset;
    this.setData({
      couponsShow: true,
      currentStoreId: storeid,
    });
  },

  handleCouponList(storeCouponList) {
    //处理门店优惠券   转换成接口需要
    if (!storeCouponList) return [];
    const resSubmitCouponList = [];
    storeCouponList.forEach((ele) => {
      resSubmitCouponList.push(...ele.couponList);
    });
    return resSubmitCouponList;
  },

  onGoodsNumChange(e) {
    const {
      detail: { value },
      currentTarget: {
        dataset: { goods },
      },
    } = e;
    const index = this.goodsRequestList.findIndex(
      ({ storeId, spuId, skuId }) =>
        goods.storeId === storeId &&
        goods.spuId === spuId &&
        goods.skuId === skuId,
    );
    if (index >= 0) {
      // eslint-disable-next-line no-confusing-arrow
      const goodsRequestList = this.goodsRequestList.map((item, i) =>
        i === index ? { ...item, quantity: value } : item,
      );
      this.handleOptionsParams({ goodsRequestList });
    }
  },

  onPopupChange() {
    this.setData({
      popupShow: !this.data.popupShow,
    });
  },
});
