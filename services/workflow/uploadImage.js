import { config } from '../../config/index';
import request, { uploadRequest } from '../_utils/request';

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

  return uploadRequest({
    url: `https://${config.host}/users/file`,
    fileName: file.name,
    filePath: file.url,
    success: (resolve, res) => {
      // res.fileList[0].tempFileURL;
      console.log('res', res);
      let data = res.file_name;
      // data = JSON.parse(data)
      console.log('data', data);
      resolve(data);
    },
    fail: (reject, err) => {
      console.log('err', err);
      reject(err);
    }
  });
  return new Promise((resolve) => {
    wx.uploadFile({
      url: `https://${config.host}/users/file`,
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
