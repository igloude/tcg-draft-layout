import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/Hello.vue'
import Draft from './components/Draft.vue'
import Summary from './components/Summary.vue'

require('./scss/main.scss');

const routes = [
  {
      path: '/',
      name: 'hello',
      component: Hello
  },
  {
      path: '/draft/:draft_id/:player_id',
      name: 'draft',
      component: Draft
  },
  {
      path: '/summary/:draft_id/:player_id',
      name: 'summary',
      component: Summary
  },
];

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
});

const app = new Vue({
  router
}).$mount('#app')
