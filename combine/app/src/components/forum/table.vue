<template>
  <div class="ctable">
    <div v-for="(item,index) in this.calculate()" :key="index">
      <el-row>
        <el-col :span="4">
          <el-dropdown v-if="item">
            <span class="el-dropdown-link">
              {{item.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{`账号： ${item.userId}`}}</el-dropdown-item>
              <el-dropdown-item>{{`性别： ${item.gender}`}}</el-dropdown-item>
              <el-dropdown-item>{{`联系电话： ${item.phone}`}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="15">
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="item.numPer"
            :color="item.numPer >= 80 ? '#67C23A' : (item.numPer >= 60 ? '#A996D4' : '#F56C6C')"
            v-if="item"
          ></el-progress>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CTable',
  props: ['message'],
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    calculate() {
      if(this.message && this.message instanceof Array) {
        const arr = [];
        // 计算重复次数
        const temp = this.message.reduce((pre, cur) => {
            let str = `${cur.user}-${cur.userName}-${cur.gender}-${cur.phone || '...'}`;
            if (str in pre) {
              pre[str]++;
            }
            else {
              pre[str] = 1;
            }
            return pre;
        }, {});
        // 转化为数组
        for(let key in temp) {
          let obj = {}
          obj.userId = key.split('-')[0]; // user
          obj.idName = key;
          obj.name = key.split('-')[1];
          obj.gender = key.split('-')[2]; // gender
          obj.phone = key.split('-')[3]; //phone
          obj.num = temp[key]; // sort by num ~ temp[key]
          obj.numPer = ((parseInt(temp[key]) / this.message.length) * 100).toFixed(2);
          arr.push(obj);
        }
        // 排序
        arr.sort((a,b) => (b.num -a.num));
        // 取前三
        return [arr[0],arr[1],arr[2]];
      }
    }
  },
}
</script>

<style lang="less" scoped>
.ctable {
  text-align: right;
  .el-col {
    padding: 0 20px;
  }
  .el-progress {
    margin-bottom: 10px;
  }
}
</style>
