const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouters');
const primaryRouter = require('./routes/primaryRouters');
const seniorRouter = require('./routes/seniorRouters');
const juniorRouter = require('./routes/juniorRouters');
const cookieParser = require('cookie-parser');

let app = express();
// 使用body-parser中间件
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: false} ));
// 使用cookie
app.use(cookieParser());

// 处理跨域
app.all('*',function(req,resp,next){
	resp.set({
		"Access-Control-Allow-Origin":"*",
		"Access-Control-Allow-Headers":"X-Requested-With,Content-Type,Access-Token",
		"Access-Control-Allow-Methods":"POST,GET,OPTIONS"
    // "Access-Control-Expose-Headers": "*",
    // "Access-Control-Allow-Credentials": "true"
	});
	//继续往下执行
	next();
});
/*  */
app.use('/user',userRouter);
app.use('/primary',primaryRouter);
app.use('/senior',seniorRouter);
app.use('/junior',juniorRouter);
app.listen(3000,function(){
	console.log('3000服务器已启动');
});