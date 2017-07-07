import Vue from 'vue'
import Draft from './components/Draft.vue'
import Player from './components/Player.vue'

require('./scss/main.scss');

var player = new Vue({
        el: '#player',
        render: h => h(Player)
})

var draft = new Vue({
        el: '#draft',
        render: h => h(Draft)
})
