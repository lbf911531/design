<template>
  <div class="register">
    <div class="register-container">
      <div class="fog-img animation-fog-one"></div>
      <div class="fog-img animation-fog-two"></div>
      <div class="register-box">
        <el-steps :active="activeStep" finish-status="success" simple>
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
        <div class="basic-info" v-if="activeStep === 0">
          <!-- 昵称，用户名等 -->
        </div>
        <div class="basic" v-if="activeStep === 1">
          <!-- 密码，确认密码，图形验证码 -->
          <el-input placeholder="请输入验证码" prefix-icon="el-icon-picture">
            <a @click="changeCaptcha" slot="append">
              <img :src="srcUrl" alt="captcha" ref="imgYzm" />
            </a>
          </el-input>
        </div>
        <div class="after-register" v-if="activeStep === 2 ">
          <!-- 注册成功后 -->
        </div>
        <div class="register-btn-box">
          <el-button type="primary" round @click="handleToLogin" v-if="activeStep === 0">返回登录页</el-button>
          <el-button
            type="info"
            round
            @click="preStep"
            v-if="activeStep === 1"
          >上一步</el-button>
          <el-button type="info" round @click="nextStep" v-if="activeStep === 0">下一步</el-button>
          <el-button type="success" round @click="handleRegister" v-if="activeStep === 1">注册</el-button>
          <el-button type="success" round @click="handleToLogin" v-if="activeStep === 2">跳转至登录页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 0,
      baseUrl: 'http://127.0.0.1:3000',
      srcUrl: 'http://127.0.0.1:3000/user/getCaptcha',
    };
  },
  created() {
    this.changeCaptcha();
  },
  methods: {
    // 上一步
    preStep() {
      if (this.activeStep-- < 0) this.activeStep = 0;
    },
    // 下一步
    nextStep() {
      if (this.activeStep++ > 2) this.activeStep = 2;
    },
    // 返回登录页
    handleToLogin() {
      this.$router.replace("/login");
    },
    changeCaptcha() {
      this.srcUrl = this.baseUrl+'/user/getCaptcha?d='+Math.random();
    },
    // 注册成功
    handleRegister() {}
  }
};
</script>
<style lang="less" scoped>
.register {
  background: url("../../images/register-bg.jpg") 0 0 no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  .register-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .fog-img {
      position: absolute;
      height: 100vh;
      width: 300vw;
    }
    .animation-fog-one {
      background: url("../../images/register-fog1.png") repeat-x;
      background-size: contain;
      background-position: center;
      animation: marquee 60s linear infinite;
    }
    .animation-fog-two {
      background: url("../../images/register-fog2.png") repeat-x;
      background-size: contain;
      background-position: center;
      animation: marquee 40s linear infinite;
    }
    .register-box {
      position: absolute;
      z-index: 100;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: auto;
      overflow: hidden;
      padding: 40px;
      box-shadow: 0 -15px 30px #0d957a;
      border-radius: 5px;
    }

    @keyframes marquee {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-200vw, 0, 0);
      }
    }
  }
}
</style>



