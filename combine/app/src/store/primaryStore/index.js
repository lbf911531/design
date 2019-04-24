import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    primarys: [],
    primaryOverLength: 0
	},
	getters: {
    primarys: state => state.primarys,
    primaryOverLength: state => state.primaryOverLength
	},
	mutations: {
    changePrimarys(state,data) {
 	    state.primarys = data;
    },
    changePrimaryOverLength(state,data) {
      state.primaryOverLength = data;
    }
	},
	actions: {
    //获取小学列表信息
    findAllPriamryData(context,obj) {
   	  return new Promise((resolve,reject)=>{
        axios.get(`/primary/findAllPrimaryList?pageSize=${obj.pageSize}&curPage=${obj.currentPage}`)
          .then(({data})=>{
            context.commit('changePrimarys',data.limitRes);
            context.commit('changePrimaryOverLength',data.totalLength);
            resolve(data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    //add or edit
    savePrimaryData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/primary/savePrimaryList',qs.stringify(obj))
          .then(function(params){
            resolve(params);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    updatePrimaryData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/primary/updatePrimaryList',qs.stringify(obj))
          .then(function(params){
            resolve(params);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    batchSaveValue(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/primary/data/save/batch',qs.stringify(obj))
          .then(function(params){
            resolve(params);
          })
          .catch(function(error){
            reject(error);
          })
      });
    }
	}
}
