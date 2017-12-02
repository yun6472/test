var app = getApp()
Page({
  data: {
    searchColor: 'rgba(0,0,0,0.4)',
    searchSize: '16',
    searchName:"输入搜索的商品名称",
    hidden: false,
    curNav: 1,
    curIndex: 0,
    cateLeft: [],
    cateRight: [],
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: app.apiUrl("category"),
      method: "post",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          cateLeft: res.data.data,
           curNav: res.data.data[0].id,
          cateRight: res.data.data,
         
        })
        //找到返回值的二级分类值
        // console.log(that.data.cateRight[0].cat_id)
      }
    })
    //加载中
    this.loadingChange()
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },
  //事件处理函数
  //获取相对应的索引
  selectNav(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index,
      scrollTop: 0
    })
  },
  // 搜索链接
  bindSearchTap: function () {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '订单确认',
      desc: '小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App',
      path: '/pages/categroy/index'
    }
  }
})




