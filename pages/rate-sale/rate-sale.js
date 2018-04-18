var rate = require('../../utils/common.js').rate;
var app = getApp();
var wafer = app.globalData.wafer;
var rateMap = new Map([[1, "非常不满意"], [2, "不满意"], [3, "一般"], [4, "满意"], [5, "非常满意"]]);
var checkbox4 = [
  [{ value: "销售顾问服务态度良好", checked: false }, { value: "产品与费用介绍详细", checked: false }],
  [{ value: "交车时与您一同验车", checked: false }, { value: "提醒注意事项介绍售后服务", checked: false }],
  [{ value: "您提出的问题都已得到解答", checked: false }, { value: "收银员服务态度良好", checked: false }]
];
var checkbox5 = [
  [{ value: "礼貌体贴", checked: false }, { value: "热情周到", checked: false }],
  [{ value: "专业高效", checked: false }, { value: "不厌其烦", checked: false }]
];

var currentCheckboxs = checkbox4;

Page({
  data: {
    rate: { id: 0, text: '' },
    checkbox: currentCheckboxs,
    radios: [{ value: "愿意推荐", checked: false, label: "是" }, { value: "不愿意推荐", checked: false, label: "否" }],
    showCheckboxs: false,
    notic: "请对我们的服务做出评价",
    text2: "您对以下哪些地方不满意？",
    showText2: true
  },

  onShareAppMessage: function () {
    return {
      title: '(销售)用户满意度调查',
      path: '/pages/rate-sale/index'
    }
  },

  onLoad: function (op) {
    let that = this;
    wafer.request({
      url: 'https://www.xingshenxunjiechuxing.com/rate/init',
      data: { id: 'sale' },
      success: res => {
        console.log(res);
        that.setData({ notic: res.data.notic });
      }
    });
  },

  // event for star changed
  handleChange: function (e) {
    var r = e.detail.value;
    if (r === 5) {
      currentCheckboxs = checkbox5;
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: currentCheckboxs,
        showText2: false
      });
    } else if (r === 4) {
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: currentCheckboxs,
        text2: "您觉得以下哪些地方还需要改进?"
      });
    }
    else {
      currentCheckboxs = checkbox4;
      this.setData({
        rate: { id: r, text: rateMap.get(r) },
        checkbox: currentCheckboxs,
        showCheckboxs: true,
        text2: "您对以下哪些地方不满意？",
        showText2: true
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
        //set checked flag for click event
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
