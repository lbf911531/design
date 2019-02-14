<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body,ul,li,p,th,td{
  margin: 0;
  padding: 0;
}
.option-div{
  margin-bottom: 10px;
}
.option-div .el-input{
  width: 240px;
}
.option-div button{
  float: right;
  margin-right:10px;
}
</style>
