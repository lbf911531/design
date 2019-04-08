<template>
  <div class="login">
    <div class="login-container">
      <div class="login-logo"></div>
      <div class="login-table">
        <div class="login-table-outer">
          <div class="login-table-inner">
            <div class="login-table-title">欢迎登录login</div>
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-form-item prop="user">
                <el-input
                  v-model="loginForm.user"
                  autocomplete="off"
                  prefix-icon="iconfont icon-xiaoren"
                  placeholder="请输入账号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  autocomplete="off"
                  @keyup.enter.native="handleLogin('loginForm')"
                  prefix-icon="iconfont icon-ai-password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="login-btn-div">
              <el-button
                type="primary"
                @click="handleLogin('loginForm')"
                :loading="isLoading"
                class="login-btn"
              >登 录</el-button>
            </div>
            <div class="help">
              <el-button type="text" @click="handleRegister">
                注册
                <i class="iconfont icon-zhuce"></i>
              </el-button>
              <el-button type="text" @click="findPassword">
                忘记密码 ?
                <i class="iconfont icon-wangjimima"></i>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loginForm: {},
      rules: {
        user: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      isLoading: false
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["toLogin"]),
    //密码加密
    encryption(password) {
      let md5 = this.$crypto.createHash("md5");
      password = String(password) + "+1";
      let cryptoPwd = md5.update(password, "utf-8").digest("hex");
      return cryptoPwd;
    },
    //登录
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true;
          let params = {
            user: this.loginForm.user,
            password: this.encryption(this.loginForm.password)
          };
          this.toLogin(params)
            .then(res => {
              this.isLoading = false;
              if (res === true) {
                this.$router.push("/homepage");
              }
            })
            .catch(err => {
              this.isLoading = false;
              this.$message.error({
                title: "失败",
                message: err
              });
            });
        } else {
          this.isLoading = false;
          this.$message.error({
            title: "失败",
            message: "账号或密码不对"
          });
          return false;
        }
      });
    },
    findPassword() {
      this.$router.push("/findMyPwd");
    },
    handleRegister() {
      this.$router.push('/register');
    }
  }
};
</script>
<style scoped>
.login {
  height: 100vh;
  background: url("../../images/login-bg.jpg") 0 0 no-repeat;
  background-size: cover;
}
.login-container {
  position: relative;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.login-logo {
  position: absolute;
  width: 26%;
  height: 240px;
  top: 20%;
  left: 10%;
  background: url("../../images/login-logo.png") 0 0 no-repeat;
  /* background-size: cover; */
}
.login-table {
  width: 340px;
  height: 300px;
  position: absolute;
  top: 30%;
  right: 12%;
  box-sizing: border-box;
  padding: 10px;
  z-index: 3;
}
.login-table-outer,.login-table-inner {
  background-color: rgb(255,255,255);
  width: inherit;
  height: inherit;
}
.login-table-outer {
  transform: rotate(4deg);
}
.login-table-inner {
  transform: rotate(-4deg);
  padding: 0 20px;
}
.login-table-title {
  padding: 10px 0;
}
.login-table-title::after{
  content: "";
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  width: 90%;
}

div.el-input.el-input--prefix > span.el-input__prefix {
  left: 10px;
}
.login-btn {
  width: 100%;
}
.help::after {
  content: "";
  display: block;
  clear: both;
}
.help .el-button {
  font-weight: 800;
}
.help > .el-button:first-child {
  float: left;
}
.help > .el-button:last-child {
  float: right;
}
</style>
