const router = require("koa-router")();
const testMysql = require("../db/mysql");
const { cacheSet, cacheGet } = require("../cache/index");
const { UserModel } = require("../models/UserModel");
router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
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
