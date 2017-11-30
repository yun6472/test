<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--keep-alive可以把dom缓存到内存中 减少请求  -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'src/components/m-header/m-header'
  import Tab from 'src/components/tab/tab'
  import Player from 'src/components/player/player'
  export default {
    components:{
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
