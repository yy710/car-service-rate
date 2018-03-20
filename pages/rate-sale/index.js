var app = getApp()
var rateMap = new Map([[1, "非常不满意"], [2, "不满意"], [3, "一般"], [4, "满意"], [5, "非常满意"]]);
var checkbox4 = [
  [{ value: "接待不及时", checked: false }, { value: "服务态度恶劣", checked: false }],
  [{ value: "费用解释不清楚", checked: false }, { value: "未提醒注意事项", checked: false }],
  [{ value: "业务生疏", checked: false }, { value: "随车工具及备件缺失", checked: false }],
  [{ value: "未做功能操作演示", checked: false }, { value: "验车交车不认真", checked: false }],
  [{ value: "不介绍售后服务", checked: false }, { value: "无人跟踪回访", checked: false }]
];
var checkbox5 = [
  [{ value: "礼貌体贴", checked: false }, { value: "热情周到", checked: false }],
  [{ value: "专业高效", checked: false }, { value: "不厌其烦", checked: false }]
];

var currentCheckboxs = checkbox4;

Page({
  data: {
    rate: { id: 0, text: '' },
    checkbox: currentCheckboxs
  },

  onShareAppMessage: function () {
    return {
      title: '(销售)用户满意度调查',
      path: '/pages/rate-sale/index'
    }
  },

  // event for star changed
  handleChange: function (e) {
    var r = e.detail.value;
    if (r === 5) {
      currentCheckboxs = checkbox5;
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: currentCheckboxs
      });
    } else {
      currentCheckboxs = checkbox4;
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: currentCheckboxs
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

    let checkedValues = e.detail.value;

    checkbox4 = checkbox4.map(item1 => {
      item1.map(item2 => {
        item2.checked = checkedValues.includes(item2.value);
        return item2;
      });
      return item1;
    });

    checkbox5 = checkbox5.map(item1 => {
      item1.map(item2 => {
        item2.checked = checkedValues.includes(item2.value);
        return item2;
      });
      return item1;
    });

    this.setData({checkbox: currentCheckboxs});
  },

  //submit data to server
  submitRate: function(e) {

    var sendData = e.detail.value;
    sendData.star = this.data.rate;
    sendData.respondents = "dksale";
    sendData.sid = 0;
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
