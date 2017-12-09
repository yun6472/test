//app.js
App({
  onLaunch: function () {
    // 获取用户数据
    // this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (result) {
          var code = result.code;
          wx.getUserInfo({
            lang: "zh_CN",
            success: function (res) {
              res.userInfo.code = code;
              that.doLogin(code, res.userInfo);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function () {
              wx.showModal({
                title: '温馨提示',
                content: '拒绝授权，将会影响购物流程和用户登录,请确定重新授权！',
                success: function (res) {
                  if (res.confirm) {
                    wx.getSetting({
                      success(res) {
                        if (!res.authSetting["scope.userInfo"]) {
                          wx.authorize({
                            scope: 'scope.userInfo',
                            fail() {
                              wx.openSetting({
                                success: function (res) {
                                  if (res.authSetting["scope.userInfo"]) {
                                    wx.getUserInfo({
                                      success: function (res) {
                                        that.doLogin(code, res.userInfo);
                                        that.globalData.userInfo = res.userInfo
                                        typeof cb == "function" && cb(that.globalData.userInfo)
                                      },
                                    })
                                  } else {
                                    that.getUserInfo();
                                  }
                                }
                              })
                            }
                          })
                        }
                      }
                    })
                  } else if (res.cancel) {
                    that.getUserInfo();
                  }
                },
              })
            }
          })
        }
      })
    }
  },
  // 小程序用户登录
  doLogin: function (code, userinfo) {
    var that = this
    if (code) {
      // 发起网络请求
      wx.request({
        url: that.apiUrl('user/login'),
        method: 'POST',
        data: {
          userinfo: userinfo,
          code: code
        },
        success: function (res) {
          wx.setStorage({
            key: 'token',
            data: res.data.data.token
          })
          wx.setStorage({
            key: 'openid',
            data: res.data.data.openid
          })
        }
      })
    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }
  },
  globalData: {
    userInfo: null
  },
  // 设置服务端API
  apiUrl: function (api) 
  {
    return 'https://www.missmall.com/mobile/public/api/wx/' + api;
  },
  shwomessage: function (msg, time = 1000, icon = 'warn') {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: time
    })
  },
  redirectTo: function (url) {
    wx.navigateTo({
      url: url
    });
  },
  payOrder: function (order_id, openid, token) {
    var that = this
    wx.request({
      url: that.apiUrl('payment/pay'),
      data: {
        id: order_id,
        open_id: openid,
        code: 'order.pay'
      },
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      method: "POST",
      success: function (res) {
        if (res.data.status_code == 500) {
          wx.showToast({
            title: '支付失败',
            image: '../../images/failure.png',
            duration: 2000
          })
          return
        }
        var wxpayinfo = res.data.data.wxpay
        if (wxpayinfo == '') {
          return
        }
        //发起支付
        wx.requestPayment({
          'timeStamp': wxpayinfo.timestamp,
          'nonceStr': wxpayinfo.nonce_str,
          'package': wxpayinfo.packages,
          'signType': 'MD5',
          'paySign': wxpayinfo.sign,
          'success': function (payres) {
            if (payres.errMsg == 'requestPayment:ok') {
              //成功修改订单状态
              wx.request({
                url: that.apiUrl('payment/notify'),
                data: {
                  "id": order_id,
                },
                method: "post",
                header: {
                  'Content-Type': 'application/json',
                  'X-ECTouch-Authorization': token
                },
                success: function (res) {
                  if (res.data.status_code > 0) {
                    wx.showToast({
                      title: '付款失败',
                      image: '../../images/failure.png',
                      duration: 2000
                    })
                  }
                  wx.showToast({
                    title: '支付成功',
                    duration: 2000
                  })
                  that.redirectTo('../order/index?objectId=' + order_id)
                }
              })
            }
          },
          'fail': function (payres) {
            wx.showToast({
              title: '支付失败',
              image: '../../images/failure.png',
              duration: 2000
            })
            that.redirectTo('../order/index?objectId=' + order_id)

          }
        })

      }
    })
  }
})
