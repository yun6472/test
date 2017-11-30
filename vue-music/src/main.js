import 'babel-polyfill'
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import fastclick from 'fastclick';
import VueLazyLoad from  'vue-lazyload'

import 'common/stylus/index.styl';

Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
});

fastclick.attach(document.body);

new Vue({
  el: "#app",
  router,
  store,
  render:h =>h(App)
});
