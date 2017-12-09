<template>
  <div class="film">

    <scroll ref="scroll" class="film-wrapper" :data="moviesList">
      <div>
        <h3 class="title">{{title}}</h3>
        <ul>
          <li v-for="item in moviesList">
            <img :src="item.images.medium" width="100" height="140" />
            <p class="film-title">{{item.title}}</p>
            <p class="directors">导演：<span v-for="name in item.directors">{{name.name}}</span></p>
            <p class="collect">评论人数：{{item.collect_count}}</p>
            <p class="rating"><star :size="24" :score="rating(item.rating.average)"></star> {{item.rating.average}}</p>
            <p class="year">上映年份：{{item.year}}</p>
          </li>
        </ul>
      </div>
    </scroll>
  </div>

</template>

<script type="text/ecmascript-6">
  import Star from 'src/base/star/star'
  import axios from 'axios'
  import jsonp from 'src/common/js/jsonp'
  import Scroll from 'src/base/scroll/scroll'

  export default {
    data(){
      return{
        title:"",
        moviesList :[]
      }
    },
    created(){
     this.getMovies();
    },
    methods:{
      getMovies(){
        this._getMoviesList().then((res) =>{
          this.title = res.title;
          this.moviesList =  res.subjects;
          console.log(this.moviesList);
        })
      },
      _getMoviesList(){
        const url = "https://api.douban.com/v2/movie/in_theaters";
        const data = "";
        return jsonp(url, data);
      },
      rating(ratings){
        return (parseInt(ratings)/2);
      }
    },
    computed:{

    },
    components:{
      Star,
      Scroll
    }
  }
</script>

<style lang="scss" scope>
  @import "../../common/style/reset.scss";

  .film{
    position: fixed;
    top:42px;
    width: 100%;
    left:0;
    bottom: 0;
    .title{
      width:100%;
      padding:15px 0;
      text-align: center;
      font-size:18px;
      border-bottom:1px solid $border-color;
    }
    .film-wrapper{
      height: 100%;
      overflow: hidden;
      ul{
        li{
          overflow: hidden;
          padding:10px;
          border-bottom: 1px solid $border-color;
          img{
            float: left;
            padding-right: 20px;
          }
          .film-title{
            font-size: 20px;
            line-height:30px;
          }
          .directors,.collect{
            font-size: 14px;
            color:#333;
            line-height:24px;
            span{
              padding-left: 5px;
            }
          }
          .rating{
            .star{
              display: inline-block;
            }
            font-size: 14px;
            line-height:20px;
          }
          .year{
            font-size: 14px;
            color:#333;
          }
        }
      }
    }
  }
</style>
