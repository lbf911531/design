import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    seniorsOverList: [],
    seniorFriendsList: [],
    seniorOthersList: [],
    seniorTeachersList: []
	},
	getters: {
    seniorsOverList: state => state.seniorsOverList,
    seniorFriendsList: state => state.seniorFriendsList,
    seniorOthersList: state => state.seniorOthersList,
    seniorTeachersList: state => state.seniorTeachersList,
	},
	mutations: {
    changeSeniorsOverList(state,data) {
 	    state.seniorsOverList = data;
    },
    changeSeniorsFriendsList(state,data) {
      state.seniorFriendsList = data;
    },
    changeSeniorsOthersList(state,data) {
      state.seniorOthersList = data;
    },
    changeSeniorsTeachersList(state,data) {
      state.seniorTeachersList = data;
    }
	},
	actions: {
    //获取高中列表信息
    findAllSeniorOverData(context) {
   	  return new Promise((resolve,reject)=>{
        axios.get('/senior/data/find/all')
          .then(({data})=>{
            context.commit('changeSeniorsOverList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    //add
    saveSeniorData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/data/new',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //update
    updateSeniorData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/data/update',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // batch delete
    batchDelSeniorOverData(context, arr) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/data/delete/batch',qs.stringify(arr))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //get value by relationship
    findSeniorDataByRelationship(context,rel) {
      let commitStr = "";
      if(rel) {
        switch(rel) {
          case 'friend' :
          commitStr = "changeSeniorsFriendsList";
          break;
          case 'slFriend':
          commitStr = "changeSeniorsOthersList";
          break;
          default: break;
        }
        return new Promise((resolve,reject)=>{
          axios.get(`/senior/data/find/by/relationship?relationship=${rel}`)
            .then(({data})=>{
              context.commit(commitStr,data);
              resolve(data.data);
            })
            .catch((err)=>{
              reject(err);
            });
        });
      }
    },
    // 查询老师信息
    findTeachersData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/senior/data/find/teacher')
          .then(({data})=>{
            context.commit('changeSeniorsTeachersList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    // 新增教师信息
    saveTeachersData(context, obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/data/teacher/new',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // 更新教师信息
    updateTeachersData(context, obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/data/teacher/update',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // 批量删除教师信息
    batchDelTeachersData(context, arr) {
      return new Promise((resolve,reject)=>{
				axios.post('/senior/data/delete/batch/teacher',qs.stringify(arr))
				  .then(function(param){
            resolve(param);
				  })
				  .catch(function(error){
            reject(error);
				  })
			});
    }
	}
}
/**
 * ps : 根据字段relationship 查询数据，走同一个接口
 * 增改 亦走同一个接口，传值不同，（包括单独事件改变关系）
 **/
