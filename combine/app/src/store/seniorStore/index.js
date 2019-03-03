import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    seniorsOverList: [],
    seniorFriendList: [],
    seniorOthersList: [],
    seniorTeachersList: []
	},
	getters: {
    seniorsOverList: state => state.seniorsOverList,
    seniorFriendsList: state => state.seniorFriendList,
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
        axios.get('/senior/findAll')
          .then(({data})=>{
           	context.commit('changeSeniorsOverList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    //add or edit
    saveOrEditSeniorData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/saveOrUpdateOverList',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //get friend value
    findSeniorFriendsData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/senior/findFriendsList')
          .then(({data})=>{
            context.commit('changeSeniorsFriendsList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    },
     //add or edit
    saveOrEditSeniorFriendsData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/saveOrUpdateFriendsList',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //get other value
    findSeniorOthersData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/senior/findOthersList')
          .then(({data})=>{
            context.commit('changeSeniorsOthersList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    },
     //add or edit
    saveOrEditSeniorOthersData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/saveOrUpdateOthersList',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //get teacher value
    findSeniorTeachersData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/senior/findTeachersList')
          .then(({data})=>{
            context.commit('changeSeniorsTeachersList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    },
     //add or edit
    saveOrEditSeniorTeachersData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/senior/saveOrUpdateTeachersList',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
	}
}