<template>
   <div class="juniorHighSchool">
 		<div class="quote">恰同学少年，风华正茂</div>
		<div class="divide-line"></div>
    <el-tabs v-model="juniorActive" type="card" @tab-click="handleClick">
	    <el-tab-pane label="集体信息" name="junior-over-info"></el-tab-pane>
	    <el-tab-pane label="好友信息" name="junior-friends-info"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
   </div>
</template>

<script>
export default {
	data() {
		return {
			juniorActive: 'junior-over-info'
		}
	},
  methods: {
  	handleClick(tab,event){
  		this.$router.push('/junior-high-school/'+tab.name);
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
