const express = require("express");
const universityDB = require("../db/universityDB");

const universityRoute = express.Router();

/**
 * find all by relationship ,pageSize and currentPage 
 */
universityRoute.get("/data/find/all/by/conditions", (req, resp) => {
  const params = req.query;
  universityDB.findUniValueListByRel(params,(err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result)
    };
  });
});

/**
 * save or update
 */
universityRoute.post("/data/save/or/update", (req, resp) => {
  const params = req.body;
  universityDB.newOrUpdateUniValue(params, (err, result) => {
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
universityRoute.post("/data/delete/batch", (req, resp) => {
  const params = req.body;
  universityDB.batchDelUniValue(params, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      resp.send(result);
    }
  });
});

module.exports = universityRoute;