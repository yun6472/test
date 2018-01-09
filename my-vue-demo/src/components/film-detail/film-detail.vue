<template>
  <div class="card" v-if="filmList">
    <h1 class="title">{{filmList.title}}</h1>
    <section class="subject-info">
      <div class="right">
        <img  :src="filmList.images.medium" alt="芳华" class="cover" :onerror="onError" >
      </div>
      <div class="left">
        <p class="rating">
          <star class="star" :size="36" :score="rating(average)"></star>
          <strong>{{average}}</strong>
          <span>{{filmList.ratings_count}}人评价</span>
        </p>

        <p class="meta" v-html="filmSubTitle()"></p>
      </div>
    </section>
    <section class="subject-intro">
      <h2>{{filmList.original_title}}的剧情简介</h2>
      <div class="bd" style="position: static;">
        <p>{{filmList.summary}}</p>
      </div>
    </section>
    <section class="celebrities">
      <h2>影人</h2>
      <div class="section-content">
        <ul class="items" >
          <li class="item_celebrity" v-for="item in filmList.directors">
            <img :src="item.avatars.medium" :onerror="onError" />
            <span>{{item.name}}</span>
          </li>
          <li class="item_celebrity" v-for="item in filmList.casts">
            <img :src="item.avatars.medium" :onerror="onError" />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex"
  import jsonp from 'src/common/js/jsonp'
  import Star from 'src/base/star/star'
  import {Indicator} from "mint-ui"


  export default {
    data() {
      return {
        filmList: "",
        average:0,
        onError:'this.src="' + require('../../common/images/default.png') + '"',
        paramsId:this.$route.params.id
      }
    },
    created() {
      this.getMoviesDetail();
      Indicator.open();
    },

    methods: {
      getMoviesDetail() {
        this._getMoviesDetail().then((res) => {
          this.filmList = res;
          this.average = res.rating.average;
          Indicator.close();
        }).catch(res =>{
          Indicator.close();
        });
      },
      rating(ratings){
        return (parseInt(ratings)/2);
      },
      filmSubTitle(){
        if(this.filmList === ""){
          return;
        }
        let str = "";
        str += this.filmList.directors[0].name;
        let genres = this.filmList.genres;

        for(let i=0;i<genres.length;i++){
          str += " / "+genres[i];
        }

        let casts = this.filmList.casts;
        for(let i=0;i<casts.length;i++){
          str += " / "+casts[i].name;
        }
        return str;
      },
      _getMoviesDetail() {
        const url = `https://api.douban.com/v2/movie/subject/${this.paramsId}`;
        const data = "";
        return jsonp(url, data);
      }
    },
    watch:{
      '$route' (to, from) {
        // 对路由变化作出响应...
        if(!to.params.id){
          return;
        }
        Indicator.open();
        this.filmList = "";
        this.paramsId = to.params.id;
        this.getMoviesDetail();
      }
    },
    computed: {
      /* ...mapGetters([
         'changeMovies'
       ])*/
    },
    components:{
      Star
    }
  }
</script>

<style lang="scss" scope>
  .card{
    margin: 0 18px;
    .title{
      margin: 30px 0 5px;
      font-size: 24px;
      line-height: 32px;
      word-break: break-all;
    }
    .subject-info {
      position: relative;
      margin-bottom: 30px;
      overflow: hidden;
      .right {
        float: right;
        .cover{
          width:100px;
        }
      }
      .left{
        margin-right: 100px;
        padding-bottom: 30px;
        .meta{
          color: #494949;
          margin-top: 15px;
          padding-right: 24px;
          font-size: 14px;
          line-height: 1.6;
        }
        .rating{
          .star{
            float: left;
          }
        }
      }
    }
    .subject-intro{
      margin-bottom:30px;
      h2{
        color: #aaa;
        margin: 0 0 15px;
        font-size: 15px;
      }
      p{
        font-size: 15px;
        color: #494949;
        line-height: 22px;
        word-wrap: break-word;
      }
    }
    .celebrities{
      margin-bottom: 30px;
      h2{
        color: #aaa;
        margin: 0 0 15px;
        font-size: 15px;
      }
      .items {
        font-size: 0;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        .item_celebrity{
          font-size: 14px;
          width: 75px;
          margin-left: 0.48rem;

          display: inline-block;
          vertical-align: top;
          text-align: center;
          &:first-child{
            margin-left:0;
          }
          img{
            width:100%;
          }
          span{
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            font-size: 14px;
            line-height: 1.5;
            white-space: normal;
            text-align: center;
            color: #494949;
            margin-top: 8px;
          }
        }
      }


    }
  }
</style>
