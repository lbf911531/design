<template>
  <div class="universityDep">
    <div class="option-div">
      <el-input v-model="search" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
      <el-button type="success" plain @click="openDialogToAdd">新增</el-button>
    </div>
    <el-table :data="dataSource" v-loading="loading" stripe style="width: 100%" max-height="360">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="contactWay" label="QQ号" align="center"></el-table-column>
      <el-table-column prop="birth" label="出生年月" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              type="primary"
              circle
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
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
        <el-form-item label="出生年月:" prop="birth" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birth"
              style="width: 100%;"
              @change="relateAge"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄:" prop="age" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="form.age" autocomplete="off" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话:" prop="phone" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="QQ号:" prop="contactWay" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="form.contactWay" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="关系:" prop="relationship" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-select v-model="form.relationship" placeholder="请选择" style="width: 100%;" disabled>
              <el-option label="系友" value="depFriend"></el-option>
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      dataSource: [
        {
          id: "1001",
          name: "friend",
          age: 16,
          gender: "男",
          birth: "2014-01-23",
          relationship: "friend"
        }
      ], //表格数据源
      search: "", //查询字符串
      dialogTitle: "新增系友信息", //模态框标题
      formVisible: false, // 模态框可见
      form: {}, //表单数据
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        sex: [{ required: true, message: "请选择", trigger: "blur" }],
        birth: [{ required: true, message: "请选择", trigger: "blur" }],
        contactWay: [
          { type: "number", message: "QQ号必须为数字值", trigger: "blur" },
          { pattern: /^\d{8,}$/, message: "QQ号最少八位", trigger: "blur" }
        ],
        relationship: [{ required: true, message: "请选择", trigger: "blur" }]
      }, //校验规则
      tipVisible: false, //提示框可见
      tipForm: {} //将被改变relationship的数据
    };
  },
  computed: {
    // ...mapGetters(['primarys']),
    // 	priamryList() {
    //    const that = this;
    // return this.primarys.filter(function(item){
    // 	if(item.name){
    // 		return item.name.indexOf(that.search) !== -1;
    // 	}	else return false;
    // });
    //  }
  },
  created() {
    // this.loading = true;
    const that = this;
    // this.findUniversityDepData()
    //   .then(data => {
    //   	that.loading = false;
    //   })
    //   .catch(err => {
    //   	that.$message.error({
    //         message: '获取数据失败:'+err,
    //       });
    //   	that.loading = false;
    //   })
  },
  methods: {
    ...mapActions([
      "findUniversityDepData",
      "saveUniversityDepData",
      "changeRelationship"
    ]),
    //打开新增模态框
    openDialogToAdd() {
      this.form = {
        gender: "男",
        relationship: "depFriend",
        age: 0
      };
      this.dialogTitle = "新增系友信息";
      this.formVisible = true;
    },
    relateAge() {
      //获取当前数据出生年与当前年计算年龄
      this.form.birth = moment(this.form.birth).format("YYYY-MM-DD");
      let year = parseFloat(new Date().getFullYear());
      let age = year - parseFloat(String(this.form.birth).split("-")[0]);
      this.form.age = Number.isNaN(age) ? 0 : age;
    },
    //add or edit
    verifySaveData(formName) {
      //新增时通过birth计算年龄从而保存
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let messageValue = "";
          let handleMethod = null;
          if (that.form.id) {
            //edit
            messageValue = "修改数据成功";
          } else {
            //add
            messageValue = "新增数据成功";
          }
          //获取当前数据出生年与当前年计算年龄
          that.form.birth = moment(that.form.birth).format("YYYY-MM-DD");
          let year = parseFloat(new Date().getFullYear());
          let age = year - parseFloat(String(that.form.birth).split("-")[0]);
          that.form.age = age;
          return;
          that
            .saveUniversityDepData(that.form)
            .then(res => {
              that.$notify({
                title: "成功",
                message: messageValue,
                type: "success"
              });
              that.findUniversityDepData();
              that.formVisible = false;
            })
            .catch(err => {
              that,
                $notify.error({
                  title: "失败",
                  message: err
                });
              that.formVisible = false;
            });
        } else {
          that.$notify.error({
            title: "失败",
            message: "输入数据与校验规则不符"
          });
          return false;
        }
      });
    },
    //打开修改模态框
    handleEdit(index, row) {
      this.dialogTitle = "修改系友信息";
      this.form = JSON.parse(JSON.stringify(row));
      this.formVisible = true;
    },
    //关闭模态框
    handleCancleDialog() {
      this.formVisible = false;
      this.form = {};
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
