// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require("request-promise")
const fs = require('fs');
const path = require('path')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (data, context) => {
  console.log('request from yun', 'remote-upload', data)
  const {
    url,
    method,
    fileID,
    // data: requestData,
  } = data;

  const fileStream = fs.createReadStream(path.join(__dirname, fileID))
  const fileRes = await cloud.downloadFile({
    fileID: fileID,
  })
  const result = await cloud.getTempFileURL({
    fileList: [fileID],
  })

  console.log('fileRes', fileRes)

  const config = {
    method: 'POST',
    uri: url,
    json: true,
    formData: {
      file_name: result.fileList[0]
      // fileRes.tempFilePath,

      // fileID, // fs.createReadStream(fileID),   // 这里是关键
      // 其他需要的字段值，比如 x y w h
    },
  };

  // if (method === 'GET') {
  //   config.qs = requestData || {}
  // } else if (method === 'POST') {
  //   config.body = requestData || {}
  // }

  const res = await rp(config)

  return res
}