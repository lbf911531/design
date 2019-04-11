<template>
  <div class="juniorFriendsInfo">
    <div class="option-div">
      <el-input v-model="search" placeholder="请输入姓名" clearable suffix-icon="el-icon-search"></el-input>
    </div>
    <el-table
      :data="juniorBlackValueList"
      stripe
      style="width: 100%"
      max-height="320"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center"></el-table-column>
      <el-table-column prop="birth" label="出生年月" align="center"></el-table-column>
      <el-table-column prop="contactWay" label="QQ号" align="center"></el-table-column>
      <el-table-column prop="relationship" label="关系" align="center">
        <template>
          <el-tag type="info" disable-transitions>{{'黑名单'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          >移出黑名单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      search: "" //查询字符串
    };
  },
  computed: {
    ...mapGetters(["juniorBlackList"]),
    juniorBlackValueList() {
      const that = this;
      return this.juniorBlackList.filter(function(item) {
        if (item.name) {
          return item.name.indexOf(that.search) !== -1;
        } else return false;
      });
    }
  },
  created() {
    this.loading = true;
    const that = this;
    this.findJuniorListByRel("blacklist")
      .then(data => {
        that.loading = false;
      })
      .catch(err => {
        that.$message.error({
          message: "获取数据失败:" + err
        });
        that.loading = false;
      });
  },
  methods: {
    ...mapActions(["findJuniorListByRel", "changeRelationship"]),
    handleDelete(index, row) {
      this.$confirm(`是否将 ${row.name} 移出黑名单`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = { id: row.id, relationship: "normal" };
          this.changeRelationship(params)
            .then(res => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.findJuniorListByRel("blacklist");
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
            message: "操作取消"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
