import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar

import Layout from '@/components/Layout'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},{
			path: '',
			component: Layout,
			children: [
				{
					path: '/',
					name: 'home',
					meta: { title: '首页' },
					component: () => import ('../components/Home')
				},{
					path: '/merchant',
					name: 'merchant',
					meta: { title: '商家管理' },
					component: () => import ('../components/Merchant')
				},{
					path: '/savemerchant',
					name: 'savemerchant',
					meta: { title: '添加/编辑商家' },
					component: () => import ('../components/Merchant/Save')
				},{
					path: '/activity',
					name: 'activity',
					meta: { title: '活动管理' },
					component: () => import ('../components/Activity')
				},{
					path: '/user',
					name: 'user',
					meta: { title: '用户管理' },
					component: () => import ('../components/System/User')
				},{
					path: '/saveuser',
					name: 'saveuser',
					meta: { title: '添加/编辑用户' },
					component: () => import ('../components/System/User/Save')
				},{
					path: '/role',
					name: 'role',
					meta: { title: '角色管理' },
					component: () => import ('../components/System/Role')
				},{
					path: '/saverole',
					name: 'saverole',
					meta: { title: '添加/编辑角色' },
					component: () => import ('../components/System/Role/Save')
				}
			]
		}
	]
})

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
        NProgress.done()
    } else {
        /* has no token*/
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
        NProgress.done()
    }
})

export default router
