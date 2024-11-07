// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require("request-promise")

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (data, context) => {
  // const wxContext = cloud.getWXContext()
  console.log('request from yun', 'remote-api', data)
  const {
    url,
    method,
    data: requestData,
  } = data;

  const config = {
    method,
    uri: url,
    json: true
  };

  if (method === 'GET') {
    config.qs = requestData || {}
  } else if (method === 'POST') {
    config.body = requestData || {}
  }

  const res = await rp(config)
  return res
}
