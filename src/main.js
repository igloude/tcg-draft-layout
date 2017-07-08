import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/Hello.vue'
import Draft from './components/Draft.vue'

require('./scss/main.scss');

const routes = [
  { path: '/', component: Hello },
  { path: '/draft', component: Draft },
];

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
});

new Vue({
    el: '#app',
    router,
});
