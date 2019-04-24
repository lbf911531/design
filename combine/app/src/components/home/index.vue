<template>
  <div class="home">
    <div class="contenter">
      <div>
        <el-row>
          <el-col :span="leftSpan" class="left-nav">
            <el-menu
              router
              default-active="/homepage"
              class="el-menu-vertical-demo menu-list"
              background-color="rgba(0,0,0,.5)"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
            >
              <div class="top-title">
                <img src="/static/images/logos.jpg" alt="图">
                <span v-if="!isCollapse">ALUMNI</span>
              </div>
              <div class="top-logo">
                <div class="top-logo-container"></div>
              </div>
              <el-menu-item index="/homepage">
                <i class="el-icon-share"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="/primary-school">
                <i class="el-icon-location"></i>
                <span slot="title">小学</span>
              </el-menu-item>
              <el-menu-item index="/junior-high-school/junior-over-info">
                <i class="el-icon-menu"></i>
                <span slot="title">初中</span>
              </el-menu-item>
              <el-menu-item index="/senior-high-school/senior-over-info">
                <i class="el-icon-document"></i>
                <span slot="title">高中</span>
              </el-menu-item>
              <el-menu-item index="/university/university-classmate-info">
                <i class="el-icon-setting"></i>
                <span slot="title">大学</span>
              </el-menu-item>
              <el-menu-item index="/forum">
                <i class="el-icon-service"></i>
                <span slot="title">留言区</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="rightSpan" class="right-contanier">
            <div>
              <div class="user-bar">
                <i class="iconfont icon-zhankai1 col-btn" @click="handleColleaspe"></i>
                <div class="timer">{{curTime}}</div>
                <div class="details">
                  <el-popover placement="bottom" width="80" trigger="hover">
                    <ul>
                      <li>
                        <span>
                          <i class="iconfont icon-xiaoren"></i>
                          {{this.curUserInfo && this.curUserInfo.name}}
                        </span>
                      </li>
                      <li @click="imgBoxVisible=true">
                        <i class="el-icon-setting"></i>
                        <a>换头像</a>
                      </li>
                      <li @click="handleLoginOut">
                        <i class="el-icon-back"></i>
                        <a>登出</a>
                      </li>
                    </ul>
                    <img :src="imgUrl" alt="头像" class="portrait-style" slot="reference">
                  </el-popover>
                </div>
              </div>
              <div class="right-view">
                <router-view></router-view>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="foot-copy">曾记同窗日月酣，未忘分道梦魂憨。</div>
    <el-dialog class="portrait-card-box" width="30%" title="头像" :visible.sync="imgBoxVisible">
      <img
        :src="item"
        v-for="(item,index) in portraitArr"
        alt="头像"
        :key="item"
        @click="handleSelectImg(index)"
      >
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isCollapse: false,
      leftSpan: 4,
      rightSpan: 20,
      timer: null,
      curTime: "",
      imgBoxVisible: false,
      portraitArr: [
        "/static/images/portrait-male.png",
        "/static/images/portrait-female.png",
        "/static/images/portrait1.jpg",
        "/static/images/portrait2.jpg",
        "/static/images/portrait3.jpeg",
        "/static/images/portrait4.jpeg",
        "/static/images/portrait5.jpeg",
        "/static/images/portrait6.png",
        "/static/images/home-title.jpg"
      ],
      imageUrl: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo", "curUserInfo"]),
    imgUrl() {
      return this.curUserInfo.portraitUrl || "/static/images/portrait-male.png";
    }
  },
  crerated() {
    const id = window.sessionStorage.getItem("userId");
    if (id) {
      this.getCurUserById(id);
    } else {
      this.$message({
        type: "info",
        message: "获取数据失败"
      });
    }
  },
  mounted() {
    // 可以修改路由
    this.$router.push("/homepage");
    // 使用jquery选中节点
    $(window).resize(() => {
      $(".left-nav").height($(window).height() - 40);
    });
    $(".left-nav").height($(window).height() - 40);
    clearInterval(this.timer);
    this.timer = null;
    this.setTimer();
  },
  destroyed: function() {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    ...mapActions(["changePortraitUrl", "getCurUserById", "toLoginOut"]),
    handleColleaspe() {
      this.isCollapse = !this.isCollapse;
      this.leftSpan = this.isCollapse === true ? 1 : 4;
      this.rightSpan = this.isCollapse === true ? 23 : 20;
    },
    setTimer() {
      let timer = setInterval(() => {
        this.curTime = moment(Date.now()).format("YYYY-MM-DD dddd HH:mm:ss");
      }, 1000);
    },
    handleSelectImg(index) {
      const userId = window.sessionStorage.getItem("userId");
      const params = {
        portraitUrl: this.portraitArr[index],
        id: userId
      };
      this.changePortraitUrl(params)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "更换头像成功"
            });
            this.getCurUserById(userId);
            this.imgBoxVisible = false;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    handleLoginOut() {
      this.toLoginOut();
      this.$router.replace("/login");
    },
    // ----
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  color: #333;
}
.home {
  min-width: 1000px;
  height: 100vh;
  background: url("/static/images/main-bg.jpg") 0 0 no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.left-nav .top-logo {
  background-color: rgba(43, 47, 50, 0.8);
  height: 126px;
  text-align: center;
  color: #fff;
  margin-bottom: 14px;
  overflow: hidden;
}
.top-title {
  padding-left: 10px;
  padding-top: 10px;
  height: 50px;
  color: #fff;
  overflow: hidden;
}
.top-title span {
  font-size: 24px;
  padding-left: 7px;
}
.top-logo {
  background-color: rgb(0, 0, 0);
}
.top-logo-container {
  background: url("/static/images/home-title.jpg") center no-repeat;
  background-size: cover;
  height: inherit;
  opacity: 0.6;
}
.left-nav .menu-list {
  height: 100vh;
  border: none;
}
.left-nav .el-menu-item span {
  margin: 0 14px;
}
.left-nav .el-menu-item {
  background: none !important;
}
.foot-copy {
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  color: #fff;
  position: absolute;
  bottom: 0;
  z-index: 20;
  width: 100%;
}
.user-bar {
  padding: 5px 10px;
  height: 46px;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15) inset;
  background-color: rgba(0, 0, 0, 0.35);
  color: #fff;
}
.user-bar .col-btn {
  font-weight: 600;
  line-height: 36px;
  cursor: pointer;
  margin-left: 20px;
}
.user-bar .timer {
  float: right;
  line-height: 36px;
  padding-right: 30px;
  color: #fff;
}
.user-bar .details {
  float: right;
  margin-right: 10px;
  position: relative;
  text-align: left;
}
.el-popover ul {
  list-style: none;
}
.el-popover ul li {
  padding: 5px 20px;
  text-align: left;
  cursor: pointer;
}
.el-popover ul li i {
  margin-right: 10px;
}
.el-popover ul li:hover {
  background-color: rgba(255, 255, 0, 0.45);
}
.user-bar .details::after {
  content: "";
  display: block;
  width: 1px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 8px;
  transform: skew(-8deg);
}
.user-bar .portrait-style {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 2px;
  vertical-align: middle;
  cursor: pointer;
}
.user-bar .details span {
  padding-right: 10px;
}
.portrait-card-box img {
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.right-contanier {
  height: 100vh;
  background-size: cover;
}
.right-contanier .right-view {
  padding: 20px;
  position: relative;
}
</style>
<style lang="less">
.portrait-card-box {
  .el-dialog__header,
  .el-dialog__body {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>

