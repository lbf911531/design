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
                <span slot="title">论坛</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="rightSpan" class="right-contanier">
            <div>
              <div class="user-bar">
                <i class="iconfont icon-zhankai1 col-btn" @click="handleColleaspe"></i>
                <div class="timer">{{curTime}}</div>
                <div class="details">
                  <img src="/static/images/portrait-male.png" alt="头像" class="portrait-style">
                  <span>{{this.userInfo && this.userInfo.name}}</span>
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
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
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
    handleColleaspe() {
      this.isCollapse = !this.isCollapse;
      this.leftSpan = this.isCollapse === true ? 1 : 4;
      this.rightSpan = this.isCollapse === true ? 23 : 20;
    },
    setTimer() {
      let timer = setInterval(() => {
        this.curTime = moment(Date.now()).format("YYYY-MM-DD dddd HH:mm:ss");
      }, 1000);
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
  height: 100vh;
  background: url("/static/images/main-bg.jpg") 0 0 no-repeat;
  background-size: cover;
}
.left-nav .top-logo {
  background-color: rgba(43, 47, 50, 0.8);
  height: 126px;
  text-align: center;
  color: #fff;
  margin-bottom: 14px;
}
.top-title {
  padding-left: 10px;
  padding-top: 10px;
  height: 50px;
  color: #fff;
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
  color: #fff;
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
  margin: 2px;
  vertical-align: middle;
  cursor: pointer;
}
.user-bar .details span {
  padding-right: 10px;
}
.right-contanier {
  height: 100vh;
  background-size: cover;
}
.right-contanier .right-view {
  padding: 20px;
}
</style>
