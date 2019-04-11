import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    juniorOverList: [],
    juniors: [],
    juniorFs: [],
    juniorBlackList: [],
	},
	getters: {
    juniors: state => state.juniors,
    juniorFs: state => state.juniorFs,
    juniorBlackList: state => state.juniorBlackList,
    juniorOverList: state => state.juniorOverList,
	},
	mutations: {
    changeJuniors(state,data) {
 	    state.juniors = data;
    },
    changeJuniorFs(state,data) {
      state.juniorFs = data;
    },
    changeJuniorBlackList(state,data) {
      state.juniorBlackList = data;
    },
    changeJuniorOverList(state,data) {
      state.juniorOverList = data;
    }
	},
	actions: {
    //获取初中列表信息
    findAllJuniorOverData(context,obj) {
   	  return new Promise((resolve,reject)=>{
        axios.get(`/junior/data/find/all?pageSize=${obj.pageSize}&curPage=${obj.currentPage}`)
          .then(({data})=>{
            context.commit('changeJuniors',data.limitRes);
            context.commit('changeJuniorOverList',data.totalRes);
            resolve(data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    //add or edit
    saveOrEditJuniorData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/junior/data/save/or/update',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // change relationship
    changeRelationship(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/junior/data/relationship/change',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    // find data by relationship
    findJuniorListByRel(context,rel) {
      const commitStr = rel === 'friend' ? 'changeJuniorFs' : 'changeJuniorBlackList';
      return new Promise((resolve,reject)=>{
        axios.get(`/junior/data/find/by/relationship?relationship=${rel}`)
          .then(({data})=>{
           	context.commit(commitStr,data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    // batch delete
    batchDelJuniorOverData(context, arr) {
      return new Promise((resolve,reject)=>{
        axios.post('/junior/data/delete/batch',qs.stringify(arr))
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
