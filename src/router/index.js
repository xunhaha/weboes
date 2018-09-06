import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index.vue'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import main from '@/pages/index/main.vue'
import myexam from '@/pages/index/myexam.vue'
import myscore from '@/pages/index/myscore.vue'
import about from '@/pages/index/about.vue'
import center from '@/pages/index/center.vue'
import examing from '@/pages/examing.vue'
import adminindex from '@/pages/adminindex.vue'
import adminlogin from '@/pages/adminlogin.vue'
import adminclass from '@/pages/index/adminclass.vue'
import adminexam from '@/pages/index/adminexam.vue'
import adminquestion from '@/pages/index/adminquestion.vue'
import adminclassinfo from '@/pages/index/adminclassinfo.vue'
import adminscore from '@/pages/index/adminscore.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        { path: '/', name: 'main', component: main },
        { path: '/myexam', name: 'myexam', component: myexam },
        { path: '/myscore', name: 'myscore', component: myscore },
        { path: '/center', name: 'center', component: center },
        { path: '/about', name: 'about', component: about }
      ],
      meta: {
        title: '首页'
      }
    },
    {
      path: '/adminindex/adminclass',
      name: 'adminindex',
      component: adminindex,
      children:[
        { path: '/adminindex/adminclass', name: 'adminclass', component: adminclass },
        { path: '/adminindex/adminexam', name: 'adminexam', component: adminexam },
        { path: '/adminindex/adminquestion', name: 'adminquestion', component: adminquestion },
        { path: '/adminindex/adminclassinfo', name: 'adminclassinfo', component: adminclassinfo },
        { path: '/adminindex/adminscore', name: 'adminscore', component: adminscore }
      ],
      meta: {
        title: '管理员首页'
      }
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: adminlogin,
      meta: {
        title: '管理员登录'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '考生登录'
      }
    },
    {
      path: '/examing',
      name: 'examing',
      component: examing,
      meta: {
        title: '考试系统'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '考生注册'
      }
    }
  ]
})
