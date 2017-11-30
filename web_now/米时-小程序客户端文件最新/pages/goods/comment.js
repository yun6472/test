//index.js
//获取应用实例
var app = getApp()
var goodsId = 0
Page({
  data:{
        new:'',
        good: '',
        child: 'top-hoverd-btn',
        goodsMore: '../../res/images/more.png',
      //快捷导航
        navCont:[
            {
              title:'首页',
              url:"../index/index"
            },
            {
              title:'用户中心',
              url:"../user/user"
            }
          ],  
        indicatorDots: true,
        autoplay: true,
        interval: 4000,
        duration: 1000,
    //评论列表
            goodsComment:[
          {
            goodsCommentAdmin:'乐在晴天88',
            goodsCommentTime:'2016-12-22',
            goodsCommentCont:'质量特别好，服务一流,下次还会光临，服务一流,下次还会光临服务一流,下次还会光临服务一流,下次还会光临服务一流,下次还会光临！',
            goodsCommentSpecification:'xxxxl',
            goodsCommentColor:'褐色'
          },
          {
            goodsCommentAdmin:'我是用户名',
            goodsCommentTime:'2016-12-22',
            goodsCommentCont:'服务一流！',
            goodsCommentSpecification:'xxxxl',
            goodsCommentColor:'褐色'
          }
        ],
    
  },
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    goodsId = options.objectId;
    console.log(goodsId)
    wx.request({
      url: app.apiUrl("goods/detail"),
      data: {
        "id": goodsId,
      },
      method: "post",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.setData({
          goodsComment: res.data.data.goods_comment
        })
      }
    })
    //加载中
    this.loadingChange()
  },
//事件处理函数
  //头部菜单切换(商品 详情、评论)
    toNew: function(){
        console.log('new');
         this.updateBtnStatus('new');
         wx.navigateTo({
           url: "../goods/index?objectId=" + goodsId
       })
    },
    toGood: function(){
        console.log('good');
        this.updateBtnStatus('good');
        wx.navigateTo({
          url: "../goods/detail?objectId=" + goodsId
       })
    },
    toChild: function(){
        console.log('child');
         this.updateBtnStatus('child');
          wx.navigateTo({
            url: "../goods/comment?objectId=" + goodsId
       })
    },
    updateBtnStatus: function(k){
        this.setData({
            new: this.getHoverd('new', k),
            good: this.getHoverd('good', k),
            child: this.getHoverd('child', k),          
        });
    },
    getHoverd: function(src, dest){
        return (src === dest ?  'top-hoverd-btn' : '');
    },
    loadingChange() {
      setTimeout(() => {
        this.setData({
          hidden: true
        })
      }, 1000)
    },
})








