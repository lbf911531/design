import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import HomePage from '@/components/home/homepage'
import Primary from '@/components/primary-school'
import Junior from '@/components/junior-high-school'
import JuniorOver from '@/components/junior-high-school/junior-over-info'
import JuniorFriends from '@/components/junior-high-school/junior-friends-info'
import JuniorBlacklist from '@/components/junior-high-school/junior-blacklist'
import Senior from '@/components/senior-high-school'
import SeniorOver from '@/components/senior-high-school/senior-over-info'
import SeniorFriends from '@/components/senior-high-school/senior-friends-info'
import SeniorOthers from '@/components/senior-high-school/senior-other-info'
import SeniorTeachers from '@/components/senior-high-school/senior-teachers-info'
import University from '@/components/university'
import UniversityClass from '@/components/university/university-classmate-info'
import UniversityDep from '@/components/university/university-department-info'
import UniversitySchool from '@/components/university/university-school-info'
import Forum from '@/components/forum'
import Comments from '@/components/forum/comments'
import Login from '@/components/login'
import FindPwd from '@/components/login/findMyPwd'
import Register from '@/components/login/register'
import NotFound from '@/components/notFound'


import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
          {
            path: '/homepage',
            name: 'HomePage',
            component: HomePage,
            meta: {
              requireAuth: true
            }
          },{
            path: '/primary-school',
            name: 'Primary',
            component: Primary,
            meta: {
              requireAuth: true
            }
          },{
            path: '/junior-high-school',
            name: 'Junior',
            component: Junior,
            children: [
              {
                path: 'junior-over-info',
                name: 'JuniorOver',
                component: JuniorOver
              },{
                path: 'junior-friends-info',
                name: 'JuniorFriends',
                component: JuniorFriends
              },{
                path: 'junior-blacklist',
                name: 'JuniorBlacklist',
                component: JuniorBlacklist
              }
            ],
            meta: {
              requireAuth: true
            }
          },{
            path: '/senior-high-school',
            name: 'Senior',
            component: Senior,
            children: [
              {
                path: 'senior-over-info',
                name: 'SeniorOver',
                component: SeniorOver
              },{
                path: 'senior-friends-info',
                name: 'SeniorFriends',
                component: SeniorFriends
              },{
                path: 'senior-other-info',
                name: 'SeniorOthers',
                component: SeniorOthers
              },{
                path: 'senior-teachers-info',
                name: 'SeniorTeachers',
                component: SeniorTeachers
              }
            ],
            meta: {
              requireAuth: true
            }
          },{
            path: '/university',
            name: 'University',
            component: University,
            children: [
              {
                path: 'university-classmate-info',
                name: 'UniversityClass',
                component: UniversityClass
              },{
                path: 'university-department-info',
                name: 'UniversityDep',
                component: UniversityDep
              },{
                path: 'university-school-info',
                name: 'UniversitySchool',
                component: UniversitySchool
              }
            ],
            meta: {
              requireAuth: true
            }
          },{
            path: '/forum',
            name: 'Forum',
            component: Forum,
            meta: {
              requireAuth: true
            }
          },{
            path: '/forum/comments/:id',
            name: 'Comments',
            component: Comments,
            meta: {
              requireAuth: true
            }
          }
      ],
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/findMyPwd',
      name: 'FindPwd',
      component: FindPwd
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // const token = store.state.token;
  const token = window.sessionStorage.getItem('token');
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆');
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router;
