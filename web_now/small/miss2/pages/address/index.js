var app = getApp()
Page({
  data: {
    addressList: []
  },
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl('user/address/list'),
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        if (res.data.code == 0){
          that.setData({
            addressList: res.data.data
          });
        }
      }
    })
    this.loadingChange();
  },
  // 加载中
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 添加收货地址
  createAddress: function () {
    wx.navigateTo({
      url: './create'
    })
  },
  // 编辑收货地址
  editAddress: function (e) {
    var that = this
    var address_index = e.currentTarget.dataset.address
    var address_id = that.data.addressList[address_index].id
    wx.navigateTo({
      url: "../address/detail?objectId=" + address_id
    })
  },
  // 删除收货地址
  removeAddress: function (e) {
    var that = this
    var token = wx.getStorageSync('token')
    var address_id = e.currentTarget.dataset.address
    wx.showModal({
      title: '提示',
      content: '您确定要移除当前收货地址吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.apiUrl('user/address/delete'),
            method: 'POST',
            header: {
              'X-ECTouch-Authorization': token
            },
            data: {
              id: address_id
            },
            success: function () {
              var options = wx.getStorageSync('pageOptions')
              that.onLoad(options);
            }
          })
        }
      }
    })

  },
  // 设置默认地址
  setDefault: function (e) {
    var that = this
    var address_id = e.detail.value
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl('user/address/choice'),
      method: 'POST',
      header: {
        'X-ECTouch-Authorization': token
      },
      data: {
        id: address_id
      },
      success: function () {
        wx.showToast({
          title: '设置成功',
          success: function () {
            var options = wx.getStorageSync('pageOptions')
            that.onLoad(options);
            if (options.from == 'flow') {
              wx.reLaunch({
                url: '../flow/checkout'
              })
            }
          }
        })
      }
    })
  },

})