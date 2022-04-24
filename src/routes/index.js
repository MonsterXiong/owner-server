const router = require("koa-router")();
const testMysql = require("../db/mysql");
const { cacheSet, cacheGet } = require("../cache/index");
const { UserModel } = require("../models/UserModel");
router.get("/", async (ctx, next) => {
  ctx.body = "测试好了吗";
});

router.get("/api/dbcheck", async (ctx) => {
  const mysqlRes = await testMysql();

  let mongodbConn;
  try {
    mongodbConn = true;
    await UserModel.findOne();
  } catch (ex) {
    mongodbConn = false;
  }

  // 测试 redis 连接
  cacheSet("name", "sever OK - by redis");
  const redisTestVal = await cacheGet("name");

  ctx.body = {
    code: 0,
    data: {
      name: "test mysql",
      mysqlConn: mysqlRes.length > 0,
      redisConn: redisTestVal != null,
      mongodbConn,
    },
  };
});

module.exports = router;
