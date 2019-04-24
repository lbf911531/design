<template>
  <div class="juniorOverInfo">
    <div class="option-div">
      <el-input v-model="searchName" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
      <el-select v-model="searchSex" placeholder="请选择性别" clearable>
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
      <el-button
        plain
        @click="handleBatchDel"
        :disabled="this.multipleSelection.length > 0 ? false : true"
        v-if="this.curUserInfo.permission === 'admin'"
      >删除</el-button>
      <el-button
        type="success"
        plain
        @click="openDialogToAdd"
        v-if="this.curUserInfo.permission === 'admin'"
      >新增</el-button>
      <el-tooltip class="item" effect="dark" content="导出列表数据" placement="top-start">
        <el-button type="primary" :loading="exporting" @click="exportData" style="float: none">导出数据</el-button>
      </el-tooltip>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: right"
      ></el-pagination>
    </div>
    <el-table
      :data="juniorsList"
      v-loading="loading"
      stripe
      style="width: 100%"
      max-height="320"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="150px"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center" sortable width="150px"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center" width="150px"></el-table-column>
      <el-table-column prop="birth" label="出生年月" align="center" width="150px"></el-table-column>
      <el-table-column prop="contactWay" label="QQ号" align="center" width="150px"></el-table-column>
      <el-table-column prop="relationship" label="关系" align="center" width="150px">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.relationship !== 'normal' ? 'warning' : (scope.row.relationship === 'normal' ? 'success' : 'info')"
            disable-transitions
          >{{scope.row.relationship === 'normal' ? '普通同学' : (scope.row.relationship === 'friend' ? '好友' : '黑名单')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        width="200px"
        v-if="this.curUserInfo.permission === 'admin'"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleToChangeRel(scope.$index, scope.row, 'friend')"
          >加入好友栏</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleToChangeRel(scope.$index, scope.row, 'blacklist')"
          >加入黑名单</el-button>
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
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="QQ号:" prop="contactWay" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="form.contactWay" autocomplete="off"></el-input>
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
      dialogTitle: "新增同学信息", //模态框标题
      formVisible: false, // 模态框可见
      form: {}, //表单数据
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        gender: [{ required: true, message: "请选择", trigger: "blur" }],
        contactWay: [
          {
            pattern: /^\d{8,}$/,
            message: "QQ号最少为八位数字",
            trigger: "blur"
          }
        ]
      },
      multipleSelection: [], // 多选
      pageSize: 5,
      total: 0,
      currentPage: 1,
      exporting: false
    };
  },
  computed: {
    ...mapGetters(["juniors", "juniorOverList", "curUserInfo"]),
    juniorsList() {
      const that = this;
      return (
        this.juniors instanceof Array &&
        this.juniors.filter(function(item) {
          if (item.name) {
            if (that.curUserInfo.permission !== "admin") {
              item.relationship = "normal";
            }
            return (
              item.name.indexOf(that.searchName) !== -1 &&
              item.gender.indexOf(that.searchSex) !== -1
            );
          } else return false;
        })
      );
    }
  },
  created() {
    this.getJuniorValueList();
  },
  methods: {
    ...mapActions([
      "findAllJuniorOverData",
      "saveOrEditJuniorData",
      "changeRelationship",
      "batchDelJuniorOverData"
    ]),
    // 获取数据源
    getJuniorValueList() {
      this.loading = true;
      const that = this;
      const params = {
        pageSize: that.pageSize,
        currentPage: that.currentPage
      };
      this.findAllJuniorOverData(params)
        .then(data => {
          that.loading = false;
          that.total = that.juniorOverList.length;
        })
        .catch(err => {
          that.loading = false;
          that.$message.error({
            message: "获取数据失败:" + err
          });
        });
    },
    //打开新增模态框
    openDialogToAdd() {
      this.form = {
        gender: "男",
        relationship: "normal"
      };
      this.dialogTitle = "新增同学信息";
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
          } else {
            //add
            messageValue = "新增数据成功";
          }
          //获取当前数据出生年与当前年计算年龄
          that.form.birth = moment(that.form.birth).format("YYYY-MM-DD");
          let year = parseFloat(new Date().getFullYear());
          let age = year - parseFloat(String(that.form.birth).split("-")[0]);
          that.form.age = age;
          that
            .saveOrEditJuniorData(that.form)
            .then(res => {
              that.$notify({
                title: "成功",
                message: messageValue,
                type: "success"
              });
              that.getJuniorValueList();
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
      this.dialogTitle = "修改同学信息";
      this.form = JSON.parse(JSON.stringify(row));
      this.formVisible = true;
    },
    //关闭模态框
    handleCancleDialog() {
      this.formVisible = false;
      this.form = {};
    },
    // 改变关系
    handleToChangeRel(index, row, rel) {
      const tipMsg = rel === "friend" ? "好友列单" : "黑名单";
      this.$confirm(`是否将 ${row.name} 加入 ${tipMsg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          const params = {
            id: row.id,
            relationship: rel
          };
          this.changeRelationship(params)
            .then(res => {
              this.$message({
                type: "success",
                message: "移入成功"
              });
              this.getJuniorValueList();
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
            message: "已取消操作"
          });
        });
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
          this.batchDelJuniorOverData(params)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              that.currentPage = 1;
              that.getJuniorValueList();
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
          this.multipleSelection = [];
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val || 5;
      this.getJuniorValueList();
    },
    handleCurrentChange(val) {
      this.currentPage = val || 1;
      this.getJuniorValueList();
    },
    // export
    exportData() {
      this.exporting = true;
      this.$confirm("是否将本页数据以excel形式表格导出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          require.ensure([], () => {
            const { export_json_to_excel } = require("vendor/Export2Excel");
            const tHeader = ["姓名", "年龄", "性别", "出生年月", "QQ号"];
            const filterVal = [
              "name",
              "age",
              "gender",
              "birth",
              "contactWay"
            ];
            const list = this.juniors || [];
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "初中同学列表数据");
            this.exporting = false;
            this.$notify({
              type: "success",
              message: "导出成功，请去本地查看"
            });
          });
        })
        .catch(() => {
          this.exporting = false;
        });
    },
    //将数组处理成索引数组
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
