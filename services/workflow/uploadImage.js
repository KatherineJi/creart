import { config } from '../../config/index';

/** 获取模板列表 */
function mockUploadImage(file = {}) {
  const { delay } = require('../_utils/delay');
  return delay().then(() => {
    return {
      path: `/${file.name}`,
    };
  });
}

/** 获取模板列表 */
export function uploadImage(file = {}) {
  if (config.useMock) {
    return mockUploadImage(file);
  }
  return new Promise((resolve) => {
    wx.uploadFile({
      url: `http://${config.host}/users/file`,
      filePath: file.url,
      name: 'file',
      formData: {},
      success(res) {
        let data = res.data;
        data = JSON.parse(data)
        console.log('data', data, data.file_name);
        resolve(data);
      }
    });
  });
}
