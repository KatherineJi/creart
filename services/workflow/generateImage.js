import { config } from '../../config/index';

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
  return new Promise((resolve) => {
    wx.request({
      url: `http://${config.host}/render/generate/${template_id}`,
      method: 'POST',
      data: params,
      success: (res) => {
        config.log && console.log('generateImage', res.data)
        resolve(res.data);
      }
    })
  });
}
