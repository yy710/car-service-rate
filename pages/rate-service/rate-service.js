var rate = require('../../utils/common.js').rate;
var app = getApp();
var wafer = app.globalData.wafer;
var rateMap = new Map([[1, "非常不满意"], [2, "不满意"], [3, "一般"], [4, "满意"], [5, "非常满意"]]);
var checkbox4 = [
  [{ value: "服务顾问态度良好", checked: false }, { value: " 维修保养项目解释清楚", checked: false }],
  [{ value: "维修保养耗时合理", checked: false }, { value: "与您一同检查完成项目", checked: false }],
  [{ value: "您反映的问题都已解决", checked: false }, { value: " 收银员服务态度良好", checked: false }]
];
var checkbox5 = [
  [{ value: "细致周到", checked: false }, { value: "有求必应", checked: false }],
  [{ value: "技术精湛", checked: false }, { value: "专业高效", checked: false }]
];
var currentCheckboxs = checkbox4;

Page({
  data: {
    rate: { id: 0, text: '' },
    checkbox: currentCheckboxs,
    radios: [{ value: "愿意推荐", checked: false, label: "是" }, { value: "不愿意推荐", checked: false, label: "否" }],
    showCheckboxs: false
  },

  onShareAppMessage: function () {
    return {
      title: '(服务)用户满意度调查',
      path: '/pages/rate-service/index'
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
        checkbox: currentCheckboxs,
        showCheckboxs: true
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

  onRadioChange: function (e) {
    console.log("on radio event: ", e);
    let radios = this.data.radios.map(item => {
      item.checked = item.value === e.detail.value ? true : false;
      return item;
    });

    //console.log("new radios: ", radios);
    this.setData({ radios: radios });
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

    this.setData({ checkbox: currentCheckboxs });
  },

  //submit data to server
  submitRate: function (e) {
    var sendData = e.detail.value;
    sendData.star = this.data.rate;
    sendData.respondents = "dkservice"
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
      wx.showModal({
        title: '活动通知',
        content: '是否参与调查有礼活动？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            app.globalData.rateSendData = sendData;
            wx.navigateTo({
              url: '../phone-form/phone-form'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
            wx.showLoading({ title: '正在提交数据...' });
            rate(wafer, { data: sendData }).catch(console.log);
          }
        }
      })
    }
  }
})
