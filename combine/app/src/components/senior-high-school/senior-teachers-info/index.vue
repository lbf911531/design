<template>
 	<div class="juniorOverInfo">
 	  <div class="option-div">
			<el-input
				v-model="searchName"
				placeholder="请输入姓名"
				clearable
				suffix-icon="el-icon-search"
			></el-input>
      <el-select v-model="searchSex" placeholder="请选择性别" clearable>
        <el-option label='男' value="男"></el-option>
        <el-option label='女' value="女"></el-option>
      </el-select>
			<el-button  type="primary" round @click="openDialogToAdd">新 增</el-button>
		</div>
		<el-table
      :data="dataSource"
      v-loading="loading"
      stripe
      style="width: 100%"
      border
      max-height='360'
    >
	    <el-table-column prop="name" label="姓名" align="center">
	    </el-table-column>
	    <el-table-column prop="age" label="年龄" align="center">
			</el-table-column>
			<el-table-column prop="gender" label="性别" align="center">
	    </el-table-column>
      <el-table-column prop="phone" label="电话" align="center">
      </el-table-column>
	    <el-table-column prop="subject" label="教学学科" align="center">
	    	<template slot-scope="scope">
	    		<el-tag
	    			type='primary'
          	disable-transitions
        	>
        		{{scope.row.subject}}
        	</el-tag>
	    	</template>
	    </el-table-column>
			<el-table-column label="操作" align="center">
	      <template slot-scope="scope">
	        <el-button
	        	size="mini"
	        	type="text"
	        	@click="handleEdit(scope.$index, scope.row)"
        	  icon="el-icon-edit"
      	  >编辑</el-button>
	      </template>
	    </el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="formVisible">
		  <el-form :model="form" :rules="rules" ref="form">
		    <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
	    	 	<el-col :span="14">
						<el-input
							v-model="form.name"
							autocomplete="off"
							:disabled="this.form.name && this.form.id ? true : false"
						></el-input>
					</el-col>
				</el-form-item>
		   	<el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
				    <el-radio-group v-model="form.gender">
				      <el-radio label="男"></el-radio>
				      <el-radio label="女"></el-radio>
				    </el-radio-group>
				</el-form-item>
        <el-form-item label="年龄:" prop="age" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input
              v-model="form.age"
              autocomplete="off"
              disabled
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话:" prop="phone" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input
              v-model="form.phone"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="教学学科" prop="subject" :label-width="formLabelWidth">
          <el-col :span='14'>
            <el-select v-model="form.subject" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancleDialog">取 消</el-button>
        <el-button type="success" @click="verifySaveData('form')">保 存</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import moment from 'moment';

export default {
	data() {
		return {
			loading: false,
		 	dataSource: [{
		 		id: '1001',
		 		name: 'test',
		 		age: 16,
		 		gender: '男',
		 	}], //表格数据源
		 	searchName: '',  //查询字符串
      searchSex: '',
		 	dialogTitle: '新增教师信息',  //模态框标题
		 	formVisible: false, // 模态框可见
		 	form: {}, //表单数据
      formLabelWidth: "100px",
      rules: {
      	name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        age: [
          { pattern: /^[1-9]+[0-9]{1,2}$/, message: '年龄为正整数', trigger: 'blur' }
        ],
        phone: [
          { type: 'number', message: '电话号必须为数字值', trigger: 'blur'},
          { pattern: /^\d{11}$/, message: '电话号码为十一位数', trigger: 'blur' }
        ]
      },
      subjectOptions: [
        {
          value: 'Chinese语文',
          label: '语文'
        },{
          value: 'Math数学',
          label: '数学'
        },{
          value: 'English英语',
          label: '英语'
        },{
          value: 'Physics物理',
          label: '物理'
        },{
          value: 'Chemistry化学',
          label: '化学'
        },{
          value: 'Biology生物',
          label: '生物'
        },{
          value: 'Geography地理',
          label: '地理'
        },{
          value: 'History历史',
          label: '历史'
        },{
          value: 'Politics政治',
          label: '政治'
        },
      ]
		}
	},
	computed: {
    // ...mapGetters(['primarys']),
   // 	priamryList() {
 	 //    const that = this;
			// return this.primarys.filter(function(item){
			// 	if(item.name){
			// 		return item.name.indexOf(that.searchName) !== -1 && item.sex.indexOf(that.searchSex) !== -1;
			// 	}	else return false;
			// });
   //  }
	},
	created() {
		// this.loading = true;
		// const that = this;
		// this.findAllJuniorOverData()
		//   .then(data => {
		//   	that.loading = false;
		//   })
		//   .catch(err => {
		//   	that.loading = false;
		//   		that.$message.error({
  //         message: '获取数据失败:'+err,
  //       });
		//   })
	},
	methods: {
		...mapActions(['findAllJuniorOverData','saveOrEditJuniorData']),
    //打开新增模态框
		openDialogToAdd() {
		 	this.form = {
		 	  gender: '男',
        age: 0,
		 	};
		 	this.dialogTitle = '新增教师信息';
   	  this.formVisible = true;
		},
		//add or edit
		verifySaveData(formName) {
      //新增时通过birth计算年龄从而保存
   	 const that = this;
	   this.$refs[formName].validate((valid) => {
        if (valid) {
        	let messageValue = '';
        	let handleMethod = null;
        	if(that.form.id) {
        		//edit
        		messageValue = '修改数据成功';
        	} else {
        		//add
        		messageValue = '新增数据成功';
        	}
        	return;
        	that.saveOrEditJuniorOverData(that.form)
        	  .then(res => {
        	  	that.$notify({
			           	title: '成功',
			           	message: messageValue,
			           	type: 'success'
		        	});
		        	that.findAllJuniorOverData();
		        	that.formVisible = false;
        	  })
        	  .catch(err => {
        	  	that,$notify.error({
        	  		title: '失败',
        	  		message: err
        	  	});
        	  	that.formVisible = false;
        	  });
        } else {
          that.$notify.error({
           	title: '失败',
           	message: '输入数据与校验规则不符'
        	});
          return false;
        }
      });
		},
		//打开修改模态框
		handleEdit(index,row) {
			this.dialogTitle = '修改教师信息';
			this.form = JSON.parse(JSON.stringify(row));
			this.formVisible = true;
		},
		//关闭模态框
		handleCancleDialog() {
			this.formVisible = false;
			this.form = {};
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
