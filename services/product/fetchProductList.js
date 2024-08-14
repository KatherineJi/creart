import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchProductList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getProductList } = require('../../model/products');
  return delay().then(() =>
    getProductList(pageIndex, pageSize).map((item) => {
      return {
        ...item,
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchProductList(pageIndex = 1, pageSize = 19) {
  if (config.useMock) {
    return mockFetchProductList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/products`,
      method: 'GET',
      data: {},
      success: (res) => {
        config.log && console.log('fetchProductList', res.data)
        resolve(res.data);
      }
    })
  });
}
