// user数据库表的访问
// 获取连接池对象，获取连接对象，执行sql语句
// global.pool

let pool = require('./pool');
let login = (params,handle) => {
	pool.getConnection((err,conn) => {
		if(!err) {
			let sql = 'select * from user_table where user=? and password=?';
			conn.query(sql,[params.user,params.password],function(err,results) {
				handle(err,results);
			});
			conn.release();
		}
	})
}
let findAllUser = (handle)=>{
	// 查找所有的user数据
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'select * from user_table';
			conn.query(sql,[],function(err,results){
				if(!err){
					console.log(results);
					handle(err,results);
				}
			});
			conn.release();
		}	
	})
};
let findUserById = (id,handle)=>{
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'select * from tbl where id=?';
			// sql注入
			conn.query(sql,[id],function(err,results){
				if(!err){
					// console.log(result);
					handle(results);
				}
			});
			conn.release();
		}
	});
};
let deleteUserById = (id,handle)=>{
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'delete from tbl where id=?';
			// sql注入
			conn.query(sql,[id],function(err,results){
				// if(!err){
					// console.log(result);
					handle(err,results);
				// }
			});
			conn.release();
		}
	});
};
let saveUser = (obj,handle)=>{
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'Insert into tbl(name,age) value(?,?,?)';
			// sql注入
			conn.query(sql,[obj.name,obj.age],function(err,results){
				// if(!err){
					// console.log(result);
					handle(err,results);
				// }
			});
			conn.release();
		}
	});
};
let updateUserById = (obj,handle)=>{
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'update tbl set name=?,age=? where id=?';
			// sql注入
			conn.query(sql,[obj.name,obj.age,obj.id],function(err,results){
				// if(!err){
					// console.log(result);
					handle(err,results);
				// }
			});
			conn.release();
		}
	});
};
module.exports = {
	login,
	findAllUser,
	findUserById,
	deleteUserById,
	saveUser,
	updateUserById
};







