// userRouter.js  user模块的路由对象
//创建路由对象
const express = require("express");
const userDB = require("../db/userDB");
const svgCaptcha = require("svg-captcha");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
// 登录
userRouter.post("/login", function(req, resp, next) {
  let query = req.body;
  userDB.login(query, function(err, results) {
    if (err) {
      resp.send(err);
      //问题:如何抛出错误或者判断空结果下自定义错误抛给前端
    } else if (results.length < 1) {
      resp.status(401.1).send({message: "用户名或密码错误" });
    } else {
      const content ={name:req.body.user}; // 要生成token的主题信息
      const secretOrPrivateKey="12345" // 这是加密的key（密钥） 
      const token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60*60*1  // 1小时过期
      });
      results[0].token = token;
      resp.status(200).send(results);
    }
  });
});

// 获取验证码
userRouter.get("/getCaptcha", function(req, resp, next) {
  const captcha = svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 2,
    // 宽度
    width: 80,
    // 高度
    height: 30
  });
   req.session = captcha.text.toLowerCase();
   resp.cookie('captcha', req.session);
   resp.setHeader('Content-Type', 'image/svg+xml');
   resp.write(String(captcha.data));
   resp.end();
});

userRouter.get("/data/find/all", function(req, resp, next) {
  //db
  userDB.findAllUser((err,result) => {
    if(err) resp.send(err);
    else resp.send(result);
  })
});

userRouter.post("/data/batch/assign/permission", function(req, resp, next) {
  const params = req.body;
  userDB.batchAssignPermission(params,(err, result) => {
    if(err) resp.send(err);
    else resp.send(result);
  })
});

userRouter.post("/register", function(req, resp, next) {
  //获取参数
  let query = req.body;
  userDB.saveUser(query, function(err, results) {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send("添加成功");
    }
  });
});
userRouter.post("/password/find", function(req, resp, next) {
  //获取参数
  const query = req.body;
  userDB.updateUserPwdByUserId(query, function(err, results) {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send("修改成功");
    }
  });
});
userRouter.post("/data/portrait/change", function(req, resp, next) {
  //获取参数
  const query = req.body;
  userDB.changePortraitById(query, function(err, results) {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results);
    }
  });
});

userRouter.get("/data/find/by/id", (req,resp,next) => {
  const params = req.query;
  userDB.findCurUsrInfoById(params.id,(err, results) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results[0]);
    }
  });
});
module.exports = userRouter;
