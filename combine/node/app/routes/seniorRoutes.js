const express = require("express");
const seniorDB = require("../db/seniorDB");

const seniorRoute = express.Router();
// /senior/
/**
 * 查询数据
 */
seniorRoute.get("/data/find/all", (req, resp) => {
  console.log("req and resp", req, resp);
  seniorDB.findAllSeniorList((err, result) => {
    if (err) {
      resp.send(err);
    } else resp.send(result);
  });
});
/**
 * 新增数据
 */
seniorRoute.post("/data/new", (req, resp) => {
  const params = req.body;
  seniorDB.addNewSeniorValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      console.log("add result", result);
      resp.send(result);
    }
  });
});
/**
 * 编辑数据
 */
seniorRoute.post("/data/update", (req, resp) => {
  const params = req.body;
  seniorDB.updateSeniorValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

seniorRoute.get("/data/find/by/relationship", (req, resp) => {
  const params = req.query;
  seniorDB.findSeniorListByParams(params, (err, result) => {
    if(err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
})

module.exports = seniorRoute;
