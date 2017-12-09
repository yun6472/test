var app = getApp()
var token
Page({
  data: {
    storeList:[]
  },
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl("user/collectstore"),
      method: "post",
      data:{
        id:"1"
      },
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.setData({
          storeList: res.data
        })
      }
    })
    //初始化
    that.loadingChange()
  },
  onChangeShowAttention: function (e) {
    var that = this
    var token = wx.getStorageSync('token')
    var index = e.currentTarget.dataset.index;
    var store_id = that.data.storeList[index].store_id;
    wx.request({
      url: app.apiUrl("store/attention"),
      data: {
        id: store_id,
      },
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      method: "POST",
      success: function (res) {
        var result = res.data;
        if (result == 0) {
          wx.showToast({
            title: '关注已取消',
            icon: 'warn',
            duration: 2000
          })
        }
        wx.navigateTo({
          url: "../user/collect_shop"
        });
      }
    })
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },

  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },


})