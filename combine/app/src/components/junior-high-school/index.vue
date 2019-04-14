<template>
  <div class="juniorHighSchool">
    <div class="quote">恰同学少年，风华正茂</div>
    <div class="divide-line"></div>
    <el-card>
      <el-tabs v-model="juniorActive" type="card" @tab-click="handleClick">
        <el-tab-pane label="集体信息" name="junior-over-info"></el-tab-pane>
        <el-tab-pane
          label="好友信息"
          name="junior-friends-info"
          v-if="this.curUserInfo.permission === 'admin'"
        ></el-tab-pane>
        <el-tab-pane
          label="黑名单"
          name="junior-blacklist"
          v-if="this.curUserInfo.permission === 'admin'"
        ></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      juniorActive: "junior-over-info"
    };
  },
  computed: {
    ...mapGetters(["curUserInfo"])
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("/junior-high-school/" + tab.name);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quote {
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  margin: 0 0 10px 0;
  padding: 0 20px;
  background-color: #fafafa;
  color: #f0c863;
}
.divide-line {
  height: 1px;
  box-sizing: border-box;
  border-bottom: 1px solid #fafafa;
  margin-bottom: 10px;
}
</style>
