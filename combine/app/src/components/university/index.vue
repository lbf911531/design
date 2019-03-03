<template>
   <div class="university">
    <div class="quote">乘风破浪会有时，直挂云帆济沧海</div>
    <div class="divide-line"></div>
    <el-tabs v-model="universityActive" type="card" @tab-click="handleClick">
      <el-tab-pane label="同学" name="university-classmate-info"></el-tab-pane>
      <el-tab-pane label="系友" name="university-department-info"></el-tab-pane>
      <el-tab-pane label="校友" name="university-school-info"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      universityActive: 'university-classmate-info'
    }
  },
  methods: {
    handleClick(tab,event){
      this.$router.push('/university/'+tab.name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .quote{
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      border: 1px solid #EBEBEB;
      margin: 0 0 10px 0;
      padding: 0 20px;
      background-color: #FAFAFA;
      color: #F0C863;
   }
   .divide-line{
      height: 1px;
      box-sizing: border-box;
      border-bottom: 1px solid #FAFAFA;
      margin-bottom: 10px;
   }
</style>
