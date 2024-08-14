import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchSkus(pid = 0) {
  const { delay } = require('../_utils/delay');
  const { getSkus } = require('../../model/skus');
  return delay().then(() =>
    getSkus().map((item) => {
      return {
        ...item,
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchSkus(pid = 0) {
  if (config.useMock) {
    return mockFetchSkus(pid);
  }
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/products/${pid}/skus`,
      method: 'GET',
      data: {},
      success: (res) => {
        config.log && console.log('fetchSkus', res.data)
        resolve(res.data);
      }
    })
  });
}
