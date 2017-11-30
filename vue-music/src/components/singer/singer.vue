<template>
    <div class="singer" ref="singer">
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">

  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import {ERR_OK} from 'api/config'
  import ListView from "base/listView/listView"
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  const HOT_NAME ="热门";
  const HOT_SINGER_LENGTH = 10;

  export default {
    mixins:[playlistMixin],
    data(){
      return{
        singers:[]
      }
    },
    created(){
      this._getSingerList()
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh();
      },
      selectSinger(singer){
        this.$router.push({
          path:`/singer/${singer.id}`
        })
        /*vuex*/
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list){
        /**
         * 要进行数据的格式化
         * 首先创建一个对象map
         * let map ={
         * 对象里面需要分hot和其他的首字母
         * hot则取前面的十条数据
         * hot：{
         *    title:"热门",
         *    items:[]
         *  }
         * }
         * 然后对list进行forEach遍历
         * list.forEach((item,index) =>{
         * 把前面10条放到hot里面
         *  if(index<10){
         *    map.hot.items.push(数据);
         *  }
         *
         *  判断map里面有没有这个字母如果是第一次出现就创建这个字母
         *  let key = item.Findex;
         *
         *  if(!map[key]){
         *    map[key]:{
         *      title:key,
         *      items:[]
         *    }
         *  }
         *
         *
         *  map[key].push(数据)
         * })
         * **/
        let map = {
          hot:{
            title:HOT_NAME,
            items:[]
          }
        };
        list.forEach((item, index) =>{
          if( 0<index &&index<HOT_SINGER_LENGTH+1){
            map.hot.items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
            }))
          }
          const key = item.Findex;
          if(!map[key]){
            map[key] ={
              title:key,
              items:[]
            }
          }
          map[key].items.push(new Singer({
            id:item.Fsinger_mid,
            name:item.Fsinger_name
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        /*vuex*/
        setSinger:'SET_SINGER'
      })
    },
    components:{
      ListView
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width:100%
</style>
