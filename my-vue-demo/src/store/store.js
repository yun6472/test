import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';




Vue.use(Vuex);

const state ={
  movies_id :0
};

const mutations = {
  changeMovies(state,movies_id){
    state.movies_id = movies_id;
  }
};


const actions = {

};

const getters = {
  changeMovies :state => state.movies_id
};

const debug = process.env.NODE_ENV !== 'production';

export default  new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
