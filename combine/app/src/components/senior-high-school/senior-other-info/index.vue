<template>
  <div class="juniorOverInfo">
    <div class="option-div">
      <el-input v-model="searchName" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
      <el-select v-model="searchSex" placeholder="请选择性别" clearable>
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
      <el-button
        type="primary"
        round
        @click="openDialogToAdd"
        v-if="this.curUserInfo.permission === 'admin'"
      >新 增</el-button>
      <el-button
        plain
        @click="handleBatchDel"
        :disabled="this.multipleSelection.length > 0 ? false : true"
        v-if="this.curUserInfo.permission === 'admin'"
      >删除</el-button>
    </div>
    <el-table
      :data="seniorSameLevelFriendList"
      v-loading="loading"
      stripe
      style="width: 100%"
      border
      max-height="320"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center" sortable></el-table-column>
      <el-table-column prop="gender" label="性别" align="center"></el-table-column>
      <el-table-column prop="birth" label="出生年月" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="contactWay" label="QQ号" align="center"></el-table-column>
      <el-table-column prop="relationship" label="关系" align="center">
        <template>
          <el-tag type="warning" disable-transitions>{{'同级朋友'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="this.curUserInfo.permission === 'admin'">
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
              <el-option label="好友" value="friend"></el-option>
              <el-option label="普通" value="normal"></el-option>
              <el-option label="同级朋友" value="slFriend"></el-option>
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
      dialogTitle: "新增同学信息", //模态框标题
      formVisible: false, // 模态框可见
      form: {}, //表单数据
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        gender: [{ required: true, message: "请选择", trigger: "blur" }],
        birth: [{ required: true, message: "请选择", trigger: "blur" }],
        phone: [
          {
            pattern: /^\d{11}$/,
            message: "电话号码为十一位数",
            trigger: "blur"
          }
        ],
        contactWay: [
          {
            pattern: /^\d{8,}$/,
            message: "QQ号最少为八位数字",
            trigger: "blur"
          }
        ],
        relationship: [{ required: true, message: "请选择", trigger: "blur" }]
      },
      multipleSelection: [] // 多选
    };
  },
  computed: {
    ...mapGetters(["seniorOthersList", "curUserInfo"]),
    seniorSameLevelFriendList() {
      const that = this;
      return this.seniorOthersList.filter(function(item) {
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
    this.findSeniorDataByRelationship("slFriend")
      .then(data => {
        that.loading = false;
      })
      .catch(err => {
        that.loading = false;
        that.$message.error({
          message: "获取数据失败:" + err
        });
      });
  },
  methods: {
    ...mapActions([
      "findSeniorDataByRelationship",
      "saveSeniorData",
      "updateSeniorData",
      "batchDelSeniorOverData"
    ]),
    //打开新增模态框
    openDialogToAdd() {
      this.form = {
        gender: "男",
        age: 0,
        relationship: "slFriend"
      };
      this.dialogTitle = "新增同学信息";
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
            handleMethod = this.updateSeniorData;
          } else {
            //add
            messageValue = "新增数据成功";
            handleMethod = this.saveSeniorData;
          }
          if (handleMethod) {
            handleMethod(that.form)
              .then(res => {
                that.$notify({
                  title: "成功",
                  message: messageValue,
                  type: "success"
                });
                that.findSeniorDataByRelationship("slFriend");
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
      this.dialogTitle = "修改同学信息";
      this.form = JSON.parse(JSON.stringify(row));
      this.formVisible = true;
    },
    //关闭模态框
    handleCancleDialog() {
      this.formVisible = false;
      this.form = {};
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
          this.batchDelSeniorOverData(params)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              that.findSeniorDataByRelationship("slFriend");
              this.multipleSelection = [];
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
