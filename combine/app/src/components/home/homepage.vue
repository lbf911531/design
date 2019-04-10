<template>
  <div class="homepage">
    <el-row class="top-row">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              {{item}}
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card></el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style scoped>
.top-row {
  height: 300px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
