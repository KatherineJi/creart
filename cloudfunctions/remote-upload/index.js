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
    fileName,
    fileID,
  } = data;

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
      file: {
        value: fileRes.fileContent,
        options: {
          filename: fileName,
          // contentType: 'image/jpg'
        }
      }
    },
  };

  const res = await rp(config)

  return res
}