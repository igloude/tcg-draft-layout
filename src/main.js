import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/Hello.vue'
import Draft from './components/Draft.vue'

Vue.use(VueRouter)

require('./scss/main.scss');

new Vue({
    el: '#hello',
    render: h => h(Hello)
})


new Vue({
    el: '#draft',
    render: h => h(Draft)
})
