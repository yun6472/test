var app = getApp()


Page({

  data: {
    countrys: [],
    provinces: [],
    citys: [],
    districts: [],
    // 国
    countryList: [],
    countryIndex: 0,
    // 省
    provinceList: [],
    provinceIndex: 0,
    // 市
    cityList: [],
    cityIndex: 0,
    // 县
    districtList: [],
    districtIndex: 0,
    // 收货人信息
    consignee: '',
    mobile: '',
    address: '',
    addressData: []
  },

  onLoad: function () {
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.apiUrl('region/list'),
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        id: 1
      },
      success: function (res) {
        res.data.data.unshift({ region_name: '请选择' })
        that.setData({
          provinceList: res.data.data,
        });
      }

    })
    //加载中
    that.loadingChange()
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },

  //省
  provinceTypeChange: function (e) {
    var that = this, index = e.detail.value
    that.data.addressData['province_id'] = that.data.provinceList[index].region_id;
    wx.request({
      url: app.apiUrl('region/list'),
      data: { id: that.data.provinceList[index].region_id },
      method: 'POST',
      success: function (res) {
        res.data.data.unshift({ region_name: '请选择' })
        if (that.data.provinceList[index].parent_id != undefined) {
          that.setData({
            parent_id: res.data.data.parent_id,
            provinceIndex: index,
            cityList: res.data.data,
            cityIndex: 0,
            districtIndex: 0
          })
        }
      }
    })

  },
  //市
  cityTypeChange: function (e) {
    var that = this, index = e.detail.value
    that.data.addressData['city_id'] = that.data.cityList[index].region_id;
    wx.request({
      url: app.apiUrl('region/list'),
      data: { id: that.data.cityList[index].region_id },
      method: 'POST',
      success: function (res) {
        res.data.data.unshift({ region_name: '请选择' })
        if (that.data.cityList[index].parent_id != undefined) {
          that.setData({
            cityIndex: index,
            districtList: res.data.data,
            districtIndex: 0
          })
        } 
      }
    })
  },
  //区
  districtTypeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this, index = e.detail.value
    that.data.addressData['district_id'] = that.data.districtList[index].region_id;
    that.setData({
      districtIndex: index
    })
  },
  saveData: function (e) {
    var that = this
    var data = e.detail.value;
    var region_id = 0;
    if (that.data.districts.length > 0) {
      var districtsIndex = parseInt(data.district) - 1
      region_id = that.data.districts[districtsIndex].region_id;
    }
    var postdata = {
      consignee: data.consignee,
      // country: that.data.addressData['country_id'],
      province: that.data.addressData['province_id'],
      city: that.data.addressData['city_id'],
      district: that.data.addressData['district_id'],
      address: data.address,
      mobile: data.mobile,
    }
    var token = wx.getStorageSync('token')

    wx.request({
      url: app.apiUrl('user/address/add'),
      method: 'post',
      header: {
        'X-ECTouch-Authorization': token
      },
      data: postdata,
      success: function (res) {
        var result = res.data.status_code
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var mobile = data.mobile
        if (result == 500) {
          if (data.consignee == '') {
            wx.showToast({
              title: '收件人不能为空',
              image: '../../images/failure.png',
              duration: 2000,
            })
            return false;
          }
          if (mobile.length == 0) {
            wx.showToast({
              title: '手机号不能为空',
              image: '../../images/failure.png',
              duration: 2000,
            })
            return false;
          }
          if (mobile.length != 11) {
            wx.showToast({
              title: '手机号长度有误',
              image: '../../images/failure.png',
              duration: 1500
            })
            return false;
          }

          if (!myreg.test(mobile)) {
            wx.showToast({
              title: '手机号不符合要求',
              image: '../../images/failure.png',
              duration: 1500
            })
            return false;
          }
          if (postdata.province == undefined || postdata.city == undefined || postdata.district == undefined) {
            wx.showToast({
              title: '省市区不能为空',
              image: '../../images/failure.png',
              duration: 2000,
            })
            return false;
          }
          if (data.address == '') {
            wx.showToast({
              title: '详细地址不能为空',
              image: '../../images/failure.png',
              duration: 2000,
            })
            return false;
          }
        } else {
          wx.showToast({
            title: '保存成功',
            duration: 2000,
            success: function () {
              wx.redirectTo({ url: './index' })
            }
          })
        }
      }
    })
  },
  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
})
