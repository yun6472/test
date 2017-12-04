var app = getApp()
Page({

  data: {
    provinces: [],
    citys: [],
    districts: [],
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
    addressData: [],
    addressId: "",

  },

  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    // 地区赋值
    var regions = wx.getStorageSync('regions') // 地区列表
    var addressData = wx.getStorageSync('addressData') // 个人资料
    var address_id = options.objectId;

    wx.request({
      url: app.apiUrl('user/address/detail'),
      data: {
        id: address_id
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.data.addressData['province_id'] = res.data.data.address.province_id
        that.data.addressData['city_id'] = res.data.data.address.city_id
        that.data.addressData['district_id'] = res.data.data.address.district_id
        that.setData({
          consignee: res.data.data.consignee,
          mobile: res.data.data.mobile,
          address: res.data.data.address,
          addressId: res.data.data.address.id,
          provinces: res.data.data.province,
          citys: res.data.data.city,
          districts: res.data.data.district
        })
        that.province()
        that.city()
        that.district()
      }
    })
    //加载中
    that.loadingChange()
  },
  province: function (e) {
    var that = this
    var province_name = [], province_id
    // 定位省份
    for (var i in that.data.provinces) {
      province_name.push(that.data.provinces[i])
      if (that.data.address.province_id == that.data.provinces[i].region_id) {
        province_id = i
      }
    }
    that.setData({
      provinceList: province_name,
      provinceIndex: province_id,
    })
  },
  city: function (e) {
    var that = this
    var city_name = [], city_id
    // 定位市
    for (var i in that.data.citys) {
      city_name.push(that.data.citys[i])
      if (that.data.address.city_id == that.data.citys[i].region_id) {
        city_id = i
      }
    }
    that.setData({
      cityList: city_name,
      cityIndex: city_id,
    })
  },
  district: function (e) {
    var that = this
    var district_name = [], current_district_id
    // 定位区
    for (var i in that.data.districts) {
      district_name.push(that.data.districts[i])
      if (that.data.address.district_id == that.data.districts[i].region_id) {
        current_district_id = i
      }
    }
    that.setData({
      districtList: district_name,
      districtIndex: current_district_id,
    })

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
        that.setData({
          provinceIndex: index,
          cityList: res.data.data,
          cityIndex: 0,
          districtList: res.data.data,
          districtIndex: 0
        })
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
        that.setData({
          cityIndex: index,
          districtList: res.data.data,
          districtIndex: 0
        })
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
        if(districtsIndex < 0){
            districtsIndex = 0
         }
      region_id = that.data.districts[districtsIndex].region_id;
    }

    var addressId = that.data.addressId
    var postdata = {
      consignee: data.consignee,
      province: that.data.addressData['province_id'],
      city: that.data.addressData['city_id'],
      district: that.data.addressData['district_id'],
      address: data.address,
      mobile: data.mobile,
      id: addressId,
    }

    var token = wx.getStorageSync('token')

    wx.request({
      url: app.apiUrl('user/address/update'),
      method: 'post',
      header: {
        'X-ECTouch-Authorization': token
      },
      data: postdata,
      success: function (res) {
        var result = res.data
        // if (result.error_code > 0) {
        //   for (var i in result.error_desc) {
        //     wx.showModal({ title: result.error_desc[i][0] })
        //     break
        //   }
        //   return false;
        // }
        if (res.data.code != 0) {
          wx.showToast({
            title: '更新失败',
            image: '../../images/failure.png',
            duration: 2000,
          })
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
