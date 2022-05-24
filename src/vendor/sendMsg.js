const Core = require('@alicloud/pop-core')

const client = new Core({
  accessKeyId: 'LTAI5tHYLrXJWu9Vm3m3EmWb',
  accessKeySecret: 'aTCH2o2DjQoJaYR7250ihyACl1chOW',
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
})

const params = {
  SignName: '阿里云短信测试',
  TemplateCode: 'SMS_154950909',
  // PhoneNumbers: '15973892160',
  // TemplateParam: '{"code":"1234"}',
}

const requestOption = {
  method: 'POST',
  formatParams: false,
}

/**
 * 发送短信验证码
 * @param {string} phoneNumber 手机号
 * @param {string} code 验证码
 * @param {string} timeout 过期时间，分钟
 */
async function sendVeriCodeMsg(phoneNumber, code, timeout = '') {
  if (!phoneNumber || !code) return Promise.reject(new Error('手机号或验证码为空'))
  params.PhoneNumbers = phoneNumber
  params.TemplateParam = JSON.stringify({ code })

  return new Promise((resolve, reject) => {
    client.request('SendSms', params, requestOption).then(
      res => {
        resolve(JSON.stringify(res))
      },
      err => {
        reject(err)
      }
    )
  })
}

module.exports = {
  sendVeriCodeMsg,
}
