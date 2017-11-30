var app = getApp();
var token
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
    wx.request({
      url: app.apiUrl("user/invoice/detail"),
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        that.data.addressData['province_id'] = res.data.data.invoice.province
        that.data.addressData['city_id'] = res.data.data.invoice.city
        that.data.addressData['district_id'] = res.data.data.invoice.district
        that.setData({
          id: res.data.data.invoice.id,
          company_name: res.data.data.invoice.company_name,
          tax_id: res.data.data.invoice.tax_id,
          company_address: res.data.data.invoice.company_address,//注册地址
          company_telephone: res.data.data.invoice.company_telephone,//注册电话
          consignee_name: res.data.data.invoice.consignee_name,//收票人姓名
          consignee_mobile_phone: res.data.data.invoice.consignee_mobile_phone,//收票人电话
          consignee_address: res.data.data.invoice.consignee_address,//收票人地址
          bank_of_deposit: res.data.data.invoice.bank_of_deposit,//开户行
          bank_account: res.data.data.invoice.bank_account,//银行账户
          invoice: res.data.data.invoice,
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
    this.loadingChange();
  },
  province: function (e) {
    var that = this
    var province_name = [], province
    // 定位省份
    console.log(that.data.provinces)
    for (var i in that.data.provinces) {
      province_name.push(that.data.provinces[i])
      if (that.data.invoice.province == that.data.provinces[i].region_id) {
        province = i
      }
    }
    that.setData({
      provinceList: province_name,
      provinceIndex: province,
    })
  },
  city: function (e) {
    var that = this
    var city_name = [], city
    // 定位市
    for (var i in that.data.citys) {
      city_name.push(that.data.citys[i])
      if (that.data.invoice.city == that.data.citys[i].region_id) {
        city = i
      }
    }
    that.setData({
      cityList: city_name,
      cityIndex: city,
    })
  },
  district: function (e) {
    var that = this
    var district_name = [], district
    // 定位区
    for (var i in that.data.districts) {
      district_name.push(that.data.districts[i])
      if (that.data.invoice.district == that.data.districts[i].region_id) {
        district = i
      }
    }
    that.setData({
      districtList: district_name,
      districtIndex: district,
    })

  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
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
  //提交信息
  formSubmit: function (e) {
    var that = this
    var token = wx.getStorageSync('token')
    //获得表单数据
    var formData = e.detail.value;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (formData.company_name == '') {
      wx.showToast({
        title: '单位名称不能为空',
        image: '../../images/failure.png',
        duration: 2000,
      })
      return false;
    }
    if (formData.tax_id == '') {
      wx.showToast({
        title: '纳税人识别码不能为空',
        image: '../../images/failure.png',
        duration: 2000,
      })
      return false;
    }
    if (formData.company_address == '') {
      wx.showToast({
        title: '注册地址不能为空',
        image: '../../images/failure.png',
        duration: 2000,
      })
      return false;
    }
    if (formData.company_telephone.length == 0 || formData.consignee_mobile_phone.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        image: '../../images/failure.png',
        duration: 2000,
      })
      return false;
    }
    if (formData.consignee_mobile_phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误',
        image: '../../images/failure.png',
        duration: 1500
      })
      return false;
    }

    if ( !myreg.test(formData.consignee_mobile_phone)) {
      wx.showToast({
        title: '手机号不符合要求',
        image: '../../images/failure.png',
        duration: 1500
      })
      return false;
    }
    if (formData.consignee_province == '' || formData.consignee_address == '' || formData.bank_of_deposit == '' || formData.bank_account == '') {
      wx.showToast({
        title: '信息不能有空',
        image: '../../images/failure.png',
        duration: 2000,
      })
      return false;
    }
    var postdata = {
      id: that.data.id,
      company_name: formData.company_name,//单位名称
      tax_id: formData.tax_id,//识别码
      company_address: formData.company_address,//注册地址
      company_telephone: formData.company_telephone,//注册电话
      consignee_name: formData.consignee_name,//收票人姓名
      consignee_mobile_phone: formData.consignee_mobile_phone,//收票人电话
      consignee_address: formData.consignee_address,//收票人地址
      bank_of_deposit: formData.bank_of_deposit,//开户行
      bank_account: formData.bank_account,//银行账户
      province: that.data.addressData['province_id'],
      city: that.data.addressData['city_id'],
      district: that.data.addressData['district_id'],
    }
    wx.request({
      url: app.apiUrl("user/invoice/update"),
      method: "POST",
      data: postdata,
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        wx.showToast({
          title: '更新成功',
          duration: 2000
        })
        wx.redirectTo({ url: '../invoice/detail' })
      }
    })
  },
})  