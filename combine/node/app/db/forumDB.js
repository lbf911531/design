
const pool = require('./pool');


/**
 * 字段
 *   id :   留言id    int
 *   usrId:  用户id   int
 *   userName: 用户姓名 string
 *   userImg: 用户头像  string
 *   msg : 留言内容  string
 *   likeNum: 点赞数  int
 *   isLiked: 已点赞用户id集合, string 英文半角逗号','隔开
 *   msgDate: 留言时间  TIMESTAMP
 */

/**
 * 查询所有留言
 * @param {*} handle 
 */
const findAllMsg = handle => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return
    }
    let sql = 'select * from forum_table order by msgDate DESC,id DESC';
    conn.query(sql, [], function(err,results) {
      handle(err,results);
    });
    conn.release();
  });
}

/**
 * 新增留言
 * isLiked: string  存储当前留言点赞过的用户id
 * @param {*} params 
 * @param {*} handle 
 */
const saveMsg = (params, handle) => {
  pool.getConnection((err, conn) => {
    if(err) {
      handle(err);
      return;
    }
    const sql = "insert into forum_table (userName,userId,userImg,msg,likeNum,isLiked,msgDate) value(?,?,?,?,?,?,?)"
    conn.query(
      sql, 
      [
        params.userName,
        parseInt(params.userId),
        params.userImg,
        params.msg,
        0,
        '',
        params.msgDate
      ], 
      (error, results) => {
      handle(error,results);
    });
    conn.release();
  });
}

/**
 * 点赞功能
 * 判断当前userId是否点赞过一次，如果有则不再执行
 * params: {
 *    id: string 留言id,
 *    userId: string
 * }
 * @param {*} params 
 * @param {*} handle 
 */
const addLikeNum = (params, handle) => {
  pool.getConnection((err, conn) => {
    if(err) {
      handle(err);
      return;
    } 
    const selectSql = `select * from forum_table where id = ? and isLiked like '%${params.userId}%'`;
    const numSql = 'update forum_table set likeNum=likeNum+1,isLiked=? where id = ?'; 
    const selectSql2 = 'select * from forum_table where id = ?';
    // 查询出当前留言id对应信息
    conn.query(selectSql2,[params.id],(errs,result) => {
      if(errs) {
        handle(errs);
        return;
      }
      // 借助数据库筛选
      conn.query(selectSql,[params.id],(err,results) => {
        if(!err) {
          // 模糊查询出数据时表示当前用户已对该留言点赞过，且不允许再点赞
          const len = results.length;
          if(len <= 0) {
            const newIsLiked = `${result[0].isLiked},${params.userId}`;
            // 自增点赞数
            conn.query(numSql,[newIsLiked,params.id],(error, res) => {
              handle(error, res);
            });
          } else {
            handle({status: 401,sqlMessage: '已点赞'});
          }
        } else handle(err, results);
      });
    });
  })
}

const findLimitLenMsg = handle => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return
    }
    let sql = 'select * from forum_table order by msgDate DESC,id DESC limit 5';
    conn.query(sql, [], function(err,results) {
      handle(err,results);
    });
    conn.release();
  });
}

module.exports = {
  findAllMsg,
  saveMsg,
  addLikeNum,
  findLimitLenMsg
};
