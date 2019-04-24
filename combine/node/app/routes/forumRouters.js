
const express = require('express');
const forumDB = require('../db/forumDB');

const forumRouter = express.Router();

// 查询
forumRouter.get("/message/find/all", (req, resp) => {
  forumDB.findAllMsg((err, results) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results);
    };
  });
});

// 添加
forumRouter.post("/message/save", (req, resp) => {
  const params = req.body;
  forumDB.saveMsg(params, (err, results) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results);
    };
  });
});

// 点赞
forumRouter.post("/message/like/num/add",(req, resp) => {
  const params = req.body;
  forumDB.addLikeNum(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(result);
    };
  });
});

// 查询前五条
forumRouter.get("/message/find/limit/five",(req, resp) => {
  forumDB.findLimitLenMsg((err, results) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results);
    };
  });
});

forumRouter.get("/message/comments/find/by/msgId", (req, resp) => {
  const params = req.query;
  forumDB.findAdditionMsg(params,(err, results) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results);
    };
  });
});

forumRouter.post("/message/comments/save", (req, resp) => {
  const params = req.body;
  forumDB.addAdditionMsg(params, (err, results) => {
    if (err) {
      resp.send(err);
    } else {
      resp.status(200).send(results);
    };
  });
});

forumRouter.get("/message/find/limit/login/time",(req, resp) => {
  const params = req.body;
  forumDB.getMsgListByTime(params, (err ,results) => {
    if(err) {
      resp.send(err);
    } else {
      resp.send(200).send({len: results.length});
    }
  })
})

module.exports = forumRouter;
 