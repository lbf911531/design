<template>
  <div class="login">
    <div class="login-container" id="login-container">
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
      <canvas id="canvas"></canvas>
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
  mounted() {
    /**
     *3D海洋效应与 Canvas2D
     * 您可以更改注释 "效果属性" 下的属性
     */

    // Init Context
    let c = document.createElement("canvas").getContext("2d");
    let postctx = document.getElementById('canvas')
      .getContext("2d");
    let canvas = c.canvas;
    let vertices = [];

    // Effect Properties
    let vertexCount = 7000;
    let vertexSize = 3;
    let oceanWidth = 204;
    let oceanHeight = -80;
    let gridSize = 32;
    let waveSize = 16;
    let perspective = 100;

    // Common variables
    let depth = (vertexCount / oceanWidth) * gridSize;
    let frame = 0;
    let { sin, cos, tan, PI } = Math;

    // Render loop
    let loop = () => {
      let rad = (sin(frame / 100) * PI) / 20;
      let rad2 = (sin(frame / 50) * PI) / 10;
      frame++;
      if (
        postctx.canvas.width !== postctx.canvas.offsetWidth ||
        postctx.canvas.height !== postctx.canvas.offsetHeight
      ) {
        postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth;
        postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight;
      }

      c.fillStyle = `hsl(200deg, 100%, 2%)`;
      c.fillRect(0, 0, canvas.width, canvas.height);
      c.save();
      c.translate(canvas.width / 2, canvas.height / 2);

      c.beginPath();
      vertices.forEach((vertex, i) => {
        let ni = i + oceanWidth;
        let x = vertex[0] - (frame % (gridSize * 2));
        let z =
          vertex[2] -
          ((frame * 2) % gridSize) +
          (i % 2 === 0 ? gridSize / 2 : 0);
        let wave =
          cos(frame / 45 + x / 50) -
          sin(frame / 20 + z / 50) +
          sin(frame / 30 + (z * x) / 10000);
        let y = vertex[1] + wave * waveSize;
        let a = Math.max(0, 1 - Math.sqrt(x ** 2 + z ** 2) / depth);
        let tx, ty, tz;

        y -= oceanHeight;

        // Transformation variables
        tx = x;
        ty = y;
        tz = z;

        // Rotation Y
        tx = x * cos(rad) + z * sin(rad);
        tz = -x * sin(rad) + z * cos(rad);

        x = tx;
        y = ty;
        z = tz;

        // Rotation Z
        tx = x * cos(rad) - y * sin(rad);
        ty = x * sin(rad) + y * cos(rad);

        x = tx;
        y = ty;
        z = tz;

        // Rotation X

        ty = y * cos(rad2) - z * sin(rad2);
        tz = y * sin(rad2) + z * cos(rad2);

        x = tx;
        y = ty;
        z = tz;

        x /= z / perspective;
        y /= z / perspective;

        if (a < 0.01) return;
        if (z < 0) return;

        c.globalAlpha = a;
        c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 50%)`;
        c.fillRect(
          x - (a * vertexSize) / 2,
          y - (a * vertexSize) / 2,
          a * vertexSize,
          a * vertexSize
        );
        c.globalAlpha = 1;
      });
      c.restore();

      // Post-processing
      postctx.drawImage(canvas, 0, 0);

      postctx.globalCompositeOperation = "screen";
      postctx.filter = "blur(16px)";
      postctx.drawImage(canvas, 0, 0);
      postctx.filter = "blur(0)";
      postctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(loop);
    };

    // Generating dots
    for (let i = 0; i < vertexCount; i++) {
      let x = i % oceanWidth;
      let y = 0;
      let z = (i / oceanWidth) >> 0;
      let offset = oceanWidth / 2;
      vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize]);
    }

    loop();
  },
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
              if (res.flag === true) {
                this.$router.push("/homepage");
              }
            })
            .catch(err => {
              this.isLoading = false;
              this.$message.error({
                title: "失败",
                message: err+'或是账号或密码不正确'
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
      this.$router.push("/register");
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
  width: 30vw;
  height: 40vh;
  top: 20%;
  left: 10%;
  background: url("../../images/login-logo.png") center no-repeat;
  background-size: 100% 100%;
  z-index: 5;
}
.login-table {
  width: 340px;
  height: 300px;
  position: absolute;
  top: 30%;
  right: 12%;
  box-sizing: border-box;
  padding: 10px;
  z-index: 100;
}
.login-table-outer,
.login-table-inner {
  background-color: rgb(255, 255, 255);
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
.login-table-title::after {
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
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
