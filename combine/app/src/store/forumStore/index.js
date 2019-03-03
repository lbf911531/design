import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    priamrys: []
	},
	getters: {
    priamrys: state => state.priamrys
	},
	mutations: {
    changePriamrys(state,data) {
 	    state.priamrys = data;
    }
	},
	actions: {
    //获取小学列表信息
    findAllPriamrys(context) {
   	  return new Promise((resolve,reject)=>{
        axios.get('/primary/findAll')
          .then(({data})=>{
           	context.commit('changePriamrys',data);
            resolve(data.data);
          })
          .catch((err)=>{
            reject(data.data);
          });
   	  });
    },
    //add or edit
    savePrimaryData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/primary/saveOrUpdate',qs.stringify(obj))
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