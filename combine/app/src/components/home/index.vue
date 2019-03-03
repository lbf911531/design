<template>
	<div class="home">
		<div class="contenter">
			<div>
				<el-row>
		  		<el-col :span="4" class="left-nav">
		  			<div class="top-tip">
		  				logo
		  			</div>
		  			<el-menu 
		  				router default-active="/homepage" 
		  				class="el-menu-vertical-demo"
	  				 	background-color="#545c64"
      				text-color="#fff"
      				active-text-color="#ffd04b"
    				>
                <el-menu-item index="/homepage">
                    <i class="el-icon-share"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
				        <el-menu-item index="/primary-school">
						        <i class="el-icon-location"></i>
						        <span slot="title">小学</span>
						    </el-menu-item>
						    <el-menu-item index="/junior-high-school/junior-over-info">
						        <i class="el-icon-menu"></i>
						        <span slot="title">初中</span>
						    </el-menu-item>
						    <el-menu-item index="/senior-high-school/senior-over-info">
						        <i class="el-icon-document"></i>
						        <span slot="title">高中</span>
						    </el-menu-item>
						    <el-menu-item index="/university/university-classmate-info">
						        <i class="el-icon-setting"></i>
						        <span slot="title">大学</span>
						    </el-menu-item>
						     <el-menu-item index="/forum">
						        <i class="el-icon-service"></i>
						        <span slot="title">论坛</span>
						    </el-menu-item>
				    	</el-menu>
			        </el-col>
			        <el-col :span="20">
                <div>
                  <div class="user-bar"></div>
                  <div class="right-view">
                    <router-view></router-view>
                  </div> 
                </div>
			       </el-col>
		      </el-row>
			</div>
		</div>
		<div class="foot-copy">
			曾记同窗日月酣，未忘分道梦魂憨。
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
	data() {
		return {
		}
	},
	mounted(){
	  	// 可以修改路由
	  	this.$router.push('/homepage');
	  	// 使用jquery选中节点
	  	$(window).resize(()=>{
	  		$('.left-nav').height($(window).height()-40);
	  	})
	  	$('.left-nav').height($(window).height()-40);
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   div{
 	    color: #333;
   }
   .home{
      /*background: url('../../images/bg.jpg') 0 0 no-repeat;*/
      background-size: cover;
   }
   .top-tip{
   		background-color: rgba(43,47,50,0.8);
   		height: 100px;
   		text-align: center;
   		color: #fff;
   }
   .left-nav ul{
      height: 90%;
      border: none;
   }
   .left-nav .el-menu-item i{
   	 	margin: 0 10px;
   }
   .foot-copy{
 	    line-height: 40px;
 	    text-align: center;
 	    font-size: 18px;
 	    background-color: rgba(7,161,103,0.7); 
 	    position: absolute;
 	    bottom: 0;
 	    z-index: 20;
 	    width: 100%;
   }
   .user-bar{
      padding: 5px 10px;
      height: 46px;
      box-sizing: border-box;
      box-shadow: 0px 0px 5px #000 inset;
      background-color: #fff;
   }
   .right-view{
 	    padding: 20px;
   }
</style>
