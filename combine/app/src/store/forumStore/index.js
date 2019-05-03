import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    msgList: [],
    msgLimitList: [],
    addMsgList: [], // 追加评论
    curMsgObj: {},
    limitDataMsg: {}
	},
	getters: {
    msgList: state => state.msgList,
    msgLimitList: state => state.msgLimitList,
    addMsgList: state => state.addMsgList,
    curMsgObj: state => state.curMsgObj,
    limitDataMsg: state => state.limitDataMsg
	},
	mutations: {
    changeForumMsgList(state,data) {
 	    state.msgList = data;
    },
    changeMsgLimitList(state,data) {
      state.msgLimitList = data;
    },
    changeForumAddMsgList(state,data) {
      state.addMsgList = data;
    },
    changeCurMsgObj(state,data) {
      state.curMsgObj = data;
    },
    changeMsgByLimitData(state,data) {
      state.limitDataMsg = data;
    }
	},
	actions: {
    //get
    findAllForumMsg(context) {
   	  return new Promise((resolve,reject)=>{
        axios.get('/forum/message/find/all')
          .then((res)=>{
            if(res.status === 200) {
              context.commit('changeForumMsgList',res.data);
              resolve(res.data);
            } else {
              context.commit('changeForumMsgList',[]);
              resolve([]);
            }
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    //add
    saveForumMsg(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/forum/message/save',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //add like num
    addForumMsgLikeNum(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/forum/message/like/num/add',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // find msg limit five
    findMsgLimitFive(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/forum/message/find/limit/five')
          .then((res)=>{
            if(res.status === 200) {
              context.commit('changeMsgLimitList',res.data);
              resolve(res.data);
            } else {
              context.commit('changeMsgLimitList',[]);
              resolve([]);
            }
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    findAdditionMsg(context,id) {
      return new Promise((resolve,reject)=>{
        axios.get(`/forum/message/comments/find/by/msgId?msgId=${id}`)
          .then((res)=>{
            if(res.status === 200 && !res.data.errno) {
              context.commit('changeForumAddMsgList',res.data.addMsg);
              context.commit('changeCurMsgObj',res.data.curMsg)
              resolve(res.data);
            } else {
              context.commit('changeForumAddMsgList',[]);
              resolve([]);
            }
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    saveForumAddMsg(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/forum/message/comments/save',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    getMsgByLimitData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.get(`/forum/message/find/limit/login/time?userId=${obj.userId}&lastLoginTime=${obj.msgDate}`)
          .then(({data})=>{
            context.commit('changeMsgByLimitData',data);
            resolve(data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    }
	}
}
