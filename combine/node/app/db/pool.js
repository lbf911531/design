// 生成连接池对象
const mysql = require("mysql");
let pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root",
  database: "test"
});

pool.connectionLimit = 10; // 连接池中可以存放的最大连接数量
pool.waitForConnections = true; // 连接使用量超负荷是否等待, false 会报错
pool.queueLimit = 0; // 每个连接可操作的 列数 上限, 0 为没有上限

module.exports = pool;
