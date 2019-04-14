
let pool = require('./pool');
// console.log('pool-course--');
let findAllPrimaryList = (handle) => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return
    }
    let sql = 'select * from primary_table';
    conn.query(sql, [], function(err,results) {
      handle(err,results);
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

module.exports = {
  findAllPrimaryList,
  savePrimaryValue,
  updatePrimaryValue
};
