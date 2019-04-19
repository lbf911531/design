<template>
  <div class="forum-comments">
    <div class="msg-info">
      <!-- 存放当前评论信息 -->
      <div>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/forum' }" replace>回留言页</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="msg-info-content">
        <el-row>
          <el-col :span="6">
            <el-row>
              <p class="msg-name">{{`[${curMsgObj.userName}]`}}</p>
            </el-row>
            <el-row>
              <el-tag size="small">{{curMsgObj.msgDate}}</el-tag>
              <el-tag type="danger" size="small">{{`点赞数 | ${curMsgObj.likeNum}`}}</el-tag>
            </el-row>
          </el-col>
          <el-col :span="14">
            <p class="msg-content">
              <span>留言：</span>
              {{this.escapeStringHTML(curMsgObj.msg)}}
            </p>
          </el-col>
          <el-col :span="4">
            <el-button @click="show = true" size="small" type="danger">
              <a href="#common" class="commo-btn">评 论</a>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="divide-line">
      <p>
        已有
        <span>{{this.addMsgList.length}}</span> 条评论
      </p>
    </div>
    <div class="add-info-box">
      <!-- 存放当前评论下追加的信息 -->
      <div v-if="this.addMsgList.length < 1" class="no-add-msg">暂无评论，请快去添加</div>
      <div v-else>
        <el-card
          class="box-card"
          shadow="hover"
          v-for="msgItem in addMsgList"
          :key="msgItem.add_id"
        >
          <div slot="header" class="box-header">
            <el-row>
              <el-col :span="2">
                <img :src="msgItem.add_userImg" alt="头像" class="portrait-img-style">
              </el-col>
              <el-col :span="6">
                <span>{{msgItem.add_userName+'留言：'}}</span>
              </el-col>
              <el-col :span="16">
                <span style="float: right; padding: 0px 10px">{{msgItem.add_msgDate}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="box-body">
            <span v-html="escapeStringHTML(msgItem.add_msg)"></span>
          </div>
        </el-card>
      </div>
      <div class="comment-add-box" v-if="show" id="common">
        <quill-editor :options="editorOption" v-model="content" @change="onEditorChange($event)"></quill-editor>
        <div class="comment-add-footer">
          <el-button type="primary" @click="handleAddMsg" size="small">发 布</el-button>
          <el-button @click="handleCancelShow" size="small">取 消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      editorOption: {},
      content: "",
      show: false
    };
  },
  created() {
    this.getAdditonMsg();
  },
  computed: {
    ...mapGetters(["addMsgList", "curMsgObj"])
  },
  methods: {
    ...mapActions(["findAdditionMsg", "saveForumAddMsg"]),
    getAdditonMsg() {
      const msgId = this.$route.params.id;
      this.findAdditionMsg(msgId)
        .then(res => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    escapeStringHTML(str) {
      if (!str) return;
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str.replace(/<[^>]+>/g, "");
    },
    // 获取富文本编辑器文本内容
    onEditorChange({ html, text }) {
      this.msgContent = html;
    },
    // 保存
    handleAddMsg() {
      const userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const msgId = this.$route.params.id;
      const params = {
        userId: userInfo.id,
        userName: userInfo.name,
        userImg: userInfo.portraitUrl,
        msg: this.msgContent,
        msgId,
        msgDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      };

      this.saveForumAddMsg(params)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "评论成功"
            });
            this.getAdditonMsg();
            this.content = "";
            this.show = false;
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
    handleReturn() {
      this.$router.replace("/forum");
    },
    handleCancelShow() {
      this.content = "";
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.forum-comments {
  height: 75vh;
  position: relative;
  padding: 20px 30px;
  overflow-y: scroll;
  background: -webkit-linear-gradient(left, #464f76, #553a65, #6c3c4a, #683a4a);
  .msg-info {
    .msg-info-content {
      padding: 10px 0 10px 20px;
      color: #fff;
      border-radius: 5px;
      margin-top: 10px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      .msg-name {
        color: #ff4d4d;
        padding: 5px 0;
      }
      .msg-content {
        line-height: 1.2;
        max-height: 3.6em;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .commo-btn {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  .divide-line {
    margin: 10px 0;
    padding: 10px 0;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    span {
      color: #ff4d4d;
      font-size: 18px;
    }
  }
  .add-info-box {
    padding: 10px 0;
    position: relative;
    .no-add-msg {
      text-align: center;
      font-size: 40px;
      color: #e6a23c;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 14px;
      margin-top: 50px;
    }
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
          span {
            line-height: 40px;
            margin: 0 10px;
          }
        }
      }
    }
    .comment-add-box {
      background-color: #fff;
      .comment-add-footer {
        padding: 5px 20px;
        float: right;
      }
      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }
}
</style>
<style lang="less">
.forum-comments {
  .msg-info {
    .el-breadcrumb {
      font-size: 22px;
      line-height: 1.15em;
      .el-breadcrumb__inner {
        font-size: 22px;
        color: #e6a23c;
      }
      .el-breadcrumb__separator {
        font-size: 22px;
      }
    }
  }
}
</style>



