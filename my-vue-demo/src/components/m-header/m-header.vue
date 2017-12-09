<template>
 <div class="header">
       <router-link tag="div" class="tab-item" to="/film">正在热映</router-link>
       <router-link tag="div" class="tab-item" to="/rank">排行榜</router-link>
       <router-link tag="div" class="tab-item" to="/search">搜索</router-link>
 </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        doChange:"film"
      }
    }
  }
</script>
<style lang="scss" scope>
  @import "../../common/style/reset";

  .header{
    display: flex;
    .tab-item{
      flex: 1;
      text-align: center;
      line-height:40px;
      font-size: 16px;
      color:$border-color;
      border-bottom:2px solid $border-color;
      &.router-link-active{
        border-bottom:2px solid $border-color;
        border-color: $base-color;
        color:$base-color;
      }
    }
  }
</style>
