/**
 * @description res 错误信息配置
 */

const usersInfos = require('./users')
const validateInfos = require('./validate')

module.exports = {
    ...usersInfos,
    ...validateInfos,
}
