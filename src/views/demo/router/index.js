import Vue from 'vue'
import Router from 'vue-router'

import Test from '../test'
import Index from '../App'

const _import = require('./_import_' + process.env.NODE_ENV)
// const Test = _import('demo/test/index')
// const Index = _import('demo/App')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
	{
	  path: '/test',
	  name: 'test',
	  component: Test
	},
	{
	  path: '/index',
	  name: 'index',
	  component: Index
	}
  ]
})

export default router