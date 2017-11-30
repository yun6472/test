import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'src/components/recommend/recommend';
import Rank from 'src/components/rank/rank';
import Search from 'src/components/search/search';
import Singer from 'src/components/singer/singer';
import SingerDetail from 'src/components/singer-detail/singer-detail';
import Disc from 'src/components/disc/disc'
import topList from 'src/components/top-list/top-list'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[
        {
          path:':id',
          component:Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children:[
        {
          path:':id',
          component:topList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    }
  ]
})
