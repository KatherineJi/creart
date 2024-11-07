import { config } from '../../config/index';

export default function request({
  url,
  method,
  data,
  success,
  fail,
}) {
  return new Promise((resolve, reject) => {
    if (config.useCloudRemote) {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'remote-api',
        // 传给云函数的参数
        data: {
          url,
          method,
          data,
        },
      }).then(res => success(resolve, res.result)).catch(err => fail(reject, err))
      // .then(res => console.log(res)).catch(err => console.log(err))
    } else {
      wx.request({
        url,
        method,
        data,
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
    if (config.useCloudRemote) {
      const cloudPath = `uploads/${Date.now()}-${fileName}`;
      console.log('cloudPath', cloudPath);
      wx.cloud.uploadFile({
        cloudPath: cloudPath, // `uploads/${Date.now()}-${filePath}`,
        filePath: filePath,
      }).then(res => {
        // get resource ID
        console.log(res);

        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // get temp file URL
            console.log(res)
            success(resolve, res)
          },
          fail: err => {
            // handle error
            fail(reject, err)
          }
        })


        // wx.cloud.callFunction({
        //   // 云函数名称
        //   name: 'remote-upload',
        //   // 传给云函数的参数
        //   data: {
        //     url,
        //     method: 'POST',
        //     // cloudPath: cloudPath,
        //     fileID: res.fileID,
        //   },
        // }).then(uploadRes => {
        //   console.log('uploadRes', uploadRes)
        //   // TODO
        //   success(resolve, uploadRes)
        // }).catch(error => {
        //   // handle error
        //   fail(reject, error)
        // })
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