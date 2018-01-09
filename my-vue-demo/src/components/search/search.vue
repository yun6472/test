<template>
  <div class="search">
    <mt-search
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
    <ul class="searchList" v-if="searchList.length>0">
      <li @click="chooseItem(item)" v-for="item in searchList">
        {{item.title}}
      </li>
    </ul>
    <transition name="slide-left">
      <router-view ></router-view>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import jsonp from 'src/common/js/jsonp'
  import { Search } from 'mint-ui';


  export default {
    data(){
      return{
        value:"",
        searchList:[]
      }
    },
    methods:{
      search(newVals){
        this._search(newVals).then((res) =>{
          this.searchList = res.subjects;
        });
      },
      _search(newVals){
        const url = `https://api.douban.com//v2/movie/search?q=${newVals}`;
        const data = "";
        return jsonp(url, data);
      },
      chooseItem(item){
        this.$router.push({
          path:`/film/${item.id}`
        });
      },
      lTrim(s) {
        if(s === null) {
          return "";
        }
        let whitespace = " \t\n\r";
        let str = s;
        if (whitespace.indexOf(str.charAt(0)) !== -1) {
          let j=0, i = str.length;
          while (j < i && whitespace.indexOf(str.charAt(j)) !== -1){
            j++;
          }
          str = str.substring(j, i);
        }
        return str;
      }
    },
    watch:{
      value:function(newVal,val){
        let newVals = this.lTrim(newVal);
        if(newVals === ""){
          return;
        }
        this.search(newVals);
      }
    }
  }


</script>

<style lang="scss" scope>
  .search{
    position: relative;
    .mint-search{
      height:calc(100vh - 100px);
    }
    .searchList{
      position: absolute;
      width:100%;
      top:44px;
      height:calc(100% - 100px);
      overflow-y: scroll;
      left:0;
      li{
        line-height:60px;
        color:#afafaf;
        font-size:16px;
        padding-left:15px;
        border-bottom:1px solid #ccc;
      }
    }
  }
</style>
