import { config } from '../../config/index';
import request from '../_utils/request';

/** 获取模板列表 */
function mockFetchTemplate(tid = 0) {
  const { delay } = require('../_utils/delay');
  const { genTemplate } = require('../../model/template');
  return delay().then(() => genTemplate(tid));
}

/** 获取模板列表 */
export function fetchTemplate(tid = 0) {
  if (config.useMock) {
    return mockFetchTemplate(tid);
  }

  return request({
    url: `http://${config.host}/design/templates/${tid}`,
    method: 'GET',
    data: {},
    success: (resolve, res) => {
      config.log && console.log('fetchTemplate', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchTemplate err', err)
      reject(err);
    }
  });
}
