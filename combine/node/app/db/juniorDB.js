const pool = require("./pool");

const findAllJuniorList = (params,handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    /**
     * 为了安全起见，默认情况下是不允许执行多条查询语句的
     * 要使用多条查询语句的功能，就需要在创建数据库连接的时候打开这一功能：
     * const connection =  mysql.createConnection( { multipleStatements: true } );
     */
    const startSize = parseInt(params.pageSize) * (parseInt(params.curPage) - 1);
    const endSize = startSize + parseInt(params.pageSize); 
    const sqlTotal = 'SELECT * FROM junior_table';
    const sqlLimit = 'SELECT * FROM junior_table limit ?,?';
    conn.query(sqlTotal, [], (totalErr, totalResults) => {
      if(totalErr) {
        handle(totalErr); 
        return;
      }
      conn.query(sqlLimit, [startSize, endSize], (limitErr, limitResults) => {
        handle(limitErr, {totalRes: totalResults,limitRes:limitResults});
      });
    });
    conn.release();
  });
}

const newOrUpdateJuniorValue = (params, handle) => {
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
      params.relationship,
      params.contactWay,
    ]
    if(params.id) {
      sql =  "update junior_table set name=?,age=?,gender=?,birth=?,relationship=?,contactWay=? where id=?";
      paramsArr.push(params.id);
    } else {
      sql =  "Insert into junior_table(name,age,gender,birth,relationship,contactWay) value(?,?,?,?,?,?)";
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

const batchDelJuniorValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "delete from junior_table where id in (?)";
    conn.query(sql, [params.ids], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
}

const changeJuniorRelationship =  (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "update junior_table set relationship=? where id=?";
    conn.query(sql, [params.relationship, params.id], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
}

const findJuniorListByParams =  (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "select * from junior_table where relationship=?";
    conn.query(sql, [params.relationship], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
};

module.exports = {
  findAllJuniorList,
  newOrUpdateJuniorValue,
  batchDelJuniorValue,
  changeJuniorRelationship,
  findJuniorListByParams
}