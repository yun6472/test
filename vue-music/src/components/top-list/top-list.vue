<template>
  <transition name="slide">
    <music-list
      :songs="songs"
      :title="title"
      :rank="rank"
      :bg-image="bgImage">
    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    computed:{
      title(){
        return this.topList.topTitle
      },
      bgImage(){
        if(this.songs.length){
          return this.songs[0].image
        }else{
          return this.topList.picUrl
        }

      },
      ...mapGetters([
        'topList'
      ])
    },
    created(){
        this._getMusicList()
    },
    data(){
      return{
        songs:[],
        rank:true
      }
    },
    methods:{
      _getMusicList(){
        getMusicList(this.topList.id).then((res) =>{
          if(!this.topList.id){
            this.$router.push("/rank");
            return;
          }
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.songlist);
          }
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((item) =>{
          const musicData = item.data;
          if(musicData.songid && musicData.albumid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components:{
      MusicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"



  .slide-enter-active,.slide-leave-active
    transition:all 0.3s
  .slide-enter,.slide-leave-to
    transform :translate3d(100%,0,0);
</style>
