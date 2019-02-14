// courseRouter.js
// 所有的课程模块的路由
const express = require('express');
let courseRouter = express.Router();
courseRouter.get('/findAll',function(req,resp){
	resp.send('findAll,course');
});
courseRouter.get('/findById',function(req,resp){
	let query = req.query;
	resp.send('findById,course');
});
courseRouter.get('/deleteById',function(req,resp){
	let query = req.query;
	resp.send('deleteById,course');
});
courseRouter.get('/save',function(req,resp){
	let query = req.body;
	resp.send('save,course');
});
module.exports = courseRouter;




