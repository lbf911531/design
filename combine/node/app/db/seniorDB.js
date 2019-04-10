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
    const sql = "select * from senior_table where relationship= 'normal' or relationship='friend'";
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
      "Insert into senior_table(name,age,gender,birth,relationship,phone,contactWay) value(?,?,?,?,?,?,?)";
    conn.query(
      sql,
      [
        params.name,
        params.age,
        params.gender,
        params.birth,
        params.relationship,
        params.phone,
        params.contactWay,
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
      "update senior_table set name=?,age=?,gender=?,birth=?,relationship=?,phone=?,contactWay=? where id=?";
    conn.query(
      sql,
      [
        params.name,
        params.age,
        params.gender,
        params.birth,
        params.relationship,
        params.phone,
        params.contactWay,
        params.id
      ],
      (err, results) => {
        handle(err, results);
      }
    );
    conn.release();
  });
};

const batchDelSeniorValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "delete from senior_table where id in (?)";
    conn.query(sql, [params.ids], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
}

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

/**
 * get the value about teacher
 * @param {*} handle 
 */
const findSeniorTeachersList = handle => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "select * from senior_teacher_table";
    conn.query(sql, [], function(err, results) {
      handle(err, results);
    });
    conn.release();
  });
};

/**
 * add teacher value
 * @param {*} params 
 * @param {*} handle 
 */
const newSeniorTeachersValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql =
      "Insert into senior_teacher_table(name,age,gender,phone,subject) value(?,?,?,?,?)";
    conn.query(
      sql,
      [
        params.name,
        params.age,
        params.gender,
        params.phone,
        params.subject,
      ],
      (err, results) => {
        handle(err, results);
      }
    );
    conn.release();
  });
};

/**
 * update teacher value
 * @param {*} params 
 * @param {*} handle 
 */
const updateSeniorTeachersValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql =
      "update senior_teacher_table set name=?,age=?,gender=?,phone=?,subject=? where id=?";
    conn.query(
      sql,
      [
        params.name,
        params.age,
        params.gender,
        params.phone,
        params.subject,
        params.id
      ],
      (err, results) => {
        handle(err, results);
      }
    );
    conn.release();
  });
};

const batchDelSeniorTeachersValue = (params, handle) => {
  pool.getConnection((err, conn) => {
    if (err) {
      handle(err);
      return;
    }
    const sql = "delete from senior_teacher_table where id in (?)";
    conn.query(sql, [params.ids], (err, results) => {
      handle(err, results);
    });
    conn.release();
  });
}

module.exports = {
  findAllSeniorList,
  addNewSeniorValue,
  updateSeniorValue,
  findSeniorListByParams,
  findSeniorTeachersList,
  newSeniorTeachersValue,
  updateSeniorTeachersValue,
  batchDelSeniorTeachersValue,
  batchDelSeniorValue
};
