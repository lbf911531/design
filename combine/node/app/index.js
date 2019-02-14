const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter')
let app = express();
// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:true}));
// 处理跨域
app.all('*',function(req,resp,next){
	resp.set({
		"Access-Control-Allow-Origin":"*",
		"Access-Control-Allow-Headers":"X-Requested-With",
		"Access-Control-Allow-Methods":"POST,GET,OPTIONS"
	});
	//继续往下执行
	next();
});
// app.use(userRouter);
app.use('/user',userRouter);
app.use('/course',courseRouter);
app.listen(3000,function(){
	console.log('3000服务器已启动');
});