import axios from '../axios'
import qs from 'qs';

export default {
  state: {
    userCollection: [],
    curUserInfo: {},
  },
  getters: {
    userCollection: state => state.userCollection,
    curUserInfo: state => state.curUserInfo,
  },
  mutations: {
    changeUserCollection(state,data) {
      state.userCollection = data;
    },
    changeCurUserInfo(state,data) {
      state.curUserInfo = data;
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
    getCurUserById(context,id) {
      return new Promise((resolve,reject)=>{
        axios.get(`/user/data/find/by/id?id=${id}`)
          .then(({data})=>{
            context.commit('changeCurUserInfo',data);
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
    },
    changePortraitUrl(context,obj) {
      return new Promise((resolve,reject) => {
        axios.post('/user/data/portrait/change',qs.stringify(obj))
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
