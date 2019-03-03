import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    universityClassList: [],
    universityDepList: [],
    universitySchoolList: []
	},
	getters: {
    universityClassList: state => state.universityClassList,
    universityDepList: state => state.universityDepList,
    universitySchoolList: state => state.universitySchoolList
	},
	mutations: {
    changeUniversityClassList(state,data) {
 	    state.universityClassList = data;
    },
    changeUniversityDepList(state,data) {
      state.universityDepList = data;
    },
     changeUniversitySchoolList(state,data) {
      state.universitySchoolList = data;
    },
	},
	actions: {
    //获取大学 classmate 信息
    findUniversityClassData(context) {
   	  return new Promise((resolve,reject)=>{
        axios.get('/university/findClassmateList')
          .then(({data})=>{
           	context.commit('changeUniversityClassList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    //add or edit
    saveUniversityClassData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/university/saveOrUpdateClassList',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    findUniversityDepData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/university/findDepartmentList')
          .then(({data})=>{
            context.commit('changeUniversityDepList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    },
    //add or edit
    saveUniversityDepData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/university/saveOrUpdateDepList',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    findUniversitySchoolData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/university/findSchoolList')
          .then(({data})=>{
            context.commit('changeUniversitySchoolList',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    },
    //add or edit
    saveUniversitySchoolData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/university/saveOrUpdateSchoolList',qs.stringify(obj))
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