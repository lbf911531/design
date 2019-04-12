import Vue from 'vue';
import Vuex from 'vuex';
import primaryStore from './primaryStore';
import juniorStore from './juniorStore';
import seniorStore from './seniorStore';
import universityStore from './universityStore';
import forumStore from './forumStore';
import loginStore from './loginStore';
import homeStore from './homeStore';

Vue.use(Vuex);

export default new Vuex.Store({
   modules:{
   	   primaryStore,
   	   juniorStore,
   	   seniorStore,
   	   universityStore,
   	   forumStore,
       loginStore,
       homeStore
   }
})
