const { getVeriCodeFromCache } = require('../../cache/users/veriCode')
const {
    loginVeriCodeIncorrectFailInfo,
    createUserDbErrorFailInfo,
    userFrozenFailInfo,
} = require('../../res-model/failInfo/index')

const { ErrorRes, SuccessRes } = require('../../res-model/index')

const {
    findOneUserService,
    createUserService,
    updateUserInfoService,
} = require('../../service/users')

const doCrypto = require('../../utils/cryp')
const genPassword = require('../../utils/genPassword')
const { jwtSign } = require('../../utils/jwt')

async function loginByPhoneNumber(phoneNumber, veriCode) {
    const veriCodeFromCache = await getVeriCodeFromCache(phoneNumber)

    if (veriCode !== veriCodeFromCache) {
        // 验证码不正确
        return new ErrorRes(loginVeriCodeIncorrectFailInfo)
    }

    // 先查找，找到的就返回
    const userInfo = await findOneUserService({
        phoneNumber,
    })

    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo)

        // 更新最后登录时间
        try {
            await updateUserInfoService(userInfo.username, {
                latestLoginAt: new Date(),
            })
        } catch (ex) {
            console.error('更新最后登录时间错误', ex) // 只记录错误，不是主要错误，不影响登录逻辑
        }

        // 返回登录成功信息
        return new SuccessRes({
            token: jwtSign(userInfo),
        })
    }

    // 查找不到，再创建
    try {
        const newUser = await createUserService({
            // 要符合 UserModel 的属性规定

            username: phoneNumber, // 用手机号
            // 手机号注册，生成随机的密码&& 加密密码
            password: doCrypto(genPassword()),
            phoneNumber,
            nickName: `owner-${phoneNumber.slice(-4)}`, // 默认给一个昵称
            latestLoginAt: new Date(),
        })
        // 创建成功
        return new SuccessRes({
            token: jwtSign(newUser),
        })
    } catch (ex) {
        console.error('创建用户失败', ex)
        return new ErrorRes(createUserDbErrorFailInfo)
    }
}

async function loginByUsername(username, password) {
    // 先查找，找到的就返回
    const userInfo = await findOneUserService({
        username,
        password: doCrypto(password),
    })

    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo)

        // 更新最后登录时间
        try {
            await updateUserInfoService(userInfo.username, {
                latestLoginAt: new Date(),
            })
        } catch (ex) {
            console.error('更新最后登录时间错误', ex) // 只记录错误，不是主要错误，不影响登录逻辑
        }

        // 返回登录成功信息
        return new SuccessRes({
            token: jwtSign(userInfo),
        })
    }

    // 查找不到，再创建
    try {
        const newUser = await createUserService({
            // 要符合 UserModel 的属性规定
            username,
            // 手机号注册，生成随机的密码&& 加密密码
            password: doCrypto(password),
            nickName: `owner-${username.slice(-4)}`, // 默认给一个昵称
            latestLoginAt: new Date(),
        })
        // 创建成功
        return new SuccessRes({
            token: jwtSign(newUser),
        })
    } catch (ex) {
        console.error('创建用户失败', ex)
        return new ErrorRes(createUserDbErrorFailInfo)
    }
}

module.exports = { loginByPhoneNumber, loginByUsername }
