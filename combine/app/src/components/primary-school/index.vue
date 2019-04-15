<template>
  <div class="primary-school">
    <div class="quote">当筵意气凌九霄，星离雨散不终朝。</div>
    <div class="divide-line"></div>
    <div class="option-div">
      <el-input v-model="search" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
      <el-button
        type="success"
        plain
        @click="openDialogToAdd"
        v-if="this.curUserInfo.permission === 'admin'"
      >新增</el-button>
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
    <el-table :data="priamryList" stripe style="width: 100%" max-height="340" v-loading="loading">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center"></el-table-column>
      <el-table-column prop="birth" label="出生年月" align="center"></el-table-column>
      <el-table-column prop="relationship" label="关系" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.relationship !== 'normal' ? 'warning' : 'success'"
            disable-transitions
          >{{scope.row.relationship === 'normal' ? '普通同学' : '好友'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="this.curUserInfo.permission === 'admin'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="formVisible">
      <el-form :model="primaryForm" :rules="rules" ref="primaryForm">
        <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input
              v-model="primaryForm.name"
              autocomplete="off"
              :disabled="this.primaryForm.name && this.primaryForm.id ? true : false"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
          <el-radio-group v-model="primaryForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月:" prop="birth" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="primaryForm.birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="关系:" prop="relationship" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-select v-model="primaryForm.relationship" placeholder="请选择" style="width: 100%;">
              <el-option label="好友" value="friend"></el-option>
              <el-option label="普通" value="normal"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancleDialog">取 消</el-button>
        <el-button type="success" @click="verifySaveData('primaryForm')">保 存</el-button>
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
      dataSource: [], //表格数据源
      search: "", //查询字符串
      dialogTitle: "新增同学信息", //模态框标题
      formVisible: false, // 模态框可见
      primaryForm: {}, //表单数据
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        gender: [{ required: true, message: "请选择", trigger: "blur" }],
        birth: [{ required: true, message: "请选择", trigger: "blur" }],
        relationship: [{ required: true, message: "请选择", trigger: "blur" }]
      },
      loading: false,
      pageSize: 5,
      total: 0,
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters(["primarys", "curUserInfo","primaryOverLength"]),
    priamryList() {
      const that = this;
      return (
        this.primarys &&
        this.primarys.filter(function(item) {
          if (item.name) {
            return item.name.indexOf(that.search) !== -1;
          } else return false;
        })
      );
    }
  },
  created() {
    this.getAllPrimaryData();
  },
  methods: {
    ...mapActions([
      "findAllPriamryData",
      "savePrimaryData",
      "updatePrimaryData"
    ]),
    getAllPrimaryData() {
      this.loading = true;
      const that = this;
      const params = {
        pageSize: that.pageSize,
        currentPage: that.currentPage
      };
      this.findAllPriamryData(params)
        .then(data => {
          if (data) {
            that.loading = false;
            that.total = that.primaryOverLength;
          }
        })
        .catch(err => {
          this.$message.error({
            title: "获取数据失败",
            message: err
          });
        });
    },
    //打开新增模态框
    openDialogToAdd() {
      this.primaryForm = {
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
          if (that.primaryForm.id) {
            //edit
            messageValue = "修改数据成功";
            handleMethod = this.updatePrimaryData;
          } else {
            //add
            messageValue = "新增数据成功";
            handleMethod = this.savePrimaryData;
          }
          //获取当前数据出生年与当前年计算年龄
          that.primaryForm.birth = moment(that.primaryForm.birth).format(
            "YYYY-MM-DD"
          );
          let year = parseFloat(new Date().getFullYear());
          let age =
            year - parseFloat(String(that.primaryForm.birth).split("-")[0]);
          that.primaryForm.age = age;
          handleMethod &&
            handleMethod(that.primaryForm)
              .then(res => {
                that.$notify({
                  title: "成功",
                  message: messageValue,
                  type: "success"
                });
                that.getAllPrimaryData();
                that.primaryForm = {};
                that.formVisible = false;
              })
              .catch(err => {
                that.$notify.error({
                  title: "失败",
                  message: err.message
                });
                that.primaryForm = {};
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
      this.primaryForm = JSON.parse(JSON.stringify(row));
      this.formVisible = true;
    },
    //关闭模态框
    handleCancleDialog() {
      this.formVisible = false;
      this.primaryForm = {};
    },
    handleSizeChange(val) {
      this.pageSize = val || 5;
      this.getAllPrimaryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val || 1;
      this.getAllPrimaryData();
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

