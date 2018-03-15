var app = getApp()
var rateMap = new Map([[1, "非常不满意"], [2, "不满意"], [3, "一般"], [4, "满意"], [5, "非常满意"]]);

Page({
  data: {
    bcolor:'',
    rate: { id: 0, text: '' },
    checkbox: [
      ["接待不及时", "服务态度恶劣"],
      ["费用解释不清楚", "未提醒注意事项"],
      ["业务生疏", "随车工具及备件缺失"],
      ["未做功能操作演示", "验车交车不认真"],
      ["不介绍售后服务", "无人跟踪回访"]
    ]
  },
  handleChange: function (e) {
    this.setData({
      rate: { id: e.detail.value, text: rateMap.get(e.detail.value) }
    })
  },
  clickCheckbox: function (e) {
    console.log(e);
    if (e.currentTarget.id === "2") console.log("ok!");
  },
  submit: function (e) {

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
