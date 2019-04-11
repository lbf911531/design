<template>
  <div class="homepage">
    <el-row class="top-row">
      <el-col :span="8" class="top-ele-box-one">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div class="userInfo">
            <el-row>
              <el-col :span="8">用户名：</el-col>
              <el-col :span="14">{{this.userInfo&& this.userInfo.name ? this.userInfo.name : '-'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">权限：</el-col>
              <el-col :span="14">
                <el-tag
                  type="danger"
                  size="mini"
                >{{this.userInfo&& this.userInfo.permission ? (this.userInfo.permission === 'admin' ? '管理员' : '普通用户') : '-'}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">性别：</el-col>
              <el-col
                :span="14"
              >{{this.userInfo&& this.userInfo.gender ? this.userInfo.gender : '-'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">联系电话：</el-col>
              <el-col :span="14">{{this.userInfo&& this.userInfo.phone ? this.userInfo.phone : '-'}}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card-height" :body-style="{ padding: '5px' }">
          <el-carousel :interval="5000" arrow="always" height="230px">
            <el-carousel-item v-for="item in imgArr" :key="item.id">
              <img :src="item.idView" alt="图" class="imgStyle">
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <el-col :span="8" class="top-ele-box-two">
        <el-card class="card-height" :body-style="{ padding: '5px' }">
          <x-chart :id="id" :option="options"></x-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="bottom-row">
      <el-col :span="12" class="bottom-ele-box">
        <el-card class="card-height" :body-style="{ padding: '5px' }"></el-card>
      </el-col>
      <el-col :span="12" class="bottom-ele-box">
        <el-card class="card-height" :body-style="{ padding: '5px' }"></el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import XChart from "@/components/hightcharts/chart.vue";
export default {
  data() {
    return {
      imgArr: [
        { id: 0, idView: require("../../images/1.gif") },
        { id: 1, idView: require("../../images/2.jpg") },
        { id: 2, idView: require("../../images/3.jpg") },
        { id: 3, idView: require("../../images/4.jpg") }
      ],
      id: "chart",
      options: {
        chart: {
          type: "column" //指定图表的类型，默认是折线图（line）
        },
        credits: {
          enabled: false
        }, //去掉地址
        title: {
          text: "我的第一个图表" //指定图表标题
        },
        colors: ["#058DC7", "#50B432", "#ED561B", "#DDDF00", "#24CBE5"],
        xAxis: {
          categories: ["1号", "2号", "3号", "3号", "3号"] //指定x轴分组
        },
        yAxis: {
          title: {
            text: "最近七天" //指定y轴的标题
          }
        },
        plotOptions: {
          column: {
            colorByPoint: true
          }
        },

        series: [
          {
            //指定数据列
            name: "小明",
            data: [
              {
                y: 1000,
                color: "red"
              },
              5000,
              4000,
              5000,
              2000
            ] //数据
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {},
  components: {
    XChart
  },
  methods: {}
};
</script>
<style scoped>
.top-row {
  height: 240px;
}
.top-ele-box-one {
  padding-right: 5px;
}
.top-ele-box-two {
  padding-left: 5px;
}
.bottom-row {
  margin-top: 30px;
}
.bottom-ele-box {
  padding: 5px 10px;
}
.bottom-ele-box:nth-child(1) {
  padding-left: 0px;
}
.bottom-ele-box:nth-child(2) {
  padding-right: 0px;
}
.card-height {
  height: 240px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  color: #fff;
}
.userInfo {
  line-height: 24px;
}
.imgStyle {
  width: 100%;
  height: 100%;
}
</style>
