// primaryRouter.js
const express = require('express');
const primaryDB = require('../db/primaryDB');
let primaryRouter = express.Router();

primaryRouter.get('/findAllPrimaryList',function(req,resp){
  const params = req.query;
	primaryDB.findAllPrimaryList(params,function(err,results){
   if(err) {
      resp.send(err);
   } else resp.send(results);
  });
});
primaryRouter.post('/savePrimaryList',function(req,resp){
	let params = req.body;
	primaryDB.savePrimaryValue(params,function(err,results){
   if(err) {
      resp.send(err);
   } else resp.send(results);
  });
});
primaryRouter.post('/updatePrimaryList',function(req,resp){
  let params = req.body;
  primaryDB.updatePrimaryValue(params,function(err,results){
    if(err) {
      resp.send(err);
    } else resp.send(results);
  });
});
module.exports = primaryRouter;




