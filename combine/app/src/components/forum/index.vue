<template>
  <div class="forum">
    <div class="quote">
      <marquee>欢迎进入论坛，请畅所欲言</marquee>
    </div>
    <div class="divide-line"></div>
    <div class="publish-msg">
      <el-button type="primary" icon="el-icon-message" size="small" @click="dialogVisible=true">留言</el-button>
    </div>
    <div class="forum-content">
      <el-card class="box-card" shadow="hover" v-for="msgItem in msgList" :key="msgItem.id">
        <div slot="header" class="box-header">
          <el-row>
            <el-col :span="2">
              <img :src="msgItem.portraitUrl" alt="头像" class="portrait-img-style">
            </el-col>
            <el-col :span="6">
              <span>{{msgItem.userName+'留言：'}}</span>
            </el-col>
            <el-col :span="16">
              <span style="float: right; padding: 0px 10px">{{msgItem.msgDate}}</span>
              <div class="oper-box">
                <el-button type="text" @click="handleJumpToComments(msgItem.id)">详情</el-button>
                <el-tooltip content="点赞" effect="dark" placement="right-start">
                  <el-button
                    class="ico ico-alidianzan"
                    type="text"
                    @click="handleGiveLike(msgItem.id)"
                  ></el-button>
                </el-tooltip>
                <span>
                  点赞数:
                  <span class="like-num">{{msgItem.likeNum}}</span>
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="box-body">
          <span v-html="escapeStringHTML(msgItem.msg)"></span>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="请留言">
      <quill-editor :options="editorOption" v-model="content" @change="onEditorChange($event)"></quill-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelDialog">取 消</el-button>
        <el-button type="primary" @click="handleAddMsg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      dialogVisible: false,
      content: "",
      editorOption: {},
      dataList: [],
      msgContent: ""
    };
  },
  created() {
    this.getAllForumMsg();
  },
  computed: {
    ...mapGetters(["msgList"])
  },
  methods: {
    ...mapActions(["findAllForumMsg", "saveForumMsg", "addForumMsgLikeNum"]),
    // 查询
    getAllForumMsg() {
      this.findAllForumMsg()
        .then(data => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
    },
    // 点赞
    handleGiveLike(msgId) {
      const userId = window.sessionStorage.getItem("userId");
      const params = {
        id: msgId,
        userId
      };
      this.addForumMsgLikeNum(params)
        .then(res => {
          if (res.status === 200) {
            this.$notify({
              type: "info",
              message: "点赞成功"
            });
            this.getAllForumMsg();
          } else {
            this.$message({
              type: "error",
              message: res.code
            });
          }
        })
        .catch(err => {
          this.$notify({
            type: "error",
            message: err
          });
        });
    },
    // 获取富文本编辑器文本内容
    onEditorChange({ html, text }) {
      this.msgContent = html;
    },
    // 保存
    handleAddMsg() {
      const userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const params = {
        userId: userInfo.id,
        userName: userInfo.name,
        userImg: userInfo.portraitUrl,
        msg: this.msgContent,
        msgDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      };

      this.saveForumMsg(params)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "留言成功"
            });
            this.getAllForumMsg();
            this.dialogVisible = false;
            this.content = "";
          } else {
            this.content = "";
            this.$message({
              type: "error",
              message: res.code + res.sqlMessage
            });
          }
        })
        .catch(err => {
          this.content = "";
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    // 存储及将数据库中的数据反显为HTML字符串
    // 后台接收的数据如下："&lt;h1&gt;title&lt;
    escapeStringHTML(str) {
      if(!str) return;
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    handleJumpToComments(id) {
      this.$router.push(`/forum/comments/${id}`);
    },
    handleCancelDialog() {
      this.dialogVisible = false;
      this.content = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.forum {
  .quote {
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    margin: 0 0 10px 0;
    padding: 0 20px;
    background-color: #fafafa;
    color: #f0c863;
    marquee {
      color: #e21918;
    }
  }
  .divide-line {
    height: 1px;
    box-sizing: border-box;
    border-bottom: 1px solid #fafafa;
    margin-bottom: 10px;
  }
  .publish-msg {
    padding: 5px 20px;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .el-button {
      float: right;
    }
  }
  .forum-content {
    height: 400px;
    overflow-y: scroll;
    padding: 0 20px;
    .box-card {
      margin-bottom: 10px;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      .box-header {
        .portrait-img-style {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .el-row {
          height: 40px;
          span,
          .el-button {
            line-height: 40px;
            margin: 0 10px;
          }
          .el-button {
            float: right;
            padding: 0;
            border: none;
          }
          .oper-box {
            float: right;
            &&::after {
              content: "";
              display: block;
              clear: both;
            }
            .like-num {
              color: #e21918;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.forum-content {
  .el-card {
    .el-card__header {
      padding: 10px 20px;
    }
  }
}
</style>
