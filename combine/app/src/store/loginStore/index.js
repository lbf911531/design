import axios from '../axios'
import qs from 'qs';

export default {
  state: {
    user: window.sessionStorage.getItem('user'),
    token: window.sessionStorage.getItem('token'),
    userInfo: {},
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    //将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.token = data
      window.sessionStorage.setItem('token', data)
    },
    //获取用户名
    GET_USER: (state, data) => {
      // 把用户名存起来
      state.user = data
      window.sessionStorage.setItem('user', data)
    },
    //登出
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.token = null
      state.user = null
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
    },
    changeUserInfo(state,data) {
      state.userInfo = data;
    }
  },
  actions: {
    /**
     * 登录
     */
    toLogin(context,obj) {
       return new Promise((resolve,reject)=>{
        axios.post('/user/login',qs.stringify(obj))
          .then(({data})=>{
            console.log(data);
            context.commit('SET_TOKEN',data.token);
            context.commit('GET_USER',data.user);
            context.commit('changeUserInfo',data.res[0] || {});
            resolve(data);
          })
          .catch((err)=>{
             reject(err);
          });
      });
    },
    /**
     * 找回密码
     */
    toFindPwdAndChange(context, obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/user/password/find',qs.stringify(obj))
          .then(res=>{
            resolve(res);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    },
    /**
     * 注册
     */
    toRegister(context, obj) {
      return new Promise((resolve,reject)=>{
        axios.post('/user/register',qs.stringify(obj))
          .then(res=>{
            resolve(res);
          })
          .catch((err)=>{
            reject(err);
          });
      });
    }
  }
}
