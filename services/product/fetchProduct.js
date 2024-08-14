import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchProduct(pid = 0) {
  const { delay } = require('../_utils/delay');
  const { genProduct } = require('../../model/product');
  return delay().then(() => genProduct(pid));
}

/** 获取商品列表 */
export function fetchProduct(pid = 0) {
  if (config.useMock) {
    return mockFetchProduct(pid);
  }
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/products/${pid}`,
      method: 'GET',
      data: {},
      success: (res) => {
        config.log && console.log('fetchProduct', res.data)
        resolve(res.data);
      }
    })
  });
}
