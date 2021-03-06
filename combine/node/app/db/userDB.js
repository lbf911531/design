// user数据库表的访问
// 获取连接池对象，获取连接对象，执行sql语句
// global.pool

const pool = require('./pool');

const login = (params,handle) => {
	pool.getConnection((err,conn) => {
		if(!err) {
			let sql = 'select id,name,gender,permission,user,phone,portraitUrl,lastLoginTime from user_table where user=? and password=?';
			conn.query(sql,[params.user,params.password],function(err,results) {
				handle(err,results);
			});
			conn.release();
		}
	})
}

const findAllUser = (handle)=>{
	// 查找所有的user数据
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'select id,name,gender,permission,user,phone,portraitUrl from user_table';
			conn.query(sql,[],function(err,results){
				handle(err,results);
			});
			conn.release();
		}	
	})
};

/**
 * 分配管理员权限与取消权限
 * @param {*} params 
 * @param {*} handle 
 */
const batchAssignPermission = (params,handle) => {
	pool.getConnection((err, conn) => {
		if(!err) {
			const sql = "update user_table set permission = ? where id in (?)";
			conn.query(sql,[params.permission,params.ids],(error, results) => {
				handle(error, results);
			});
			conn.release();
		}
	})
} 

/**
 * 注册
 * @param {*} obj 
 * @param {*} handle 
 */
const saveUser = (obj,handle)=>{
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'Insert into user_table(name,user,gender,phone,password,permission,portraitUrl) value(?,?,?,?,?,?,?)';
			// sql注入
			conn.query(sql,[obj.name,obj.user,obj.gender,obj.phone,obj.password,obj.permission,obj.portraitUrl],function(err,results){
				handle(err,results);
			});
			conn.release();
		}
	});
};

/**
 * 修改密码
 * @param {*} obj 
 * @param {*} handle 
 */
const updateUserPwdByUserId = (obj,handle)=>{
	pool.getConnection(function(err,conn){
		if(!err){
			const selectSql = 'select id from user_table where user=?';
			conn.query(selectSql,[obj.user],(error,result) => {
				if(error) {
					handle(error);
					return;
				} else {
					if(result.length > 0) {
						const sql = 'update user_table set password=? where user=?';
						conn.query(sql,[obj.password,obj.user],function(err,results){
							handle(err,results);
						});
					} else {
							handle(err,'none');
					}
				}
			})
			conn.release();
		}
	});
};

const changePortraitById = (params,handle) => {
	pool.getConnection(function(err,conn){
		if(!err){
			const sql = 'update user_table set portraitUrl=? where id=?';
			conn.query(sql,[params.portraitUrl,params.id],function(err,results){
				handle(err,results);
			});
			conn.release();
		}
	});
}

const findCurUsrInfoById = (id, handle) => {
	pool.getConnection(function(err,conn){
		if(!err){
			let sql = 'select id,name,gender,permission,user,phone,portraitUrl from user_table where id=?';
			conn.query(sql,[id],function(err,results){
				handle(err,results);
			});
			conn.release();
		}	
	})
}
module.exports = {
	login,
	findAllUser,
	saveUser,
	updateUserPwdByUserId,
	batchAssignPermission,
	changePortraitById,
	findCurUsrInfoById
};







