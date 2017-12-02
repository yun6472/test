var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var token

var order = {
  consignee: 1,
  shipping_id: [],
  msg: ''
}
var cart_goods_list;
var order_total;
var shop_name;
var shopLists;
var res_error;
var invoiceType;
var inv_payee;
var tax_id;
var inv_content;
var inv_payee_name
var shippingList = new Array();

Page({
  data: {
    index: 0,
    addresss_link: '../address/index?from=flow',
    checkList: [],
    shipping_id: 0,
    shopLists: "",
    resShipingId: [],
    payfee: [],
    addresss: "",
    maskVisual: 'hidden',
    current: 1,
    hiddenOrder: true,
    hiddenAddress: true,
    hiddenUser: true,
    hiddenUnit: true,
  },
  onShow: function (options) {
    var that = this
    token = wx.getStorageSync('token')
    wx.setStorageSync('pageOptions', { from: "flow" })

    wx.request({
      url: app.apiUrl("flow"),
      method: "post",
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        // if (res.data[400] != undefined) {
        //   wx.switchTab({
        //     url: '../categroy/index'
        //   })
        //   return
        // }
        if (res.data.data.cart_goods_list.list.length == 0) {
          wx.switchTab({
            url: '../category/index'
          })
          return
        }
        // setTimeout(() => {
        //   if (that.data.addresss == '') {
        //     wx.navigateTo({
        //       url: "../address/index"
        //     });
        //   }
        // }, 1000)
        order.consignee = res.data.data.default_address.address_id
        cart_goods_list = res.data.data.cart_goods_list.list
        for (var i in cart_goods_list) {
          var shop_list = res.data.data.cart_goods_list[i]
        }
        var attr;
        var temp = '';
        for (var i in res.data.cart_goods_list) {
          attr = res.data.cart_goods_list.list[0][i].goods_attr.split('\n')
          for (var j in attr) {
            if (attr[j] == '') continue;
            temp += attr[j] + ','
          }
          res.data.cart_goods_list.list[0][i].goods_attr = temp.substring(0, temp.length - 1)
        }
        that.setData({
          addresss: res.data.data.default_address,
          shopLists: res.data.data.cart_goods_list,
          userInvoice: res.data.data.invoice_content,
          can_invoice: res.data.data.can_invoice,
          vat_invoice: res.data.data.vat_invoice,
          invoice_id: res.data.data.vat_invoice.id
        })
        that.getShopName()
        for (var i in that.data.shippingName) {
          that.shippingChange(new Array(i, that.data.shippingName[i].id));
        }
      }
    })
    //加载中
    this.loadingChange()
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },

  getShopName: function (e) {
    let shippingName = []
    let shpppingId = []
    for (let item in this.data.shopLists.list) {
      let name = []
      let ship_id = []
      let o = {
        option: [],
        id: 0
      }
      let listItem = this.data.shopLists.list[item]
      // var shipping_ru_id;
      // var shipping_id;
      // if (!listItem.shop_info) {
      //   shipping_ru_id = listItem.shop_info[0].ru_id
      //   shipping_id = listItem.shop_info[0].shipping_id
      // } else {
      //   shipping_ru_id = 0
      //   shipping_id = 0
      // }
      listItem.shop_info.forEach(item => {
        name.push(item.shipping_name)
        ship_id.push(item.shipping_id)
      })
      o.option = name
      shippingName.push(o)
      shpppingId.push(ship_id)

      //快递方式初始化
      order.shipping_id = ship_id[0]
      // console.log(listItem)
      this.data.resShipingId.push({
        ru_id: listItem.shop_info[0].ru_id,
        shipping_id: listItem.shop_info[0].shipping_id
      })
    }
    //重新赋值
    this.setData({
      shippingName: shippingName,
      shpppingId: shpppingId
    })
  },

  //配送方式
  shippingChange: function (e) {
    var that = this
    if (typeof e == 'object' && e.length == 2) {
      var index = e[0],
        rangeIndex = e[1]
    } else {
      var index = e.currentTarget.dataset.index,
        rangeIndex = e.detail.value
    }
    that.data.shippingName[index].id = rangeIndex
    order.shipping_id = this.data.shpppingId[index][rangeIndex]
    var ru_id = this.data.shopLists.list[index].shop_list[0].ru_id, temp = 0
    this.data.resShipingId[index].shipping_id = this.data.shopLists.list[index].shop_info[rangeIndex].shipping_id
    this.setData({
      shippingName: this.data.shippingName,
      resShipingId: this.data.resShipingId
    })

    wx.request({
      url: app.apiUrl('flow/shipping'),
      data: {
        address: order.consignee,
        id: this.data.resShipingId[index].shipping_id,
        ru_id: this.data.resShipingId[index].ru_id
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {

        shippingList[that.data.resShipingId[index].ru_id] = {
          shipping_id: that.data.resShipingId[index].shipping_id,
          shipping_fee: parseFloat(res.data.data.fee)
        }

        if (that.data.payfee.hasOwnProperty(index)) {
          res.data.data.fee ? that.data.payfee.splice(index, 1, res.data.data.fee)
            : that.data.payfee.splice(index, 1, res.data.data.massage)
        } else {
          res.data.data.fee ? that.data.payfee.splice(index, 1, res.data.data.fee)
            : that.data.payfee.splice(index, 1, res.data.data.massage)
        }
        if (res.data.data.error == 1) {
          wx.showToast({
            title: res.data.data.massage,
            image: '../../images/failure.png',
            duration: 2000
          })
        }
        that.data.payfee.forEach(item => {
          if (!isNaN(item))
            temp += parseFloat(item)
        })
        that.setData({
          payfee: that.data.payfee,
          payfee_total: temp,
          total: parseFloat(that.data.shopLists.order_total) + temp,
          payfee_error: res.data.data.error
        })
      }
    })
  },

  //下拉刷新完后关闭
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //提交订单
  submitOrder: function () {
    var that = this
    if (that.data.payfee_error == 1) {
      wx.showToast({
        title: "地区不支持配送，无法提交",
        image: '../../images/failure.png',
        duration: 2000
      })
      return;
    }
    if (order.consignee == '' || order.consignee == undefined) {
      app.shwomessage('没有收货地址');
      return;
    }
    //初始化
    var postdata = {
      inv_payee : '',
      inv_content:''
    }
    if (invoiceType == 0) {
      if (inv_payee == "单位") {
        var postdata = {
          invoice_type: invoiceType,//发票类型
          inv_payee: inv_payee_name, //个人还是公司名称 ，增值发票时此值为空
          tax_id: tax_id,
          inv_content: inv_content,
        }
      }
      if (inv_payee == "个人") {
        var postdata = {
          invoice_type: invoiceType,//发票类型
          inv_payee: inv_payee, //个人还是公司名称 ，增值发票时此值为空
          inv_content: inv_content, //发票明细
        }
      }
    }
    if (invoiceType == 1){
      var postdata = {
        invoice_type: invoiceType,//发票类型
        vat_id: that.data.invoice_id,
        inv_payee: "", //个人还是公司名称 ，增值发票时此值为空
        inv_content: "", //发票明细
        tax_id: ""
      }
    }
    wx.request({
      url: app.apiUrl('flow/down'),
      method: "post",
      data: {
        consignee: order.consignee,
        shipping: this.data.resShipingId,
        postdata,
      },
      header: {
        'Content-Type': 'application/json',
        'X-ECTouch-Authorization': token
      },
      success: function (res) {
        var oid = res.data.data
        if (res.data.code > 0) {
          wx.showToast({
            title: res.data.data,
            image: '../../images/failure.png',
            duration: 2000
          })
          return
        }
        if (oid != '') {
          wx.redirectTo({
            url: '../flow/done?id=' + oid
          })
        }
      }
    })
    //
  },
  cascadePopup: function () {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-in-out'
    });
    this.animation = animation;
    animation.translateX(-1000).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show'
    })
  },
  //点击遮区域关闭弹窗
  cascadeDismiss: function () {
    this.animation.translateX(1000).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden'
    });
  },
  bindHeaderTap: function (event) {
    this.setData({
      current: event.target.dataset.index,
    });
    page = 1;
    sort_key = event.target.dataset.index

  },

  /**获取内容 */

  //获取发票类型-普通
  toOrder: function (e) {
    invoiceType = e.currentTarget.id
    this.setData({
      hiddenOrder: false,
      hiddenAddress: true,
      invoiceType : e.currentTarget.id
    })
  },
  //获取发票类型-增值
  toAddress: function (e) {
    invoiceType = e.currentTarget.id
    this.setData({
      hiddenOrder: true,
      hiddenAddress: false,
      invoiceType : e.currentTarget.id
    })
  },

  userList: function (e) {
    inv_payee = e.currentTarget.id
    this.setData({
      hiddenUser: false,
      hiddenUnit: true,
      inv_payee:e.currentTarget.id
    })
  },
  unitList: function (e) {
    inv_payee = e.currentTarget.id
    this.setData({
      hiddenUser: true,
      hiddenUnit: false,
      inv_payee : e.currentTarget.id
      
    })
  },
  unitNameInput: function (e) {
    inv_payee_name = e.detail.value
    this.setData({
      unitName: e.detail.value
    })
  },
  unitNumInput: function (e) {
    tax_id = e.detail.value
    this.setData({
      headingCode: e.detail.value
    })
  },
  radioChange: function (e) {
    inv_content = e.detail.value
  },
  toAddressTs:function(e){
    wx.showModal({
      title: '提示',
      content: '你还没有增值发票，去添加吗？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({ url: '../invoice/create' })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  // getmsg: function (e) {
  //   order.msg = e.detail.value
  // },
})