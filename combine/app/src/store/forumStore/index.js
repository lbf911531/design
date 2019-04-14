import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    msgList: [],
    msgLimitList: [],
	},
	getters: {
    msgList: state => state.msgList,
    msgLimitList: state => state.msgLimitList
	},
	mutations: {
    changeForumMsgList(state,data) {
 	    state.msgList = data;
    },
    changeMsgLimitList(state,data) {
      state.msgLimitList = data;
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
    }
	}
}
