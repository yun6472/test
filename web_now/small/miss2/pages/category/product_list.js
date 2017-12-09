var app = getApp()
var url = app.apiUrl("goods/list");
var id = 1;
var page = 1;
var per_page = 40;
var keyword = "";
var sort_key = "0";
var sort_value = "0";
var shop = 1;
// 获取数据的方法，具体怎么获取列表数据大家自行发挥

var GetList = function (that) {
  that.setData({
    hidden: false
  }); 
  if (sort_value == 1) {
    sort_value = 0
  } else {
    sort_value = 1
  }
 
  var token = wx.getStorageSync('token');

  wx.request({
    url: url,
    data: {
      id: id,
      page: page,
      per_page: per_page,
      shop: shop,
      keyword: keyword,
      sort_key: sort_key,
      sort_value: sort_value,
      warehouse_id: "1",
      area_id: "1"
    },
    method: "post",
    header: {
      'Content-Type': 'application/json',
      'X-ECTouch-Authorization': token
    },
    success: function (res) {
      that.setData({
        list: res.data.data,
        hidden: true
      });
    }
  });
}
Page({
  data: {
    loadingSize: '20',
    loadingColor: "#444444",
    current: "0",
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    maskVisual: 'hidden',
    currentItem: 0,
    currentPrice:0,
    showView: true,
    showPrice:true,
    brandsCate: [
      {
        data_id: "0",
        id: "0",
        name: "全部",
        checked:true
      },
      {
        data_id: "1",
        id: "1",
        name: "苹果"
      },
      {
        data_id: "2",
        id: "2",
        name: "三星"
      }
    ],
    hotrecent:[
      {
        id:"0",
        name:"0-500",
        checked: true
      },
      {
        id: "1",
        name: "501-1000"
      },
      {
        id: "2",
        name: "1001-10000"
      }
    ]
  },
  onLoad: function (e) {
    id = e.id || ''
    keyword = e.content || ''
    //   这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    //加载中
    this.loadingChange()
    page = 1;
    var that = this;
    GetList(that);
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },
  /*header*/
  bindHeaderTap: function (event) {
    var that = this
    that.setData({
      current: event.target.dataset.index,
    });
    page = 1;
    sort_key = event.target.dataset.index
    GetList(this)
  },


  goodsDetail: function (e) {
    var that = this
    //获取点击的id值
    var index = e.currentTarget.dataset.index;
    var goodsId = that.data.list[index].goods_id;

    wx.navigateTo({
      url: "../goods/index?objectId=" + goodsId
    });
  },
  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  onShow: function () {
    //   在页面展示之后先获取一次数据

  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop,
    });
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrollTop: 0
    })
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 1;
    this.setData({
      // list: [],
      scrollTop: 0
    });
    GetList(this)
  },

/*筛选*/
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  onChangeShowPrice: function () {
    var that = this;
    that.setData({
      showPrice: (!that.data.showPrice)
    })
  },

  cascadePopup: function () {

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-in-out'
    });
    this.animation = animation;
    animation.translateX(-1000).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show'
    })
  },
  //点击遮区域关闭弹窗
  cascadeDismiss: function () {
    this.animation.translateX(1000).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden'
    });
  },
/*品牌列表 */
  tagChoose: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    //设置当前样式
    that.setData({
      'currentItem': id
    })
  },

  tagPrice: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    //设置当前样式
    that.setData({
      'currentPrice': id
    })
  },

  radioChange: function (e) {
    var that= this
    that.setData({
      name: e.detail.value
    })
  },

priceChange: function (e) {
    var that = this
    that.setData({
      pricenName: e.detail.value
    })
  },
  switch2Change: function (e) {
  },

  onShareAppMessage: function () {
    return {
      title: '商品列表',
      desc: '小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App',
      path: '/pages/product_list/product_list'
    }
  }

})