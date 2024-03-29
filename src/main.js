// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.styl'
import './assets/css/sidebar.css'

import App from './App'
import router from './router'
import store from './store'

// icons
import './assets/icons'

Vue.config.productionTip = false

Vue.prototype.IMGURL = process.env.IMG_API

Vue.use(Element)

// global filters
import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
