<template>
  <div class="login">
    <div class="login-table">
      <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="user">
          <el-input
            v-model="loginForm.user"
            autocomplete="off"
            prefix-icon=""
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            @keyup.enter.native="handleLogin('loginForm')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn-div">
        <el-button
          type="primary"
          @click="handleLogin('loginForm')"
          :loading="isLoading"
          class="login-btn"
        >登录</el-button>
      </div>
      <div class="help">
        <el-button
          type="text"
          @click="handleRegister"
        >注册</el-button>
        <el-button
          type="text"
          @click="findPassword"
        >忘记密码 ?</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
      loginForm: {},
      rules:{
        user: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions(['toLogin']),
    //密码加密
    encryption(password) {
      let md5 = this.$crypto.createHash("md5");
      password = String(password)+'+1';
      let cryptoPwd =  md5.update(password,"utf-8").digest("hex");
      return cryptoPwd;
    },
    //登录
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.isLoading = true;
          let params = {
            user: this.loginForm.user,
            password: this.encryption(this.loginForm.password)
          }
          this.toLogin(params)
            .then(res => {
              this.isLoading = false;
              if(res === true) {
                this.$router.push('/homepage');
                console.log(1);
              }
            })
            .catch(err => {
              this.isLoading = false;
              this.$message.error({
                title: '失败',
                message: err
              });
            })
        } else {
          this.isLoading = false;
          this.$message.error({
            title: '失败',
            message: '账号或密码不对'
          });
          return false;
        }
      })
    },
    findPassword() {
      this.$router.replace('/findMyPwd');
    },
    handleRegister() {}
  }
}
</script>
<style scoped>
  .login{
    position: relative;
    height: 100vh;
    background: url('../../images/56.jpg') 0 0 no-repeat;
    background-size: cover;
  }
  .login-table{
    width: 400px;
    position: absolute;
    top: 40%;
    right: 10%;
    box-sizing: border-box;
    padding: 10px;
  }
  .login-btn-div{
    box-sizing: border-box;
    padding: 10px 0 0 80px;
  }
  .login-btn{
    width: 100%;
  }
  .help{
    padding-left: 80px;
  }
  .help > .el-button:first-child{
    float: left;
  }
  .help > .el-button:last-child{
    float: right;
  }
</style>
