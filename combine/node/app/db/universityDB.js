const pool = require("./pool");

const findUniValueListByRel = (params,handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = 'SELECT * FROM university_table where relationship=?';
    conn.query(sql, [params.relationship], (err,results) => {
      handle(err,results);
    });
    conn.release();
  });
}

const newOrUpdateUniValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    let sql = ''; 
    const paramsArr = [
      params.name,
      params.age,
      params.gender,
      params.birth,
      params.phone,
      params.relationship,
      params.contactWay,
    ]
    if(params.id) {
      sql =  "update university_table set name=?,age=?,gender=?,birth=?,phone=?,relationship=?,contactWay=? where id=?";
      paramsArr.push(params.id);
    } else {
      sql =  "Insert into university_table(name,age,gender,birth,phone,relationship,contactWay) value(?,?,?,?,?,?,?)";
    }
    conn.query(
      sql,
      paramsArr,
      (err, results) => {
        handle(err, results);
      }
    );
    conn.release();
  });
}

const batchDelUniValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "delete from university_table where id in (?)";
    conn.query(sql, [params.ids], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
}

module.exports = {
  findUniValueListByRel,
  newOrUpdateUniValue,
  batchDelUniValue
}