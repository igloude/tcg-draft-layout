import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/Hello.vue'
import Draft from './components/Draft.vue'
import Results from './components/Results.vue'

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
      path: '/results/:draft_id/:player_id',
      name: 'results',
      component: Results
  },
];

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
});

const app = new Vue({
  router
}).$mount('#app')
