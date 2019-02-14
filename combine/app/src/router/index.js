import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Primary from '@/components/primary-school'
import Junior from '@/components/junior-high-school'
import JuniorOver from '@/components/junior-high-school/junior-over-info'
import JuniorFriends from '@/components/junior-high-school/junior-friends-info'
import Senior from '@/components/senior-high-school'
import University from '@/components/university'
import Forum from '@/components/forum'

Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/',
       name: 'Home',
       component: Home,
       children: [
          {
            path: '/primary-school',
            name: 'Primary',
            component: Primary
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
              }
            ]
          },{
            path: '/senior-high-school',
            name: 'Senior',
            component: Senior
          },{
            path: '/university',
            name: 'University',
            component: University
          },{
            path: '/forum',
            name: 'Forum',
            component: Forum
          }
        ]
    }
  ]
})
