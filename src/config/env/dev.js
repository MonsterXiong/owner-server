const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "owner-server",
};

// redis 连接配置
const redisConfig = {
  port: "6379",
  host: "localhost",
};

// mongodb 连接配置
const mongodbConfig = {
  host: "localhost",
  port: "27017",
  dbName: "owner-server",
};

module.exports = {
  mysqlConfig,
  redisConfig,
  mongodbConfig,
};
