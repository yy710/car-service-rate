var app = getApp()
var rateMap = new Map([[1, "非常不满意"], [2, "不满意"], [3, "一般"], [4, "满意"], [5, "非常满意"]]);
var checkbox4 = [
  ["接待不及时", "服务态度恶劣"],
  ["费用解释不清楚", "未提醒注意事项"],
  ["业务生疏", "随车工具及备件缺失"],
  ["未做功能操作演示", "验车交车不认真"],
  ["不介绍售后服务", "无人跟踪回访"]
];
var checkbox5 = [
  ["礼貌体贴", "热情周到"],
  ["专业高效", "不厌其烦"]
];

Page({
  data: {
    rate: { id: 0, text: '' },
    checkbox: checkbox4
  },

  // event for star changed
  handleChange: function (e) {
    var r = e.detail.value;
    if (r === 5) {
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: checkbox5
      });
    } else {
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: checkbox4
      });
    }
  },

  //event for click view 0f checkbox
  clickCheckbox: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    //checkArr.push(id);
    //wx.createSelectorQuery().select('#the-id');
    //this.setData({"bcolor[id]": 'green', "tcolor[id]": 'white'});
  },

  // event for checkbox-group changed
  checkboxChange: function (e) {
    console.log(e);
  },

  //submit data to server
  submitRate: function (e) {

    var sendData = e.detail.value;
    sendData.star = this.data.rate;
    sendData.respondents = "dkSale"
    console.log("sendData: ", sendData);

    if (sendData.star.text === '') {
      wx.showToast({
        title: '请评定星级',
        icon: 'none',
        duration: 2000
      })
    } else {
      //notice user that is sunbmiting data
      wx.showLoading({ title: '正在提交数据...' });

      wx.request({
        url: 'https://www.xingshenxunjiechuxing.com/rate/dksale',
        data: { data: sendData },
        dataType: "json",
        header: { 'content-type': 'application/json' },// 默认值
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();

          if (res.data.id === 1) {
            wx.showModal({
              title: '提交成功',
              content: '感谢你的参与！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.showModal({
              title: '系统繁忙，请你稍后再试...',
              content: '感谢你的参与！'
            })
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showModal({
            title: '系统繁忙，请稍后再试...',
            content: '感谢你的参与！'
          })
        }
      })
    }
  }
})
