//index.js
//获取应用实例
var app = getApp()
var token
var url = app.apiUrl("store/detail")
var page = 1;
var per_page = 40;
var cate_key = "is_on_sale";
var sort = "sort_order";
var order ="ASC";
var cat_id = "0";
var storeList = function (that) {
  var token = wx.getStorageSync('token')
  var user_id = wx.getStorageSync('user_id')
  wx.request({
    url: url,
    data: {
      id: user_id,
      page: page,
      per_page: per_page,
      cate_key: cate_key,
      sort: sort,
      order: order,
      cat_id: cat_id
    },
    header: {
      'Content-Type': 'application/json',
      'X-ECTouch-Authorization': token
    },
    method: "POST",
    success: function (res) {
      res.data.category.unshift({ cat_name: "全部商品", cat_id: 0 });
      var lists = that.data.store_goods
      for (var i = 0; i < res.data.goods.length; i++) {
        lists.push(res.data.goods[i]);
      }
      that.setData({
        store_goods: res.data.goods
      });
      // page++;
      that.setData({
        hidden: true
      });
      that.setData({
        store_data: res.data,
        store_num: res.data.collnum,
        store_cont: res.data.detail.sellershopinfo,
        brandsCate: res.data.category,
        collect: (res.data.collect.ect == 1) ? 'true' : false
      })
    }
  })
}
Page({
  data: {
    store_goods:[],
    showAttention: true,
    showPrice: true,
    showTop: false,
    showBot: true,
    hiddenAll: false,
    hiddenNew: true,
    hiddenSale: true,
    hiddenCateAll: true,
    hiddenSynthesize: false,
    hiddenNum: true,
    hiddenPrice: true,
    cateName:"分类",
    currentItem:0,
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: (res.windowHeight - 50)
        });
      }
    });
    var user_id = options.objectId
    wx.setStorageSync('user_id', user_id)
    //初始化
    storeList(that);
    that.loadingChange()
  },
  loadingChange() {
    this.setData({
      hidden: false
    })
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },

  onChangeShowAttention: function () {
    var that = this
    var token = wx.getStorageSync('token')
    var user_id = wx.getStorageSync('user_id')
    wx.request({
      url: app.apiUrl("store/attention"),
      data: {
        id: user_id,
      },
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      method: "POST",
      success: function (res) {
        that.setData({
          collect: res.data.collect,
          store_num: res.data.collnum
        })
      }
    })
  },
  /**内容切换 */
  toAll: function (e) {
    var that = this
    this.setData({
      hiddenAll: false,
      hiddenNew: true,
      hiddenSale: true
    })
    
    cate_key = e.currentTarget.dataset.index
    storeList(that);
    that.loadingChange()
  },
  toNew: function (e) {
    var that = this
    that.setData({
      hiddenAll: true,
      hiddenNew: false,
      hiddenSale: true,
      store_goods: []
    })
     cate_key = e.currentTarget.dataset.index
     storeList(that);
    that.loadingChange()

  },
  toSale: function (e) {
    var that = this
    that.setData({
      hiddenAll: true,
      hiddenNew: true,
      hiddenSale: false,
      store_goods: []
    })
    cate_key = e.currentTarget.dataset.index
    storeList(that);
    that.loadingChange()
  },

  //全部分类
  toCateAll: function (e) {
    var that = this
    this.setData({
      hiddenCateAll: false,
      hiddenSynthesize: true,
      hiddenNum: true,
      hiddenPrice: true,
      store_goods: []
    })
    sort = e.currentTarget.dataset.index
    storeList(that);
    that.loadingChange()
  },
  toSynthesize: function (e) {
    var that = this
    this.setData({
      hiddenCateAll: true,
      hiddenSynthesize: false,
      hiddenNum: true,
      hiddenPrice: true,
      store_goods: []
    })
    sort = e.currentTarget.dataset.index
    storeList(that);
    that.loadingChange()
  },
  toNum: function (e) {
    var that = this
    this.setData({
      hiddenCateAll: true,
      hiddenSynthesize: true,
      hiddenNum: false,
      hiddenPrice: true,
      store_goods: []
    })
    sort = e.currentTarget.dataset.index
    storeList(that);
    that.loadingChange()
  },
  toPrice: function (e) {
    var that = this
    if (order == "DESC") {
      order = "ASC"
    } else {
      order = "DESC"
    }
    that.setData({
      hiddenCateAll: true,
      hiddenSynthesize: true,
      hiddenNum: true,
      hiddenPrice: false,
      showPrice: (!that.data.showPrice),
      showTop: (!that.data.showTop),
      showBot: (!that.data.showBot),
      store_goods: []
    })
    sort = e.currentTarget.dataset.index
    storeList(that);
    that.loadingChange()
  },
  //获取点击的id值
  siteDetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var goodsId = that.data.store_goods[index].goods_id;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    wx.navigateTo({
      url: "../goods/index?objectId=" + goodsId
    });
  },
  //分类弹框
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
  cascadeDismiss: function (e) {
    var id = e.currentTarget.dataset.id;
    this.animation.translateX(1000).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden',
      currentItem: id
    });
    cat_id = id
  },
  radioChange: function (e) {
    var that = this
    if (e.detail.value == "全部商品") {
      that.setData({
        cateName: "分类",
        store_goods: []
      })
    }else{
      that.setData({
        cateName: e.detail.value,
        store_goods: []
      })
    }
    storeList(that);

    that.loadingChange()
  },

  onPullDownRefresh() {
       var that = this
       var user_id = wx.getStorageSync('user_id')
    　　wx.showNavigationBarLoading() //在标题栏中显示加载
    　　wx.request({
        url: app.apiUrl("store/detail"),
        data: {
          id: user_id,
          page: page,
          per_page: per_page,
          cate_key: cate_key,
          sort: sort,
          order: order,
          cat_id: cat_id
        },
        header: {
          'Content-Type': 'application/json',
          'X-ECTouch-Authorization': token
        },  
      method: 'POST',
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
    }
})