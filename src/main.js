import Vue from 'vue'
import App from './App.vue'
import {ServerTable, ClientTable, Event} from 'vue-tables-2'

Vue.use(ClientTable);

new Vue({
  el: '#app',
  render: h => h(App)
})
