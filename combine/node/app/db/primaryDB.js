
let pool = require('./pool');
// console.log('pool-course--');
let findAllPrimaryList = (params,handle) => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return
    }
    const startSize = parseInt(params.pageSize) * (parseInt(params.curPage) - 1);
    const endSize = startSize + parseInt(params.pageSize); 
    const sqlTotal = 'SELECT * FROM primary_table';
    const sqlLimit = 'SELECT * FROM primary_table limit ?,?';
    conn.query(sqlTotal, [], (totalErr, totalResults) => {
      if(totalErr) {
        handle(totalErr); 
        return;
      }
      conn.query(sqlLimit, [startSize, endSize], (limitErr, limitResults) => {
        handle(limitErr, {totalLength: totalResults.length,limitRes:limitResults});
      });
    });
    conn.release();
  });
}

let savePrimaryValue = (params,handle) => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return;
    }
    let sql = 'Insert into primary_table(name,age,gender,birth,relationship) value(?,?,?,?,?)';
    conn.query(
      sql,
      [params.name,params.age,params.gender,params.birth,params.relationship],
      (err,results) => {
        handle(err,results);
      }
    );
    conn.release();
  })
}

let updatePrimaryValue = (params,handle) => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return;
    }
    let sql = 'update primary_table set name=?,age=?,gender=?,birth=?,relationship=? where id=?';
    conn.query(
      sql,
      [params.name,params.age,params.gender,params.birth,params.relationship,params.id],
      (err,results) => {
        handle(err,results);
      }
    );
    conn.release();
  });
}

const batchSaveValue = (params,handle) => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return;
    }
    const list = JSON.parse(params.list);
    if(list.length <= 0) return;
    const values = list.map(item => {
      return (temp = [item.name,item.age,item.gender,item.birth,item.relationship]);
    });
    let sql = 'Insert into primary_table(name,age,gender,birth,relationship) value ?';
    conn.query(
      sql,
      [values],
      (err,results) => {
        handle(err,results);
      }
    );
    conn.release();
  })
}

module.exports = {
  findAllPrimaryList,
  savePrimaryValue,
  updatePrimaryValue,
  batchSaveValue
};
