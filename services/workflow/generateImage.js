import { config } from '../../config/index';
import request from '../_utils/request';

/** 获取模板列表 */
function mockGenerateImage(params = {}) {
  const { delay } = require('../_utils/delay');
  return delay().then(() => {
    return {
      task_id: 'taskid_001',
      message: 'task create success',
    };
  });
}

/** 获取模板列表 */
export function generateImage({ template_id, params }) {
  if (config.useMock) {
    return mockGenerateImage(params);
  }

  return request({
    url: `https://${config.host}/render/generate/${template_id}`,
    method: 'POST',
    data: params,
    success: (resolve, res) => {
      config.log && console.log('generateImage', res)
      resolve(res);
    },
    fail: (reject, err) => {
      config.log && console.log('generateImage err', err)
      reject(err);
    }
  });
}
