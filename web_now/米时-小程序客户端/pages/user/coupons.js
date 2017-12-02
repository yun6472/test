var app = getApp();
Page({
  data: {

    hiddenallOrder: false,
    hiddenOrder: true,
    hiddenAddress: true,
    goodsCouponsCont: {
      title: "优惠券",
      couponsNum: "6",
      semiCircle: "../../images/semi-circle.png",
      goodsCoupons: [
        {
          price: "100",
          couponsName: "优惠券",
          cont: "满2000元可以使用",
          time: "2017.20.28-2021.04.30",
          printImg: "../../images/coupons-print.png",
        },
        {
          price: "1000",
          couponsName: "优惠券",
          cont: "满20000元可以使用",
          time: "2017.20.28-2021.04.30"
        }
      ]

    },
  },

  onLoad: function () {
    var that = this
    var token = wx.getStorageSync('token')
  
    // wx.request({
    //   url: app.apiUrl("conpont"),
    //   data: {
    //     page: "1",
    //     size: "1",
    //     type:"1"
    //   },
    //   method: "post",
    //   header: {
    //     'Content-Type': 'application/json',
    //     'X-ECTouch-Authorization': token
    //   },
    //   success: function (res) {

    //   }
    // })
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
  toOrder: function (res) {
    this.setData({
      hiddenOrder: false,
      hiddenAddress: true,
      hiddenallOrder: true,
    })
  },
  toAddress: function (res) {
    this.setData({
      hiddenOrder: true,
      hiddenAddress: false,
      hiddenallOrder: true,
    })
  },
  allOrder: function (res) {
    this.setData({
      hiddenOrder: true,
      hiddenAddress: true,
      hiddenallOrder: false,
    })
  },
})