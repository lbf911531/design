
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
    // let sql = 'select * from forum_table order by msgDate DESC,id DESC';
    const sql = 'SELECT a.id,a.userName,a.msg,a.likeNum,a.msgDate,b.portraitUrl FROM forum_table AS a LEFT JOIN user_table AS b ON a.userId=b.id order by a.msgDate DESC, a.id DESC';
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

// 根据forum_table id 查询对应addition_table 数据
const findAdditionMsg = (params,handle) => {
  pool.getConnection((err,conn) => {
    if(err) {
      handle(err);
      return
    }
    const curMsgSql = 'select * from forum_table where id = ?';
    // const sql = 'select * from addition_table where msgId = ? order by add_msgDate DESC,add_id DESC';
    const sql = 'SELECT a.add_id,a.add_userName,a.add_msg,a.add_msgDate,b.portraitUrl FROM addition_table AS a LEFT JOIN user_table AS b ON a.add_userId=b.id WHERE a.msgId = ? order by a.add_msgDate DESC, a.add_id DESC';
    conn.query(curMsgSql,[params.msgId],(error,res) => {
      if(error) {
        handle(error);
        return;
      }
      conn.query(sql,[params.msgId],(err,results) => {
        const curMsg = res.length > 0 ? res[0] : {};
        handle(err,{curMsg,addMsg:results});
      });
    })
    conn.release();
  })
}

const addAdditionMsg = (params,handle) => {
  pool.getConnection((err, conn) => {
    if(err) {
      handle(err);
      return;
    }
    const sql = "insert into addition_table (add_userName,add_userId,add_userImg,add_msg,add_msgDate,msgId) value(?,?,?,?,?,?)"
    conn.query(
      sql, 
      [
        params.userName,
        parseInt(params.userId),
        params.userImg,
        params.msg,
        params.msgDate,
        params.msgId
      ], 
      (error, results) => {
      handle(error,results);
    });
    conn.release();
  })
}

// 自上次登录时间起新的留言信息
const getMsgListByTime = (params,handle) => {
  pool.getConnection((err, conn) => {
    if(err) {
      handle(err);
      return
    } else {
      const nowDate = new Date();
      const year = nowDate.getFullYear();
      const month = ("0" + (nowDate.getMonth() + 1 )).slice(-2);
      const date = nowDate.getDate();
      const curDate = `${year}-${month}-${date}`;
      const sql = 'select * from forum_table where msgDate between ? and ?';
      conn.query(sql,[params.msgDate,curDate], (error, results) => {
        handle(error, results);
      });
    }
    conn.release();
  })
}

module.exports = {
  findAllMsg,
  saveMsg,
  addLikeNum,
  findLimitLenMsg,
  findAdditionMsg,
  addAdditionMsg,
  getMsgListByTime
};
