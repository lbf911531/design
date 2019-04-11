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
export default {
  data() {
    return {
      isCollapse: false,
      leftSpan: 4,
      rightSpan: 20,
    };
  },
  mounted() {
    // 可以修改路由
    this.$router.push("/homepage");
    // 使用jquery选中节点
    $(window).resize(() => {
      $(".left-nav").height($(window).height() - 40);
    });
    $(".left-nav").height($(window).height() - 40);
  },
  methods: {
    handleColleaspe() {
      this.isCollapse = ! this.isCollapse;
      this.leftSpan = this.isCollapse === true ? 1 : 4;
      this.rightSpan = this.isCollapse === true ? 23 : 20;
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
  background: url("../../images/main-bg.jpg") 0 0 no-repeat;
  background-size: cover;
}
.left-nav .top-logo {
  background-color: rgba(43, 47, 50, .8);
  height: 100px;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}
.top-logo {
  background-color: rgb(0,0,0);
}
.top-logo-container {
  background: url("../../images/logo.png") center no-repeat;
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
  background-color: rgba(0,0,0,.35);
}
.user-bar .col-btn {
  font-weight: 600;
  line-height: 36px;
  cursor: pointer;
  color: #fff;
  margin-left: 20px;
}
.right-contanier {
  height: 100vh;
  /* background: url("../../images/bg.jpg") 0 0 no-repeat; */
  background-size: cover;
}
.right-contanier .right-view{
  padding: 20px;
}
</style>
