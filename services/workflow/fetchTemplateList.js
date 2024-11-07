import { config } from '../../config/index';
import request from '../_utils/request';

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

  return request({
    url: `http://${config.host}/design/templates/`,
    method: 'GET',
    data: {},
    success: (resolve, res) => {
      config.log && console.log('fetchTemplateList', res)
      // resolve(res);
      resolve(res.map((item) => ({
        ...item,
        id: item._id,
      })));
    },
    fail: (reject, err) => {
      config.log && console.log('fetchTemplateList err', err)
      reject(err);
    }
  });
}
