var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var order = {
  id: "",
  num: 1,
  pro: [],
  prostr: []
}
var goodsbtn = ''
var tempOrderPro = [];
var tempOrderProStr = [];
Page({
  data: {
    hiddenOrder: false,
    hiddenAddress: true,
    is_collect: 0,
    currentIndex: 1,
    // tab切换
    currentTab: 0,
    maskVisual: 'hidden',
    current: 0,
    num: 1,
    new: 'top-hoverd-btn',
    good: '',
    child: '',
    goodsComment: [],
    properties: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    current: 0,
    number: 1,
    hidden: false,
    showView:true,
    scrollTop: 0,
    floorstatus: false,
    //轮播图
    goodsImg: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    "properties": [],
    goods: {},
    goodsComment: [],
    parameteCont: [],
    goodsCoupons:[],
    goodsCouponsCont:{
      title:"优惠券",
      couponsNum:"6",
      semiCircle:"../../images/semi-circle.png",
      goodsCoupons: [
        {
          price: "100",
          couponsName: "优惠券",
          cont: "满2000元可以使用",
          time: "2017.20.28-2021.04.30",
          printImg: "../../images/coupons-print.png",
        }
      ]

    }

  },

  onLoad: function (options) {
    var that = this
    // 获取用户数据
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    // 生命周期函数--监听页面加载
    var token = wx.getStorageSync('token')
    // 获取用户数据
    var goodsId = options.objectId;
    order.id = goodsId
    //调用应用实例的方法获取全局数据
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
        WxParse.wxParse('goods_desc', 'html', res.data.data.goods_info.goods_desc.replace(/\/images/g, "\/images"), that, 5);
        that.setData({
          goodsImg: res.data.data.goods_img,
          goods: res.data.data.goods_info,
          properties: res.data.data.goods_properties.pro,
          collect: res.data.data.goods_info,
          shopName: res.data.data,
          parameteCont: res.data.data.goods_properties.spe,
          goodsComment: res.data.data.goods_comment.slice(0, 3),
          collect_list: (res.data.data.goods_info.is_collect == 1) ? true : false,
          flowNum: res.data.data.cart_number,
          root_path: res.data.data.root_path,
        })
        tempOrderPro = []
        tempOrderProStr = []
        //商品有属性则默认选中第一个
        for (var i in res.data.data.goods_properties.pro) {
          that.getProper(res.data.data.goods_properties.pro[i].values[0].id)
        }
        // if()
        that.getGoodsTotal();
      }
    })
    //加载中
    this.loadingChange()
  },
  onShow: function () {
    order.num = 1;
    order.pro = [];
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
    },
  onChangeShowCoupons: function () {
    var that = this;
    that.setData({
      showViewCoupons: (!that.data.showViewCoupons)
    })
  },

  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  /*提交*/
  goodsCheckout: function (e) {
    var that = this
    var token = wx.getStorageSync('token')
    //获取id
    var  goodsbtn = e.currentTarget.id || 'cart'
    var goodsId = that.data.collect.goods_id
    wx.request({
      url: app.apiUrl("cart/add"),
      data: {
        "id": order.id,
        "num": order.num,
        "attr_id": JSON.stringify(tempOrderPro),
      },
      method: "post",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        var result = res.data.data;
        if (res.data.code == 0) {
          if (goodsbtn == 'cart') {
          } else {
            wx.redirectTo({
              url: '../flow/checkout'

            });
          }
        } else {
          if (result == "商品已下架") {
            wx.showToast({
              title: '商品已下架',
              image: '../../images/failure.png',
              duration: 2000
            })
          }
        }
        that.setData({
          flowNum: res.data.data.total_number
        })
      }
    })

  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  /*增加商品数量*/
  up: function () {
    var num = this.data.num;
    num++;
    if (num >= 99) {
      num = 99
    }
    this.setData({
      num: num
    })
    order.num = num;
    this.getGoodsTotal();
  },
  /*减少商品数量*/
  down: function () {
    var num = this.data.num;
    num--;
    if (num <= 1) {
      num = 1
    }
    this.setData({
      num: num
    })
    order.num = num;
    this.getGoodsTotal();
  },
  /*手动输入商品*/
  import: function (e) {
    var num = Math.floor(e.detail.value);
    if (num <= 1) {
      num = 1
    }
    if (num >= 999) {
      num = 999
    }
    this.setData({
      num: num
    })
    order.num = num;
    this.getGoodsTotal();

  },
  /*单选*/
  modelTap: function (e) {
    this.getProper(e.currentTarget.id)
    this.getGoodsTotal();
  },
  /*属性选择计算*/
  getProper: function (id) {
    tempOrderPro = []
    tempOrderProStr = []
    var categoryList = this.data.properties;
    for (var index in categoryList) {
      for (var i in categoryList[index].values) {
        categoryList[index].values[i].checked = false;
        if (categoryList[index].values[i].id == id) {
          order.pro[categoryList[index].name] = id
          order.prostr[categoryList[index].name] = categoryList[index].values[i].label
        }
      }
    }

    //处理页面
    for (var index in categoryList) {
      if (order.pro[categoryList[index].name] != undefined && order.pro[categoryList[index].name] != '') {
        for (var i in categoryList[index].values) {
          if (categoryList[index].values[i].id == order.pro[categoryList[index].name]) {
            categoryList[index].values[i].checked = true;
          }
        }
      }
    }
    for (var l in order.pro) {
      tempOrderPro.push(order.pro[l]);
    }
    for (var n in order.prostr) {
      tempOrderProStr.push(order.prostr[n]);
    }

    this.setData({
      properties: categoryList,
      selectedPro: tempOrderProStr.join(',')
    });
  },
  getGoodsTotal: function () {
    //提交属性  更新价格
    var that = this;
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl("goods/property"),
      data: {
        id: order.id,
        attr_id: tempOrderPro,
        num: order.num,
        warehouse_id: "1",
        area_id: "1"
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.setData({
          goods_price: res.data.data.goods_price_formated,
          stock: res.data.data.stock,
          attr_img: res.data.data.attr_img,
          goods_market_price : res.data.data.market_price_formated
        });

      }
    })
  },

  //头部菜单切换(商品 详情、评论)
  toNew: function () {
    this.updateBtnStatus('new');
    wx.redirectTo({
      url: "../goods/index?objectId=" + order.id
    })
  },
  toGood: function () {
    this.updateBtnStatus('good');
    wx.redirectTo({
      url: "../goods/detail?objectId=" + order.id
    })
  },
  toChild: function () {
    // this.updateBtnStatus('child');

    wx.redirectTo({
      url: "../goods/comment?objectId=" + order.id
    })
  },
  updateBtnStatus: function (k) {
    this.setData({
      new: this.getHoverd('new', k),
      good: this.getHoverd('good', k),
      child: this.getHoverd('child', k),
    });
  },
  getHoverd: function (src, dest) {
    return (src === dest ? 'top-hoverd-btn' : '');
  },
  /*商品描述导航内容切换*/
  bindHeaderTap: function (event) {
    this.setData({
      current: event.target.dataset.index,
    });
    this.toggleShift()
  },
  bindSwiper: function (event) {
    this.setData({
      current: event.detail.current,
    });
    this.toggleShift()
  },
  toggleShift: function () {
    this.shiftanimation.left(shiftdata[this.data.current]).step()
    this.setData({
      shiftanimation: this.shiftanimation.export()
    })
  },
  flowCart: function () {
    wx.switchTab({
      url: '../flow/index',
    });
  },
  bindIndex: function () {
    wx.switchTab({
      url: '../index/index',
    });
  },
  bindUser: function () {
    wx.switchTab({
      url: '../user/index',
    });
  },

  onShareAppMessage: function () {
    return {
      title: '商品详情',
      desc: '小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生App',
      path: '/pages/goods/index?objectId=' + order.id
    }
  },
  /*收藏*/
  addCollect: function () {
    var that = this;
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl("user/collect/add"),
      data: {
        "id": order.id,
      },
      method: "post",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.setData({
          collect_list: res.data.data
        })
      }
    })
  },
  setCurrent: function (e) {
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },
  imgPreview: function () { //图片预览
    const imgs = this.data.goodsImg;
    wx.previewImage({
      current: imgs[this.data.currentIndex - 1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  /**内容切换 */
  toOrder: function (res) {
    this.setData({
      hiddenOrder: false,
      hiddenAddress: true
    })
  },
  toAddress: function (res) {
    this.setData({
      hiddenOrder: true,
      hiddenAddress: false
    })
  },
  storeDetail: function (e) {
    var id = this.data.shopName.detail.user_id
    wx.redirectTo({
      url: "../store/index?objectId=" + id
    });
  },
  printCoupont:function(e){
    wx.showToast({
      title: '领取成功',
      duration: 2000
    })
  }

})








