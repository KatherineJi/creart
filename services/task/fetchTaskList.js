import { config } from '../../config/index';
import request from '../_utils/request';

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

  return request({
    url: `http://${config.host}/users/tasks/`,
    method: 'GET',
    data: {},
    success: (resolve, res) => {
      config.log && console.log('fetchTaskList', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('fetchTaskList err', err)
      reject(err);
    }
  });
}
