const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'owner-server',
}

// redis 连接配置
const redisConfig = {
  port: '6379',
  host: 'localhost',
}

// mongodb 连接配置
const mongodbConfig = {
  host: 'localhost',
  port: '27017',
  dbName: 'owner-server',
}

// jwt 过期时间
// 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
const jwtExpiresIn = '1d'

module.exports = {
  mysqlConfig,
  redisConfig,
  mongodbConfig,
  jwtExpiresIn,
}
