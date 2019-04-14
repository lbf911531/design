<template>
  <div class="forum">
    <div class="quote">
      <marquee>欢迎进入论坛，请畅所欲言</marquee>
    </div>
    <div class="divide-line"></div>
    <div class="publish-msg">
      <el-button type="primary" icon="el-icon-message" size="small">留言</el-button>
    </div>
    <div class="forum-content">
      <el-card class="box-card" shadow="hover" v-for="message in messageList" :key="message.id">
        <div slot="header">
          <span>{{message.author+'留言：'}}</span>
          <span style="float: right; padding: 3px 10px">{{message.time}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
        </div>
        <div>{{message.content}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageList: [
        {
          id: "1",
          author: "xiaoming",
          content: "1111",
          time: "2018/2/12"
        },
        {
          id: "2",
          author: "xiaoming",
          content: "222",
          time: "2018/2/12"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.forum {
  .quote {
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    margin: 0 0 10px 0;
    padding: 0 20px;
    background-color: #fafafa;
    color: #f0c863;
    marquee {
      color: #e21918;
    }
  }
  .divide-line {
    height: 1px;
    box-sizing: border-box;
    border-bottom: 1px solid #fafafa;
    margin-bottom: 10px;
  }
  .publish-msg {
    padding: 5px 20px;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .el-button {
      float: right;
    }
  }
  .forum-content {
    height: 400px;
    overflow-y: scroll;
    padding: 0 20px;
    .box-card {
      margin-bottom: 10px;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
  }
}
</style>
<style>
