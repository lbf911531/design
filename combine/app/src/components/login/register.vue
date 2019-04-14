<template>
  <div class="register">
    <div class="register-container">
      <h1>Sign up, please!</h1>
      <div class="register-box">
        <div class="hand"></div>
        <el-steps :active="activeStep" finish-status="success" simple>
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="设置密码" icon="el-icon-upload"></el-step>
          <el-step title="完成注册" icon="el-icon-news"></el-step>
        </el-steps>
        <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px">
          <div class="basic-info" v-if="activeStep === 0">
            <!-- 昵称，用户名等 -->
            <el-form-item label="姓名" prop="name">
              <el-col :span="16">
                <el-input v-model="registerForm.name" autocomplete="off" size="small"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="账号" prop="user">
              <el-col :span="16">
                <el-input v-model="registerForm.user" autocomplete="off" size="small"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-col :span="16">
                <el-radio-group v-model="registerForm.gender" size="small">
                  <el-radio-button label="男">我是 男孩纸</el-radio-button>
                  <el-radio-button label="女">我是 女孩纸</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-col :span="16">
                <el-input
                  v-model="registerForm.phone"
                  autocomplete="off"
                  size="small"
                  placeholder="请留下你的联系电话"
                ></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="basic" v-if="activeStep === 1">
            <!-- 密码，确认密码，图形验证码 -->
            <el-form-item label="密码" prop="password">
              <el-col :span="16">
                <el-input type="password" v-model="registerForm.password" size="small"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpassword">
              <el-col :span="16">
                <el-input type="password" v-model="registerForm.checkpassword" size="small"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode">
              <el-col :span="16">
                <el-input
                  placeholder="请输入验证码"
                  v-model="registerForm.checkCode"
                  prefix-icon="el-icon-picture"
                >
                  <a @click="changeCaptcha" slot="append">
                    <img :src="srcUrl" alt="captcha" ref="imgYzm">
                  </a>
                </el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="after-register" v-if="activeStep === 2 ">
            <!-- 注册成功后 -->
            <div class="el-icon-success success-icon"></div>
            <h3>恭喜你，注册成功!!</h3>
            <h3>
              请点击
              <el-button type="text" @click="handleToLogin">这里</el-button>前往登录页面
            </h3>
            <el-button type="success re-signup-btn" @click="handleReSignUp">再次注册</el-button>
          </div>
        </el-form>
        <div class="register-btn-box">
          <el-button
            type="primary"
            size="small"
            @click="handleToLogin"
            v-if="activeStep === 0"
            icon="el-icon-back"
          >返回</el-button>
          <el-button type="info" size="small" @click="preStep" v-if="activeStep === 1">上一步</el-button>
          <el-button type="info" size="small" @click="nextStep" v-if="activeStep === 0">下一步</el-button>
          <el-button
            type="success"
            size="small"
            @click="handleRegister('registerForm')"
            v-if="activeStep === 1"
          >去注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkpassword !== "") {
          this.$refs.registerForm.validateField("checkpassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validataCode = (rule, value, callback) => {
      if(value === "") {
        callback(new Error("请输入验证码"));
      } else {
        const code = document.cookie.split('=')[1];
        if(code !== value) callback(new Error("验证码不正确"));
      }
    };
    return {
      activeStep: 0,
      baseUrl: "http://127.0.0.1:3000",
      srcUrl: "http://127.0.0.1:3000/user/getCaptcha",
      registerForm: {
        user: "",
        password: "",
        checkpassword: "",
        permission: "normal", // 权限
        portraitUrl: "/static/images/portrait-male.png"
      },
      _registerForm: {}, // 表单副本，用于重置
      rules: {
        user: [{ required: true, trigger: "blur", message: "请输入" }],
        name: [{ required: true, trigger: "blur", message: "请输入" }],
        gender: [{ required: true, trigger: "blur", message: "请输入" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
        checkCode: [{ validator: validataCode, trigger: "blur" }]
      }
    };
  },
  created() {
    this.changeCaptcha();
    this._registerForm = { ...this.registerForm };
  },
  methods: {
    ...mapActions(["toRegister"]),
    // 上一步
    preStep() {
      if (this.activeStep-- < 0) this.activeStep = 0;
      this.$refs.registerForm.clearValidate();
    },
    // 下一步
    nextStep() {
      if (this.activeStep++ > 2) this.activeStep = 2;
      this.$refs.registerForm.clearValidate();
    },
    // 返回登录页
    handleToLogin() {
      this.$router.replace("/login");
    },
    // 刷新验证码
    changeCaptcha() {
      this.srcUrl = this.baseUrl + "/user/getCaptcha?d=" + Math.random();
    },
    //密码加密
    encryption(password) {
      let md5 = this.$crypto.createHash("md5");
      password = String(password) + "+1";
      let cryptoPwd = md5.update(password, "utf-8").digest("hex");
      return cryptoPwd;
    },
    // 注册成功
    handleRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message({
            type: "error",
            message: "您输入的数据存在与规则不匹配的情况，请校验！！"
          });
          return;
        }
        const params = { ...this.registerForm };
        params.password = this.encryption(params.password);
        params.checkpassword = params.password;
        params.portraitUrl =
          params.gender === "男"
            ? params.portraitUrl
            : "/static/images/portrait-female.png";
        this.toRegister(params)
          .then(res => {
            if (res.status === 200) {
              this.activeStep = 2;
              this.registerForm = {};
            } else if (res.status === 500) {
              this.$message({ type: "error", message: res });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err
            });
          });
      });
    },
    handleReSignUp() {
      this.registerForm = { ...this._registerForm };
      this.activeStep = 0;
    }
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
      padding: 40px;
      box-shadow: 0 -5px 5px #0d957a;
      border-radius: 5px;
      position: relative;
      .hand {
        background: url("/static/images/register-logo.png");
        position: absolute;
        width: 211px;
        height: 108px;
        top: 100px;
        left: -156px;
        transform: rotate(-90deg);
      }
      .hand::before,
      .hand::after {
        content: "";
        display: block;
        width: 34px;
        height: 34px;
        border-radius: 40px;
        background-color: #472d20;
        transform: scaleY(0.6);
        position: absolute;
        top: 86px;
      }
      .hand::before {
        left: 24px;
      }
      .hand::after {
        left: 154px;
      }
      .el-form {
        padding: 20px 30px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 0 0 5px 5px;
        .after-register {
          div.success-icon {
            font-size: 50px;
          }
          h3 {
            padding-left: 80px;
            .el-button {
              font-size: 1.17em;
              margin: 0 14px;
            }
          }
          .re-signup-btn {
            float: right;
            margin: 10px 10px 0 0;
          }
          &::after {
            content: "";
            display: block;
            clear: both;
          }
        }
        .el-radio-button {
          margin-right: 10px;
        }
      }
      .register-btn-box {
        margin-top: 14px;
        text-align: center;
        .el-button {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.register-box {
  .el-form-item__label {
    color: #fff;
  }
}
</style>




