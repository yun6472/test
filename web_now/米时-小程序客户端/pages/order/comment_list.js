var app = getApp()
var token
Page({
  data: {
    commentList: ""
  },
  onLoad: function () {
    var that = this
    var token = wx.getStorageSync('token')
    //调用应用实例的方法获取全局数据
    wx.request({
      url: app.apiUrl("user/order/appraise"),
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.setData({
          commentList: res.data.data
        })
      }
    })

    //加载中
    this.loadingChange();
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },

  commentBtn: function (e) {
    var that = this
    var oid = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var goodsId = that.data.commentList[index].id;
    wx.navigateTo({
      url: "../order/comment_detail?objectId=" + goodsId + "&oid=" + oid,
    });
  },
  //获取点击的id值
  siteDetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var goodsId = that.data.commentList[index].id;
    wx.navigateTo({
      url: "../goods/index?objectId=" + goodsId 
    });
  },
  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    var that = this
    this.getCartGoods(that);
    wx.stopPullDownRefresh()
    that.onLoad()

  },


})