import { config } from '../../config/index';
import request from '../_utils/request';

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

  return request({
    url: `https://${config.host}/ecc/products/${pid}`,
    method: 'GET',
    data: {},
    success: (resolve, res) => {
      config.log && console.log('fetchProduct', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchProduct err', err)
      reject(err);
    }
  });
}
