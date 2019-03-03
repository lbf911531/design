// userRouter.js  user模块的路由对象
//创建路由对象
const express = require('express');
const userDB = require('../db/userDB');
let userRouter = express.Router();
userRouter.post('/login',function(req,resp,next){
	let query = req.body;
	userDB.login(query,function(err,results){
		if(err) {
			resp.send(err);
			//问题:如何抛出错误或者判断空结果下自定义错误抛给前端
		} else if(results.length < 1) {
			resp.send(401,{message: '用户名或密码错误'});
		} else resp.send(results);
	});
})
userRouter.get('/findAll',function(req,resp,next){
	//db
	userDB.findAllUser(function(results){
		console.log(results);
		resp.send(results);
	});
});
userRouter.get('/findById',function(req,resp,next){
	//获取参数
	let query = req.query;
	userDB.findUserById(query.id,function(results){
		resp.send(results);
	});
});
userRouter.get('/deleteById',function(req,resp,next){
	//获取参数
	let query = req.query;
	userDB.deleteUserById(query.id,function(err,results){
		if(err){
			resp.send('出错了');
		}else{
			resp.send('删除成功');
		}
	});
});
userRouter.post('/save',function(req,resp,next){
	//获取参数
	let query = req.body;
	userDB.saveUser(query,function(err,results){
		if(err){
			resp.send('出错了');
		}else{
			resp.send('添加成功');
		}
	});
});
userRouter.post('/update',function(req,resp,next){
	//获取参数
	let query = req.body;
	userDB.updateUserById(query,function(err,results){
		if(err){
			resp.send('出错了');
		}else{
			resp.send('修改成功');
		}
	});
});
module.exports = userRouter;






