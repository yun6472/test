Page({
  data: {
    toView: 'index',
    currentCls:0,
    sorllView: [
      { id: "index",   text: "首页" }, 
      { id: "detail",  text: "详情" }, 
      { id: "detail1", text: "详情1" }, 
      { id: "detail2", text: "详情2" }, 
      { id: "detail3", text: "详情3" }, 
      { id: "detail4", text: "详情4" }, 
      { id: "detail5", text: "详情5" }, 
      { id: "detail6", text: "详情6" }, 
      { id: "detail7", text: "详情7" },
      { id: "detail8", text: "详情8" },
      { id: "detail9", text: "详情9" },
      { id: "detail10", text: "详情10" },
      { id: "detail11", text: "详情11" },
      { id: "detail12", text: "详情12" }
      ]
  },
  selectScroll:function(e){
    for (var i = 0; i < this.data.sorllView.length;i++){
      if (e.currentTarget.id === this.data.sorllView[i].id){
        this.setData({
          toView: e.currentTarget.id,
          currentCls:i
        })
      }
    }
  }
})