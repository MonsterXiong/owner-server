/**
 * @description 封装 mongoose ，连接 mongodb
 * src/db/mongoose.js
 */

const mongoose = require('mongoose')
const { mongodbConfig } = require('../config/index')

const { host, port, dbName, user, password } = mongodbConfig

// 拼接连接字符串
const url = `mongodb://${host}:${port}` // dev 环境
// if (user && password) {
//   url = `mongodb://${user}:${password}@${host}:${port}`; // prd 环境
// }

// 升级存在问题https://blog.csdn.net/qq_42760049/article/details/98593923
// mongoose.set("useCreateIndex", true);
// mongoose.set("useFindAndModify", false);

// 开始连接（ 使用用户名和密码时，需要 `?authSource=admin` ）
mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// 连接对象
const db = mongoose.connection

db.on('error', err => {
    console.error('mongoose connect error', err)
})

// 执行node src/db/mongoose即可测试
// db.once("open", () => {
//   // 用以测试数据库连接是否成功
//   console.log("mongoose connect success");
// });

module.exports = mongoose
