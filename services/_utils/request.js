import { config } from '../../config/index';

export default function request({
  url,
  method,
  data,
  success,
  fail,
}) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Authorization': `Bearer ${wx.getStorageSync('accessToken')}`,
    };

    // 如果服务端 host 在本地，直接绕过下面的 useCloudRemote 判断
    // 用原生 request 调用本地接口
    // 否则每次都要开关 useCloudRemote
    if (config.host === "127.0.0.1:8000") {
      wx.request({
        url,
        method,
        data,
        header: headers,
        success: res => success(resolve, res.data),
        fail: err => fail(reject, err),
      })
    }

    if (config.useCloudRemote) {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'remote-api',
        // 传给云函数的参数
        data: {
          url,
          method,
          data,
          headers,
        },
      }).then(res => success(resolve, res.result)).catch(err => fail(reject, err))
      // .then(res => console.log(res)).catch(err => console.log(err))
    } else {
      wx.request({
        url,
        method,
        data,
        header: headers,
        success: res => success(resolve, res.data),
        fail: err => fail(reject, err),
      })
    }
  });
}

export function uploadRequest({
  url,
  fileName,
  filePath,
  success,
  fail,
}) {
  return new Promise((resolve, reject) => {
    if (config.host === "127.0.0.1:8000") {
      wx.uploadFile({
        url,
        filePath,
        name: 'file',
        formData: {},
        success(res) {
          let data = res.data;
          data = JSON.parse(data)
          console.log('data', data, data.file_name);
          resolve(data);
        }
      });
    }

    if (config.useCloudRemote) {
      const cloudPath = `uploads/${Date.now()}-${fileName}`;
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath,
      }).then(res => {
        // get resource ID
        console.log('uploadFile res', res);

        wx.cloud.callFunction({
          // 云函数名称
          name: 'remote-upload',
          // 传给云函数的参数
          data: {
            url,
            method: 'POST',
            // cloudPath: cloudPath,
            fileName,
            filePath,
            fileID: res.fileID,
          },
        }).then(uploadRes => {
          console.log('uploadRes', uploadRes)
          // TODO
          success(resolve, uploadRes.result)
        }).catch(error => {
          // handle error
          fail(reject, error)
        })
      }).catch(err => {
        // handle error
        fail(reject, err)
      })
    } else {
      wx.uploadFile({
        url,
        filePath,
        name: 'file',
        formData: {},
        success(res) {
          let data = res.data;
          data = JSON.parse(data)
          console.log('data', data, data.file_name);
          resolve(data);
        }
      });
    }
  });
}