<template>
  <div class="register">
    <div class="register-container">
      <h1>Sign up, please!</h1>
      <div class="register-box">
        <el-steps :active="activeStep" finish-status="success" simple>
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
        <el-form ref="registerForm" :model="registerForm" label-width="80px">
          <div class="basic-info" v-if="activeStep === 0">
            <!-- 昵称，用户名等 -->
            <el-form-item label="姓名">
              <el-input v-model="registerForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="registerForm.user" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="basic" v-if="activeStep === 1">
            <!-- 密码，确认密码，图形验证码 -->
            <el-form-item label="密码">
              <el-input type="password"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                placeholder="请输入验证码"
                v-model="registerForm.checkCode"
                prefix-icon="el-icon-picture"
              >
                <a @click="changeCaptcha" slot="append">
                  <img :src="srcUrl" alt="captcha" ref="imgYzm">
                </a>
              </el-input>
            </el-form-item>
          </div>
          <div class="after-register" v-if="activeStep === 2 ">
            <!-- 注册成功后 -->
          </div>
        </el-form>
        <div class="register-btn-box">
          <el-button type="primary" round @click="handleToLogin" v-if="activeStep === 0">返回登录页</el-button>
          <el-button type="info" round @click="preStep" v-if="activeStep === 1">上一步</el-button>
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
      baseUrl: "http://127.0.0.1:3000",
      srcUrl: "http://127.0.0.1:3000/user/getCaptcha",
      registerForm: {}
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
      this.srcUrl = this.baseUrl + "/user/getCaptcha?d=" + Math.random();
    },
    // 注册成功
    handleRegister() {}
  }
};
</script>
<style lang="less" scoped>
.register {
  background: url("/static/images/skin2.jpg") 0 0 no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  .register-container {
    h1 {
      font: bold 36px Cambria, "Hoefler Text", serif;
      margin-top: 30px;
      color: #71564b;
      text-align: center;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
    }
    .register-box {
      width: 600px;
      height: auto;
      margin: 50px auto 0;
      overflow: hidden;
      padding: 40px;
      box-shadow: 0 -5px 5px #0d957a;
      border-radius: 5px;
    }
  }
}
</style>



