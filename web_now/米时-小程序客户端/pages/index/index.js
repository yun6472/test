var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmap = new QQMapWX({ key: "XSYBZ-P2G34-3K7UB-XPFZS-TBGHT-CXB4U" })
var token
Page({
  data: {
    hidden: false,
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    banners: [],    //轮播图
    activityLeft: [],//左广告位
    activityRight: [], //右广告位
    boutiqueList: [],//精品商品推荐
    indexGoods: [],//猜你喜欢
    headerSearch: {//搜索
      searchSize: '17',
      searchColor: 'rgba(255,255,255,.8)',
      classifyUrl: "../../images/fenlei.png",
      name: "搜索商品",
    },
    hasLocation: false
  },
  onLoad: function () {
    var that = this
    //推荐商品列表
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl("index"),
      method: "POST",
      success: function (res) {
        that.setData({
          banner: res.data.data.banner,
          activityLeft: res.data.data.adsense[0],
          activityRight: res.data.data.adsense.splice(1, 2),
          boutiqueList: res.data.data.goods_list,
          indexGoods: res.data.data.goods_list
        })
      }
    })
    //加载中
    this.loadingChange();
    that.getLocation();
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },

  //获取点击的id值
  siteDetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var goodsId = that.data.indexGoods[index].goods_id;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    wx.navigateTo({
      url: "../goods/index?objectId=" + goodsId
    });
  },
  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 搜索链接
  bindSearchTap: function () {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  bindCateTap: function () {
    wx.switchTab({
      url: '../category/index'
    })
  },
  chooseLocation: function () {
    var that = this
    var token = wx.getStorageSync('token')
    wx.chooseLocation({
      success: function (res) {
        wx.setStorageSync('currentPosition', res)
        var lat = res.latitude;
        var lon = res.longitude;
        qqmap.reverseGeocoder({
          location: {
            latitude: lat,
            longitude: lon
          },
          success: function (res) {
            wx.request({
              url: app.apiUrl('location/specific'),
              data: {
                address: res.result.address_component.city,
              },
              method: 'POST',
              header: {
                'Content-Type': 'application/json',
                'X-ECTouch-Authorization': token
              },
              success: function (res) {
                that.setData({
                  address: res.address,
                })
              }
            })
            var addess
            if (res.result.address_component.province == res.result.address_component.city) {
              addess = res.result.address_component.city
            } else {
              addess = res.result.address_component.city
            }
            that.setData({
              hasLocation: true,
              address: addess,
            })
          },
          fail: function (res) {
          },
        });

      }
    })
  },
  //获取当前定位
  getLocation: function () {
    var that = this
    wx.getLocation({
      success: function (res) {
        //缓存当前位置坐标
        var value = wx.getStorageSync('currentPosition')
        if (value) {
          that.transformRegion(value)
        } else {
          wx.setStorageSync('currentPosition', res)
          that.transformRegion(res)
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '温馨提示',
          content: '不允许定位,会对地区商品价格有影响，请确认，去重新允许！',
          success: function (res) {
            if (res.confirm) {
              wx.getSetting({
                success(res) {
                  wx.openSetting({
                    success: function (res) {
                      if (!res.authSetting["scope.userLocation"]) {
                        that.getLocation()
                      } else {
                        wx.getLocation({
                          success: function (res) {
                            //缓存当前位置坐标
                            var value = wx.getStorageSync('currentPosition')
                            if (value) {
                              that.transformRegion(value)
                            } else {
                              wx.setStorageSync('currentPosition', res)
                              that.transformRegion(res)
                            }
                          },
                        })
                      }
                    }
                  })
                },
              })
            } else if (res.cancel) {
              that.getLocation()
            }
          },
        })

      },
    })

  },
  transformRegion: function (res) {
    var that = this
    var lat = res.latitude;
    var lon = res.longitude;
    qqmap.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lon
      },
      success: function (res) {
        var addess
        if (res.result.address_component.province == res.result.address_component.city) {
          addess = res.result.address_component.city
        } else {
          addess = res.result.address_component.city
        }
        that.setData({
          hasLocation: true,
          address: addess,
        })
      },
      fail: function (res) {
      },
    });
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '小程序首页',
      desc: '小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App',
      path: '/pages/index/index'
    }
  }
})