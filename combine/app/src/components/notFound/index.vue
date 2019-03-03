<template>
  <div class="not-found">
    <div class="err-container">
      <div class="err-img"></div>
      <div class="err-info">
        <p>哎呀，您访问的页面走丢了</p>
        <el-button @click="returnToHome" icon="el-icon-back">返回首页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
       
      }
    },
    methods: {
      returnToHome() {
        this.$router.replace('/homepage');
      }
    }
  }
</script>
</script>
<style scoped>
  .not-found{
    height: 100vh;
  }
  .err-container{
    width: 960px;
    height: inherit;
    margin: 0 auto;
  }
  .err-container::after{
    content: "";
    display: block;
    clear: both;
  } 
  .err-img{
    background: url('../../images/404.jpg') 0 0 no-repeat;
    background-size: cover;
    width: 560px;
    height: 540px;
    float: left;
  }
  .err-info{
    box-sizing: border-box;
    float: right;
    padding-top: 200px;
  }
  .err-info > p{
    font-size: 2em;
  }
  .err-info .el-button{
    margin-top: 30px;
    color: #fff;
    background-color: #89bf43;
  }
</style>