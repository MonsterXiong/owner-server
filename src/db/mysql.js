/**
 * mysql连接测试函数
 * src/db/mysql.js
 */
const mysql = require("mysql2/promise");

const { mysqlConfig } = require("../config/index");

async function testMysql() {
  const conn = await mysql.createConnection(mysqlConfig);
  const [rows] = await conn.execute("select now()");
  return rows;
}

module.exports = testMysql;
