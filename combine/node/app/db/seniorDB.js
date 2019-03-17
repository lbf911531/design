const pool = require("./pool");

/**
 * 查询所有信息 
 * @method handle
 * @param {*} handle 
 */
const findAllSeniorList = handle => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "select * from senior_table";
    conn.query(sql, [], function(err, results) {
      handle(err, results);
    });
    conn.release();
  });
};

/**
 * add new value into db 
 * @param {*} params 
 * @param {*} handle 
 */
const addNewSeniorValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql =
      "Insert into senior_table(name,age,gender,birth,relationship) value(?,?,?,?,?)";
    conn.query(
      sql,
      [
        params.name,
        params.age,
        params.gender,
        params.birth,
        params.relationship
      ],
      (err, results) => {
        handle(err, results);
      }
    );
    conn.release();
  });
};

/**
 * update the selected value
 * @param {*} params 
 * @param {*} handle 
 */
const updateSeniorValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql =
      "update senior_table set name=?,age=?,gender=?,birth=?,relationship=? where id=?";
    conn.query(
      sql,
      [
        params.name,
        params.age,
        params.gender,
        params.birth,
        params.relationship,
        params.id
      ],
      (err, results) => {
        handle(err, results);
      }
    );
    conn.release();
  });
};

/**
 * get the valueList by field 'relationship'
 * @param {*} params 
 * @param {*} handle 
 */
const findSeniorListByParams = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "select * from senior_table where relationship=?";
    conn.query(sql, [params.relationship], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
};

module.exports = {
  findAllSeniorList,
  addNewSeniorValue,
  updateSeniorValue,
  findSeniorListByParams
};
