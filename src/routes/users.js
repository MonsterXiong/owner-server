const router = require('koa-router')()

const sendVeriCode = require('../controller/users/sendVeriCode')
const { loginByPhoneNumber, loginByUsername } = require('../controller/users/loginByPhoneNumber')
const updateUserInfo = require('../controller/users/updateUserInfo')

const genValidator = require('../middlewares/genValidator')
const loginCheck = require('../middlewares/loginCheck')

const { SuccessRes } = require('../res-model/index')

const {
  phoneNumberSchema,
  phoneNumberVeriCodeSchema,
  userInfoSchema,
} = require('../validator/users')

router.prefix('/api/users')

router.post('/genVeriCode', genValidator(phoneNumberSchema), async ctx => {
  const { phoneNumber, isRemoteTest } = ctx.request.body

  // 尝试发送验证码
  const res = await sendVeriCode(phoneNumber, isRemoteTest)
  ctx.body = res
})

// 使用手机号登录
router.post('/loginByPhoneNumber', genValidator(phoneNumberVeriCodeSchema), async ctx => {
  const { phoneNumber, veriCode } = ctx.request.body
  const res = await loginByPhoneNumber(phoneNumber, veriCode)
  ctx.body = res
})
// 使用用户名登录
router.post('/loginByUsername', async ctx => {
  const { username, password } = ctx.request.body
  const res = await loginByUsername(username, password)
  ctx.body = res
})

// 获取用户信息
router.get('/getUserInfo', loginCheck, async ctx => {
  // 经过了 loginCheck ，用户信息在 ctx.userInfo 中
  ctx.body = new SuccessRes(ctx.userInfo)
})

// 修改用户信息
router.patch('/updateUserInfo', loginCheck, genValidator(userInfoSchema), async ctx => {
  // 经过了 loginCheck ，用户信息在 ctx.userInfo 中
  const res = await updateUserInfo(ctx.userInfo, ctx.request.body)
  ctx.body = res
})

module.exports = router
