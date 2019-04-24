
<template>
  <el-dialog :visible.sync="view">
    <div class="app-container">
      <!-- // excel文件选择框 -->
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
      <!-- // excel文件预览框 -->
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;" max-height="260">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancleDialog">取 消</el-button>
      <el-button type="success" @click="sendMsgToSql">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UploadExcelComponent from "@/components/common/importExcel.vue";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  props: {
    view: {
      type: Boolean,
      required: true
    },
    onCancel: {
      type: Function
    },
    onSave: {
      type: Function
    }
  },
  data() {
    return {
      tableData: [],
      tableHeader: []
    };
  },
  methods: {
    // 文件读取前执行
    beforeUpload(file) {
      // 取文件大小，限制文件大小超过1mb
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "上传的Excel文件不能大于1mb.",
        type: "warning"
      });
      return false;
    },
    // 文件读取后执行
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
    handleCancleDialog() {
      if(this.onCancel) {
        this.onCancel();
      }
    },
    // 回调，父组件调用接口保存
    sendMsgToSql() {
      if(this.onSave) {
        this.onSave()
      }
    },
    // 清除预览数据
    clearTable() {
      this.tableData = [];
      this.tableHeader = [];
    }
  }
};
</script>
