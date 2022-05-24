const path = require('path')
const { sendVeriCodeMsg } = require('../src/vendor/sendMsg')

describe('第三方 API', () => {
  test('发短信验证码', async () => {
    const phoneNumber = `15973892160` // 注意，要把这个手机号加入到频率限制白名单里，否则 1h 之内发送的短信数量会被限制
    const res = await sendVeriCodeMsg(phoneNumber, '0000')
    expect(JSON.parse(res).Code).toBe('OK')
  })

  // test('上传文件到阿里云 OSS', async () => {
  //     const fileName = 'a.jpeg'
  //     const filePath = path.resolve(__dirname, 'files', 'a.jpeg')

  //     const url = await uploadOSS(fileName, filePath)
  //     expect(url).not.toBeNull()
  //     expect(url.lastIndexOf(fileName)).toBeGreaterThan(0)
  // })
})
