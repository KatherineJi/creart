import { config } from '../../config/index';

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
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/design/templates/${tid}`,
      method: 'GET',
      data: {},
      success: (res) => {
        config.log && console.log('fetchTemplate', res.data)
        resolve(res.data);
      }
    })
  });
}
