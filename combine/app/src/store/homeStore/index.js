import axios from '../axios'
import qs from 'qs';

export default {
  state: {
    userCollection: [],
  },
  getters: {
    userCollection: state => state.userCollection
  },
  mutations: {
    changeUserCollection(state,data) {
      state.userCollection = data;
    }
  },
  actions: {
    getUserCollection(context) {
      return new Promise((resolve,reject)=>{
        axios.get('/user/data/find/all')
          .then(({data})=>{
            context.commit('changeUserCollection',data);
            resolve(data);
          })
          .catch((err)=>{
            reject(err);
          });
   	  });
    },
    batchAssignPer(context,obj) {
      return new Promise((resolve,reject) => {
        axios.post('/user/data/batch/assign/permission',qs.stringify(obj))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
  }
}
