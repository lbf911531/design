<template>
  <div class="homepage">
    <el-row class="top-row">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div class="userInfo">
            <el-row>
              <el-col :span="8">用户名：</el-col>
              <el-col :span="14">{{this.userInfo&& this.userInfo.name ? this.userInfo.name : '-'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">权限：</el-col>
              <el-col :span="14">
                <el-tag
                  type="danger"
                  size="mini"
                >{{this.userInfo&& this.userInfo.permission ? (this.userInfo.permission === 'admin' ? '管理员' : '普通用户') : '-'}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">性别：</el-col>
              <el-col
                :span="14"
              >{{this.userInfo&& this.userInfo.gender ? this.userInfo.gender : '-'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">联系电话：</el-col>
              <el-col :span="14">{{this.userInfo&& this.userInfo.phone ? this.userInfo.phone : '-'}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">{{item}}</el-carousel-item>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {},
  methods: {}
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
.userInfo{
  line-height: 24px;
}
</style>
