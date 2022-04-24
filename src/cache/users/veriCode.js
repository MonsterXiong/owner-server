const { cacheSet, cacheGet } = require('../index')

// cache key 前缀，重要！！否则数据容易混乱
const PREFIX = 'phoneVeriCode-'

/**
 * 缓存验证码
 * @param {string} phoneNumber 手机号
 * @param {string} veriCode 验证码
 * @param {number} timeout timeout 单位 s
 */
async function setVeriCodeToCache(phoneNumber, veriCode, timeout) {
    const key = `${PREFIX}${phoneNumber}`
    cacheSet(key, veriCode, timeout)
}

/**
 * 从缓存中获取验证码
 * @param {string} phoneNumber 手机号
 */
async function getVeriCodeFromCache(phoneNumber) {
    const key = `${PREFIX}${phoneNumber}`
    const code = await cacheGet(key)
    if (code == null) return code
    return code.toString() // cacheGet 方法中有 JSON.parse
}

module.exports = {
    getVeriCodeFromCache,
    setVeriCodeToCache,
}
