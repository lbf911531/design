<template>
  <div class="juniorOverInfo">
    <div class="option-div">
      <el-input v-model="searchName" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
      <el-select v-model="searchSex" placeholder="请选择性别" clearable>
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
      <el-button
        type="danger"
        round
        @click="handleBatchDel"
        :disabled="this.multipleSelection.length > 0 ? false : true"
      >删 除</el-button>
      <el-button type="primary" round @click="openDialogToAdd">新 增</el-button>
    </div>
    <el-table
      :data="seniorTeachersValueList"
      v-loading="loading"
      stripe
      style="width: 100%"
      border
      max-height="360"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center" sortable></el-table-column>
      <el-table-column prop="phone" label="电话" align="center">
        <template slot-scope="scope">{{scope.row.phone || '-'}}</template>
      </el-table-column>
      <el-table-column prop="subject" label="教学学科" align="center">
        <template slot-scope="scope">{{formatSubject(scope.row.subject)}}</template>
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
            <el-input-number v-model="form.age" controls-position="right" :min="0" :max="120"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="电话:" prop="phone" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="教学学科" prop="subject" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-select
              v-model="form.subject"
              placeholder="请选择"
              style="width: 100%;"
              :disabled="this.form.id ? true : false"
            >
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
      searchName: "", //查询字符串
      searchSex: "",
      dialogTitle: "新增教师信息", //模态框标题
      formVisible: false, // 模态框可见
      form: {}, //表单数据
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        sex: [{ required: true, message: "请选择", trigger: "blur" }],
        age: [
          {
            pattern: /^[1-9]+[0-9]{1,2}$/,
            message: "年龄应为正整数",
            trigger: "blur"
          }
        ],
        phone: [
          {
            pattern: /^\d{11}$/,
            message: "电话号码应为十一位数",
            trigger: "blur"
          }
        ]
      },
      subjectOptions: [
        {
          value: "Chinese",
          label: "语文"
        },
        {
          value: "Math",
          label: "数学"
        },
        {
          value: "English",
          label: "英语"
        },
        {
          value: "Physics",
          label: "物理"
        },
        {
          value: "Chemistry",
          label: "化学"
        },
        {
          value: "Biology",
          label: "生物"
        },
        {
          value: "Geography",
          label: "地理"
        },
        {
          value: "History",
          label: "历史"
        },
        {
          value: "Politics",
          label: "政治"
        }
      ], // 用于遍历的学科数组
      _subjectOptions: [], // 副本，表格内学科字段格式化
      multipleSelection: [] // 多选
    };
  },
  computed: {
    ...mapGetters(["seniorTeachersList"]),
    seniorTeachersValueList() {
      const that = this;
      return this.seniorTeachersList.filter(function(item) {
        if (item.name && item.id) {
          return (
            item.name.indexOf(that.searchName) !== -1 &&
            item.gender.indexOf(that.searchSex) !== -1
          );
        } else return false;
      });
    }
  },
  created() {
    this.loading = true;
    const that = this;
    this.findTeachersData()
      .then(data => {
        that.loading = false;
      })
      .catch(err => {
        that.loading = false;
        that.$message.error({
          message: "获取数据失败:" + err
        });
      });
    this._subjectOptions = [...this.subjectOptions];
  },
  methods: {
    ...mapActions([
      "findTeachersData",
      "saveTeachersData",
      "updateTeachersData",
      "batchDelTeachersData"
    ]),
    //打开新增模态框
    openDialogToAdd() {
      this.form = {
        gender: "男",
        age: 0
      };
      this.dialogTitle = "新增教师信息";
      const finalArr = this.filterSubject();
      this.subjectOptions = [...finalArr];
      this.formVisible = true;
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
            handleMethod = that.updateTeachersData;
          } else {
            //add
            messageValue = "新增数据成功";
            handleMethod = that.saveTeachersData;
          }
          if (handleMethod) {
            handleMethod(that.form)
              .then(res => {
                that.$notify({
                  title: "成功",
                  message: messageValue,
                  type: "success"
                });
                that.findTeachersData();
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
          }
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
      this.dialogTitle = "修改教师信息";
      this.form = JSON.parse(JSON.stringify(row));
      this.formVisible = true;
    },
    //关闭模态框
    handleCancleDialog() {
      this.formVisible = false;
      this.form = {};
    },
    // 格式化学科数据(将英文转中文)
    formatSubject(subject) {
      if (subject) {
        const target = this._subjectOptions.find(
          value => subject == value.value
        );
        if (target) {
          return target.label;
        } else return subject;
      }
    },
    // 过滤已选择过的学科
    filterSubject() {
      const tempArr = [...this.seniorTeachersList].map(item => item.subject);
      return this.subjectOptions.filter(item => !tempArr.includes(item.value));
    },
    // 多选行数据
    handleSelectionChange(values) {
      this.multipleSelection = values;
    },
    // 批量删除
    handleBatchDel() {
      const that = this;
      this.$confirm("是否删除勾选数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const temp = this.multipleSelection.map(item => item.id);
          const params = { ids: String(temp) };
          this.batchDelTeachersData(params)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              that.findTeachersData();
              that.multipleSelection = [];
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
