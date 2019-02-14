import axios from '../axios'
import qs from 'qs';

export default {
	state: {
    juniors: [],
    juniorFs: [],
	},
	getters: {
    juniors: state => state.juniors,
    juniorFs: state => state.juniorFs
	},
	mutations: {
    changeJuniors(state,data) {
 	    state.juniors = data;
    },
    changeJuniorFs(state,data) {
      state.juniorFs = data;
    }
	},
	actions: {
    //获取初中列表信息
    findAllJuniorOverData(context) {
   	  return new Promise((resolve,reject)=>{
        axios.get('/junior/findAll')
          .then(({data})=>{
           	context.commit('changeJuniors',data);
          })
          .catch((err)=>{
            console.log(err);
          });
   	  });
    },
    //add or edit
    saveOrEditJuniorData(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/junior/saveOrUpdate',qs.stringify(obj))
          .then(function(param){
            resolve(param);
          })
          .catch(function(error){
            reject(error);
          })
      });
    },
    //find junior friend
    findAllJuniorFriendsData(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/junior/findFriends')
          .then(({data})=>{
            context.commit('changeJuniorFs',data);
          })
          .catch((err)=>{
            console.log(err);
          });
      });
    },
    // change relationship
    changeRelationship(context,obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/junior/deleteFriends',{params: {id: obj.id}})
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