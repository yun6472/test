//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    currentTab: 0,
    toView: "hot",//默认设置成第一个导航的id
    sorllView: [
      { id: "hot", text: "热点" },
      { id: "movies", text: "视频" },
      { id: "shopping", text: "导购" },
      { id: "car", text: "试车" },
      { id: "news", text: "新闻" }
    ],
    winHeight: "",  //窗口高度
    banner: [
      {
        link:"",
        pic:"../../images/banner.jpg"
      }, 
      {
        link:"",
        pic:"../../images/banner.jpg"
      }, 
      {
        link:"",
        pic:"../../images/banner.jpg"
      }
    ],
    tab:[
      {
        url:"../../images/user.png",
        text:"图库"
      },
      {
        url: "../../images/user.png",
        text: "上市新车"
      },
      {
        url: "../../images/user.png",
        text: "选车"
      },
      {
        url: "../../images/user.png",
        text: "车主口碑"
      },
      {
        url: "../../images/user.png",
        text: "查优惠"
      }
    ]
  },
  
  onLoad: function () {
    var that = this;
    //获取浏览器高度
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;//100是减去顶部导航栏的高度
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  //点击顶部导航栏
  selectScroll: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      for (var i = 0; i < this.data.sorllView.length; i++) {
        if (e.currentTarget.id === this.data.sorllView[i].id) {
          this.setData({
            currentTab: cur,
            toView: e.currentTarget.id
          })
        }
      }
    }
  },

  //滑动切换页面
  switchTab: function (e) {
    var view = this.data.sorllView[e.detail.current].id;
    this.setData({
      currentTab: e.detail.current,
      toView: view
    });

  },
  scroll: function (e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  }
})
