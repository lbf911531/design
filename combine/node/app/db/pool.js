// 生成连接池对象
const mysql = require('mysql');
let pool = mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'root',
	database:'test'
});
// console.log('--1111----');
// global.pool = pool;
module.exports = pool;





