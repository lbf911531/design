<template>
  <div class="juniorHighSchool">
    <div class="quote">路漫漫其修远兮，吾将上下而求索</div>
    <div class="divide-line"></div>
    <el-card>
      <el-tabs v-model="seniorActive" type="card" @tab-click="handleClick">
        <el-tab-pane label="同班同学" name="senior-over-info"></el-tab-pane>
        <el-tab-pane label="深交好友" name="senior-friends-info"></el-tab-pane>
        <el-tab-pane label="同级同友" name="senior-other-info"></el-tab-pane>
        <el-tab-pane label="与师为友" name="senior-teachers-info"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seniorActive: "senior-over-info"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("/senior-high-school/" + tab.name);
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
