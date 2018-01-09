import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

import Film from "components/film/film";
import Rank from "components/rank/rank";
import Search from "components/search/search";
import FilmDetail from "components/film-detail/film-detail";
import RankItem from "src/components/rank-item/rank-item";




export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/film'
    },
    {
      path: '/film',
      component: Film,
      children:[

      ]
    },
    { path: '/film/:id', component: FilmDetail},
    {
      path: '/rank',
      component: Rank,
      children:[
        { path: ':id', component: RankItem},
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
