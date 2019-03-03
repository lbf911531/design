import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    primarys: []
	},
	getters: {
    primarys: state => state.primarys
	},
	mutations: {
    changePrimarys(state,data) {
 	    state.primarys = data;
    }
	},
	actions: {
    //获取小学列表信息
    findAllPriamryData(context) {
   	  return new Promise((resolve,reject)=>{
        axios.get('/primary/findAllPrimaryList')
          .then(({data})=>{
           	context.commit('changePrimarys',data);
            resolve(data.data);
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
    }
	}
}