const express = require("express");
const seniorDB = require("../db/seniorDB");

const seniorRoute = express.Router();
/**
 * 查询数据
 */
  seniorRoute.get("/data/find/all", (req, resp) => {
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

  /**
   * 批量删除
   */
  seniorRoute.post("/data/delete/batch", (req, resp) => {
    const params = req.body;
    seniorDB.batchDelSeniorValue(params, (err, result) => {
      if (err) {
        resp.send(err);
      } else {
        resp.send(result);
      }
    });
  });
/**
 * 根据关系查询信息
 */
  seniorRoute.get("/data/find/by/relationship", (req, resp) => {
    const params = req.query;
    seniorDB.findSeniorListByParams(params, (err, result) => {
      if(err) {
        resp.send(err);
      } else {
        resp.send(result);
      }
    });
  });

  /**
 * 查询教师信息
 */
seniorRoute.get("/data/find/teacher", (req, resp) => {
  seniorDB.findSeniorTeachersList((err, result) => {
    if (err) {
      resp.send(err);
    } else resp.send(result);
  });
});

/**
* 新增数据 --教师
*/
seniorRoute.post("/data/teacher/new", (req, resp) => {
  const params = req.body;
  seniorDB.newSeniorTeachersValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

/**
* 编辑数据 --教师
*/
seniorRoute.post("/data/teacher/update", (req, resp) => {
  const params = req.body;
  seniorDB.updateSeniorTeachersValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

seniorRoute.post("/data/delete/batch/teacher", (req, resp) => {
  const params = req.body;
  seniorDB.batchDelSeniorTeachersValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

module.exports = seniorRoute;
