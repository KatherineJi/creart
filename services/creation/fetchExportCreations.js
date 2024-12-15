import { config } from '../../config/index';
import request from '../_utils/request';

/** 获取模板列表 */
function mockFetchExportCreations(params) {
  const { delay } = require('../_utils/delay');
  const { getCreationList } = require('../../model/creations');
  return delay().then(() => {
    return {
      img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/print.png?sign=8269c9674787593189bf7fa5f55b3b8c&t=1732598595',
    }
  });
}

/** 获取模板列表 */
export function fetchExportCreations(params) {
  if (config.useMock) {
    return mockFetchExportCreations(params);
  }

  return request({
    url: `https://${config.host}/users/creations/export`,
    method: 'POST',
    data: params,
    success: (resolve, res) => {
      config.log && console.log('fetchExportCreations', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchExportCreations err', err)
      reject(err);
    }
  });
}
