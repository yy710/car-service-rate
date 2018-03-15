var app = getApp()
var rateMap = new Map([[1, "非常不满意"], [2, "不满意"], [3, "一般"], [4, "满意"], [5, "非常满意"]]);

Page({
  data: {
    rate: { id: 0, text: '' }
  },
  handleChange: function (e) {
    this.setData({
      rate: { id: e.detail.value, text: rateMap.get(e.detail.value) }
    })
  },
  test: function (e) {
    console.log(e);
    if(e.currentTarget.id === "2")console.log("ok!");
  },
  onLoad: function () {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
