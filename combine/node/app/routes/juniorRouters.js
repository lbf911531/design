const express = require("express");
const juniorDB = require("../db/juniorDB");

const juniorRoute = express.Router();

/**
 *  find all data
 */
juniorRoute.get("/data/find/all", (req, resp) => {
  const params = req.query;
  juniorDB.findAllJuniorList(params,(err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result)
    };
  });
});

/**
 * update or new
 */
juniorRoute.post("/data/save/or/update", (req, resp) => {
  const params = req.body;
  juniorDB.newOrUpdateJuniorValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

/**
 *  batch delete 
 */
juniorRoute.post("/data/delete/batch", (req, resp) => {
  const params = req.body;
  juniorDB.batchDelJuniorValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

/**
 * change relationship 
 */
juniorRoute.post("/data/relationship/change", (req, resp) => {
  const params = req.body;
  juniorDB.changeJuniorRelationship(params, (err, result) => {
    if(err) {
      resp.send(err);
    } else resp.send(result);
  });
});

juniorRoute.get("/data/find/by/relationship", (req, resp) => {
  const params = req.query;
  juniorDB.findJuniorListByParams(params, (err, result) => {
    if(err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

module.exports = juniorRoute;