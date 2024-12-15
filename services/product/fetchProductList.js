import { config } from '../../config/index';
import request from '../_utils/request';

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
export function fetchProductList(pageIndex = 1, pageSize = 5) {
  if (config.useMock) {
    return mockFetchProductList(pageIndex, pageSize);
  }
  return request({
    url: `https://${config.host}/ecc/products`,
    method: 'GET',
    data: {},
    success: (resolve, res) => {
      config.log && console.log('fetchProductList', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchProductList err', err)
      reject(err);
    }
  });
}
