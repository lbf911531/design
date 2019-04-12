// userRouter.js  user模块的路由对象
//创建路由对象
const express = require("express");
const userDB = require("../db/userDB");
const svgCaptcha = require("svg-captcha");
const userRouter = express.Router();
// 登录
userRouter.post("/login", function(req, resp, next) {
  let query = req.body;
  userDB.login(query, function(err, results) {
    if (err) {
      resp.send(err);
      //问题:如何抛出错误或者判断空结果下自定义错误抛给前端
    } else if (results.length < 1) {
      resp.status(401).send({message: "用户名或密码错误" });
    } else {
      resp.send({flag: true, res: results});
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



userRouter.get("/findById", function(req, resp, next) {
  //获取参数
  let query = req.query;
  userDB.findUserById(query.id, function(results) {
    resp.send(results);
  });
});
userRouter.get("/deleteById", function(req, resp, next) {
  //获取参数
  let query = req.query;
  userDB.deleteUserById(query.id, function(err, results) {
    if (err) {
      resp.send("出错了");
    } else {
      resp.send("删除成功");
    }
  });
});
userRouter.post("/save", function(req, resp, next) {
  //获取参数
  let query = req.body;
  userDB.saveUser(query, function(err, results) {
    if (err) {
      resp.send("出错了");
    } else {
      resp.send("添加成功");
    }
  });
});
userRouter.post("/update", function(req, resp, next) {
  //获取参数
  let query = req.body;
  userDB.updateUserById(query, function(err, results) {
    if (err) {
      resp.send("出错了");
    } else {
      resp.send("修改成功");
    }
  });
});
module.exports = userRouter;
