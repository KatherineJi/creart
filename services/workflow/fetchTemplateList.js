import { config } from '../../config/index';

/** 获取模板列表 */
function mockFetchTemplateList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getTemplateList } = require('../../model/templates');
  return delay().then(() =>
    getTemplateList(pageIndex, pageSize).map((item) => {
      return {
        ...item,
      };
    }),
  );
}

/** 获取模板列表 */
export function fetchTemplateList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchTemplateList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/design/templates/`,
      method: 'GET',
      data: {},
      success: (res) => {
        config.log && console.log('fetchTemplateList', res.data)
        resolve(res.data.map((item) => ({
          ...item,
          id: item._id,
        })));
      }
    })
  });
}
