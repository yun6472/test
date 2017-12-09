import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);


/**/
const Film = (resolve) =>{
  import('components/film/film').then((module) =>{
    resolve(module);
  })
};

const Rank = (resolve) =>{
  import('components/rank/rank').then((module) =>{
    resolve(module);
  })
};

const Search = (resolve) =>{
  import('components/search/search').then((module) =>{
    resolve(module);
  })
};

export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/film'
    },
    {
      path:'/film',
      component:Film
    },
    {
      path:'/rank',
      component:Rank
    },
    {
      path:'/search',
      component:Search
    },
  ]
})
