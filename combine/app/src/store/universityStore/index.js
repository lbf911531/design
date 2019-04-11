import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    unClassList: [], // 分页存放数据
    unDepList: [],
    unSchoolList: [],
  },
	getters: {
    unClassList: state => state.unClassList,
    unDepList: state => state.unDepList,
    unSchoolList: state => state.unSchoolList,
	},
	mutations: {
    changeUniversityClassList(state,data) {
 	    state.unClassList = data;
    },
    changeUniversityDepList(state,data) {
      state.unDepList = data;
    },
    changeUniversitySchoolList(state,data) {
      state.unSchoolList = data;
    },
	},
	actions: {
    //get datalist
    findUniversityData(context,rel) {
      if(rel) {
        let commitStr = '';
        switch(rel) {
          case 'classmate' :
            commitStr = 'changeUniversityClassList';
            break;
          case 'depmate' :
            commitStr = 'changeUniversityDepList';
            break;
          case 'schoolmate':
            commitStr = 'changeUniversitySchoolList';
            break;
          default: break;
        }
        if(commitStr) {
          return new Promise((resolve,reject)=>{
            axios.get(`/university/data/find/all/by/conditions?relationship=${rel}`)
              .then(({data})=>{
                context.commit(commitStr,data);
                resolve(data);
              })
              .catch((err)=>{
                reject(err);
              });
           });
        }
      }
    },
    //add or edit
    saveOrUpdateUniData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/university/data/save/or/update',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // batch delete
    batchDelUniversityData(context, arr) {
      return new Promise((resolve,reject)=>{
        axios.post('/university/data/delete/batch',qs.stringify(arr))
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
