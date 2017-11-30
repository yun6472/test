var app = getApp()
var token
Page({
  data: {
    userInfo: {},
    userLists: [
      // {
      //   name: "我的资金",
      //   pic: "icon-yue1",
      //   link: "../account/index"
      // },
      // {
      //   name: "优惠券",
      //   pic: "icon-youhuiquan",
      //   link: "../user/coupons"
      // },
      {
        name: "收货地址",
        pic: "icon-shouhuodizhi1",
        link: "../address/index"
      },

      {
        name: "商品收藏",
        pic: "icon-shoucang1",
        link: "../user/collect"
      },

      // {
      //   name: "我要代言",
      //   pic: "icon-daiyanren",
      //   link: "../user/speak"
      // },
      {
        name: "我的帮助",
        pic: "icon-bangzhu",
        link: "../user/help"
      },
      // {
      //   name: "普通发票",
      //   pic: "icon-bangzhu",
      //   link: "../flow/invoice"
      // },
    ],
    userMoney: [
      {
        link: "../account/account",
        num: '26963.00',
        cont: "余额"
      },
      {
        link: "../classify/classify",
        num: '1',
        cont: "红包"
      },
      {
        link: "../classify/classify",
        num: '5630',
        cont: "积分"
      },
      {
        link: "../classify/classify",
        num: '0',
        cont: "优惠券"
      },

    ],
  },
  bindProfile: function () {
    wx.navigateTo({
      url: '../profile/profile'
    })
  },
  bindMoney: function () {
    wx.navigateTo({
      url: '../account/account'
    })
  },
  bindOrder: function () {
    wx.navigateTo({
      url: "../user_order/order"
    })
  },

  onShow: function () {
    var that = this
    // 获取用户数据
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl("user"),
      data: {
        per_page: "10",
        page: "1"
      },
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      method: "POST",
      success: function (res) {
        that.setData({
          recommend: res.data.data.best_goods,
          orderNum: res.data.data.order
        })

      }
    })
    //加载中
    this.loadingChange()
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

  //获取点击的id值
  siteDetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    // console.log(index)
    var goodsId = that.data.recommend[index].goods_id;
    //  console.log(goodsId)
    wx.navigateTo({
      url: "../goods/index?objectId=" + goodsId
    });
  },
  invoiceNav: function (e) {
    var that = this
    token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl("user/invoice/detail"),
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        if (res.data.data != false) {
          wx.navigateTo({ url: '../invoice/detail' })
        } else {
          wx.navigateTo({ url: '../invoice/create' })
        }
        that.setData({
          invoices: res.data.data
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '小程序首页',
      desc: '小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App',
      path: '/pages/user/user'
    }
  }


})