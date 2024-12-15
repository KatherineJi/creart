import { config } from '../../config/index';
import request from '../_utils/request';

/** 获取模板列表 */
function mockFetchCreationList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getCreationList } = require('../../model/creations');
  return delay().then(() =>
    getCreationList(pageIndex, pageSize).map((item) => {
      return {
        ...item,
      };
    }),
  );
}

/** 获取模板列表 */
export function fetchCreationList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchCreationList(pageIndex, pageSize);
  }

  return request({
    url: `https://${config.host}/users/creations`,
    method: 'GET',
    data: {},
    success: (resolve, res) => {
      config.log && console.log('fetchCreationList', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchCreationList err', err)
      reject(err);
    }
  });
}
