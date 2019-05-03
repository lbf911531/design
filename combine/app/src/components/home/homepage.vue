<template>
  <div class="homepage">
    <el-row class="top-row">
      <el-col :span="8" class="top-ele-box-one">
        <el-card class="card-height card-height-254">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div class="userInfo">
            <el-row>
              <i class="ico-aliemotion ico ico-font"></i>
              {{this.period}}
            </el-row>
            <el-row>
              <el-col :span="8">
                <i class="iconfont icon-xiaoren ico-font"></i>用户：
              </el-col>
              <el-col
                :span="14"
              >{{this.curUserInfo&& this.curUserInfo.name ? this.curUserInfo.name : '-'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <i class="ico ico-aliquanxian ico-font"></i>权限：
              </el-col>
              <el-col :span="14">
                <el-tag
                  type="danger"
                  size="mini"
                >{{this.curUserInfo&& this.curUserInfo.permission ? (this.curUserInfo.permission === 'admin' ? '管理员' : '普通用户') : '-'}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <i class="ico ico-alixingbie ico-font"></i>性别：
              </el-col>
              <el-col
                :span="14"
              >{{this.curUserInfo&& this.curUserInfo.gender ? this.curUserInfo.gender : '-'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <i class="ico-font el-icon-mobile-phone"></i>电话：
              </el-col>
              <el-col
                :span="14"
              >{{this.curUserInfo&& this.curUserInfo.phone ? this.curUserInfo.phone : '-'}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card-height card-height-254" :body-style="{ padding: '5px' }">
          <el-carousel :interval="5000" arrow="always" height="244px">
            <el-carousel-item v-for="item in imgArr" :key="item.id">
              <img :src="item.idView" alt="图" class="imgStyle">
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <el-col :span="8" class="top-ele-box-two">
        <el-card class="card-height card-height-300" :body-style="{ padding: '3px' }">
          <Calendar/>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="bottom-row">
      <el-col :span="12" class="bottom-ele-box">
        <el-card class="card-height card-height-226 relative-box">
          <el-row class="panel-box-fir">
            <el-col :span="10">
              <div class="panel panel-admin">
                <div class="panel-body">
                  <el-col :span="8">
                    <i class="el-icon-edit-outline"></i>
                  </el-col>
                  <el-col :span="14">
                    <p>管理员人数：</p>
                    <h4>{{adminLength}}</h4>
                  </el-col>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="panel-tip">
              管理员：拥有对数据操作的权限，同时可以分配权限
              <!-- 组件弹框设置权限 勾选 -->
            </el-col>
          </el-row>
          <el-row class="panel-box-sec">
            <el-col :span="10">
              <div class="panel panel-normal">
                <div class="panel-body">
                  <el-col :span="8">
                    <i class="el-icon-view"></i>
                  </el-col>
                  <el-col :span="14">
                    <p>普通用户人数：</p>
                    <h4>{{normalLength}}</h4>
                  </el-col>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="panel-tip">普通用户：仅可阅览数据</el-col>
          </el-row>
          <div class="oper-box">
            <el-tooltip effect="dark" content="分配管理员权限" placement="top-start">
              <el-button
                icon="el-icon-sort"
                circle
                type="info"
                @click="dialogTableVisible = true"
                v-if="this.curUserInfo.permission === 'admin'"
              ></el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="bottom-ele-box">
        <el-card
          class="card-height card-height-226 diy-box"
          :body-style="{ padding: '0px 20px',overflowY: 'scroll', height: '240px'}"
        >
          <div slot="header" class="header-card">
            <span>RECENT POSTINGS</span>
            <el-badge :value="msgLen">
              <el-tag size="mini" closable style="margin-left: 10px" v-if="msgLen > 0">您有新的留言</el-tag>
            </el-badge>
            <el-tooltip effect="dark" content="更多请点击左侧留言区" placement="top">
              <i class="el-icon-more"></i>
            </el-tooltip>
          </div>
          <div class="body-card">
            <div class="body-card-content" v-for="item in msgLimitList" :key="item.id">
              <p @click="handleJumpToComments(item.id)">{{item.userName}}留言/{{item.msgDate}}</p>
              <p>
                <span v-html="escapeStringHTML(item.msg)"></span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="权限分配" :visible.sync="dialogTableVisible">
      <div>
        <el-row>
          <el-col :span="6">
            <el-input v-model="search" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-table :data="normalValueList" @selection-change="handleSelectionChange" max-height="320">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column property="name" label="用户名" align="center"></el-table-column>
        <el-table-column property="phone" label="电话" align="center"></el-table-column>
        <el-table-column property="gender" label="性别" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAssign">取 消</el-button>
        <el-button type="primary" @click="assignPermissions">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Calendar from "vue-calendar-component";

export default {
  data() {
    return {
      imgArr: [
        { id: 0, idView: "/static/images/1.gif" },
        { id: 1, idView: "/static/images/2.jpg" },
        { id: 2, idView: "/static/images/3.jpg" },
        { id: 3, idView: "/static/images/4.jpg" }
      ],
      dialogTableVisible: false,
      search: "",
      multipleSelection: [], // 多选
      period: "",
    };
  },
  components: {
    Calendar
  },
  created() {
    const id = window.sessionStorage.getItem("userId");
    this.findUserCollection();
    this.getCurUserById(id);
    this.findMsgLimitFive();
    this.renderTimePeriod();
      const userObj = JSON.parse(window.sessionStorage.getItem('userInfo'));
      this.getMsgByLimitData({userId: id, msgDate: userObj.lastLoginTime});
  },
  computed: {
    ...mapGetters(["curUserInfo", "userCollection", "msgLimitList",'limitDataMsg']),
    adminLength() {
      const adminArr = [];
      if (this.userCollection) {
        this.userCollection.forEach(item => {
          if (item.permission === "admin") {
            adminArr.push(item);
          }
        });
      }
      return adminArr.length;
    },
    normalLength() {
      const normalArr = [];
      if (this.userCollection) {
        this.userCollection.forEach(item => {
          if (item.permission === "normal") {
            normalArr.push(item);
          }
        });
      }
      return normalArr.length;
    },
    normalValueList() {
      const that = this;
      return (
        this.userCollection &&
        this.userCollection.filter(function(item) {
          if (item.name) {
            return (
              item.name.indexOf(that.search) !== -1 &&
              item.permission === "normal"
            );
          } else return false;
        })
      );
    },
     msgLen() {
      if(this.limitDataMsg && this.limitDataMsg.len) {
        const len = this.limitDataMsg.len;
        return len;
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions([
      "getUserCollection",
      "batchAssignPer",
      "getCurUserById",
      "findMsgLimitFive",
      "getMsgByLimitData"
    ]),
    // 查询所有用户
    findUserCollection() {
      this.getUserCollection()
        .then(res => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    // 多选行数据
    handleSelectionChange(values) {
      this.multipleSelection = values;
    },
    // 分配管理员权限
    assignPermissions() {
      const that = this;
      this.$confirm("是否为勾选的对象分配管理员权限", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const temp = this.multipleSelection.map(item => item.id);
          const params = {
            permission: "admin",
            ids: String(temp)
          };
          that
            .batchAssignPer(params)
            .then(res => {
              if (res) {
                that.$message({
                  type: "success",
                  message: "分配成功"
                });
                that.dialogTableVisible = false;
                that.findUserCollection();
                that.multipleSelection = [];
              }
            })
            .catch(err => {
              that.multipleSelection = [];
              that.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(() => {
          that.multipleSelection = [];
          that.dialogTableVisible = false;
          this.$message({
            type: "info",
            message: "已取消分配"
          });
        });
    },
    handleCancelAssign() {
      this.multipleSelection = [];
      this.dialogTableVisible = false;
    },
    // 判断上午下午时间段
    renderTimePeriod() {
      const now = new Date();
      const hour = now.getHours();
      if (hour < 6) {
        this.period = "凌晨好！";
      } else if (hour < 9) {
        this.period = "早上好！";
      } else if (hour < 12) {
        this.period = "上午好！";
      } else if (hour < 14) {
        this.period = "中午好！";
      } else if (hour < 17) {
        this.period = "下午好！";
      } else if (hour < 19) {
        this.period = "傍晚好！";
      } else if (hour < 22) {
        this.period = "晚上好！";
      } else {
        this.period = "夜里好！";
      }
    },
    escapeStringHTML(str) {
      if (!str) return;
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str.replace(/<[^>]+>/g, "");
    },
    handleJumpToComments(id) {
      this.$router.replace(`/forum/comments/${id}`);
    },
  }
};
</script>
<style scoped>
.top-row {
  height: 240px;
}
.top-ele-box-one {
  padding-right: 5px;
}
.top-ele-box-two {
  padding-left: 5px;
}
.bottom-ele-box {
  padding: 5px 10px;
}
.bottom-ele-box:nth-child(1) {
  padding-left: 0px;
}
.bottom-ele-box:nth-child(2) {
  padding-right: 0px;
}
.relative-box {
  position: relative;
}
.oper-box {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.oper-box .el-button {
  background-color: rgba(0, 0, 0, 0.4);
}
.card-height {
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  color: #fff;
}
.card-height-254 {
  height: 254px;
}
.card-height-226 {
  height: 226px;
}
.card-height-300 {
  height: 300px;
}
.userInfo {
  line-height: 24px;
}
.imgStyle {
  width: 100%;
  height: 100%;
}
.panel-box-fir {
  margin-bottom: 20px;
}
.panel {
  padding: 15px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-admin {
  background-color: #fc8675;
}
.panel-normal {
  background-color: #65cea7;
}
.panel-body::after {
  content: "";
  display: block;
  clear: both;
}
.panel-body i {
  font-size: 50px;
}
.panel-body p {
  font-size: 14px;
  margin: 5px 0;
}
.panel-tip {
  padding: 15px;
}
.margin-10 {
  margin: 10px 0;
}
.ico-font {
  color: #409eff;
  margin-right: 2px;
}
.userInfo > .el-row {
  margin-bottom: 5px;
}
.userInfo .ico-aliemotion {
  margin-right: 10px;
}
</style>
<style lang="less">
.bottom-ele-box {
  .el-card__header {
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.65);
    .el-icon-more {
      line-height: 40px;
      float: right;
      cursor: pointer;
    }
    .el-badge__content{
      top: 10px;
    }
  }
  .body-card {
    .body-card-content {
      padding: 5px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        cursor: pointer;
      }
      p:first-child:hover {
        color: #ffd600;
      }
    }
  }
}
</style>
>

