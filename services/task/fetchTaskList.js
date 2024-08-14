import { config } from '../../config/index';

/** 获取模板列表 */
function mockFetchTaskList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getTaskList } = require('../../model/tasks');
  return delay().then(() =>
    getTaskList(pageIndex, pageSize).map((item) => {
      return {
        ...item,
      };
    }),
  );
}

/** 获取模板列表 */
export function fetchTaskList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchTaskList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/users/tasks/`,
      method: 'GET',
      data: {},
      success: (res) => {
        config.log && console.log('fetchTaskList', res.data)
        resolve(res.data);
      }
    })
  });
}
