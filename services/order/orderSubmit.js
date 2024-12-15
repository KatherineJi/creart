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
export function fetchOrderSubmit(params) {
  if (config.useMock) {
    return mockFetchProductList();
  }
  return request({
    url: `https://${config.host}/ecc/order`,
    method: 'POST',
    data: params,
    success: (resolve, res) => {
      config.log && console.log('fetchOrderSubmit', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchOrderSubmit err', err)
      reject(err);
    }
  });
}
