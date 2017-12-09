var app = getApp();
var token
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
    this.loadingChange();
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
        if (that.data.provinceList[index].parent_id != undefined) {
          that.setData({
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
  //提交信息
  formSubmit: function (e) {
    var that = this
    var token = wx.getStorageSync('token')
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    //获得表单数据
    var formData = e.detail.value;
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
    if (isNaN(formData.tax_id)) {
      wx.showToast({
        title: '纳税人识别码不符合规格',
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

    if (!myreg.test(formData.consignee_mobile_phone)) {
      wx.showToast({
        title: '手机号不符合要求',
        image: '../../images/failure.png',
        duration: 1500
      })
      return false;
    }
    if (that.data.addressData['district_id'] == '' || that.data.addressData['city_id'] == '' || that.data.addressData['province_id'] == '' || formData.consignee_province == '' || formData.consignee_address == '' || formData.bank_of_deposit == '' || formData.bank_account == '') {
      wx.showToast({
        title: '信息不能有空',
        image: '../../images/failure.png',
        duration: 2000,
      })
      return false;
    }
    var postdata = {
      company_name: formData.company_name,//单位名称
      tax_id: formData.tax_id,//识别码
      company_address: formData.company_address,//注册地址
      company_telephone: formData.company_telephone,//注册电话
      consignee_name: formData.consignee_name,//收票人姓名
      consignee_mobile_phone: formData.consignee_mobile_phone,//收票人电话
      country: 1,
      province: that.data.addressData['province_id'],
      city: that.data.addressData['city_id'],
      district: that.data.addressData['district_id'],
      consignee_address: formData.consignee_address,//收票人地址
      bank_of_deposit: formData.bank_of_deposit,//开户行
      bank_account: formData.bank_account,//银行账户
    }
    wx.request({
      url: app.apiUrl("user/invoice/add"),
      method: "POST",
      data: postdata,
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        if (res.data.status_code == 500) {
          wx.showToast({
            title: '添加失败',
            image: '../../images/failure.png',
            duration: 2000
          })
          return
        }
        wx.showToast({
          title: '添加成功',
          duration: 2000
        })
        wx.redirectTo({ url: '../invoice/detail' })
      }
    })
  },
})  