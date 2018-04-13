var Countdown = require('../../utils/countdown.js');
var rate = require('../../utils/common.js').rate
var app = getApp();
var wafer = app.globalData.wafer;
var phones = []; //已验证用户对应电话列表

Page({
  data: {
    name: null,
    phone: null,
    vCode: null,
    vCodeText: "获取验证码",
    hiddenVerifyCodeInput: true,
    hiddenGetVerifyCode: true,
    disabledSubmit: true
  },

  //event: 点击获取验证码
  getVerifyCode: function (e) {
    console.log("bindTap getVifyCode: ", e);

    // 判断正在倒计时状态则返回 
    if (this.c2 && this.c2.interval) return !1

    // else wait server send sms then start countdown
    wafer.request({
      url: 'https://www.xingshenxunjiechuxing.com/rate/getVerifyCode',
      data: this.data.phone,
      complete: response => {
        this.c2 = new Countdown({
          date: +(new Date) + 60000,
          onEnd() {
            this.setData({
              vCodeText: '重新获取验证码',
              "hiddenVerifyCodeInput": true,
              "vCode": null
            })
          },
          render(date) {
            const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
            date.sec !== 0 && this.setData({
              vCodeText: sec,
              "hiddenVerifyCodeInput": false
            })
          },
        });
      },
    });
  },

  inputVerifyCode: function (e) {
    e.detail.value.length == 4 ? this.setData({ disabledSubmit: false }) : this.setData({ disabledSubmit: true });
  },

  //event: 输入手机号
  getPhone: function (e) {
    //console.log("event getPhone: ", e);
    this.data.vCodeText === "获取验证码" || this.setData({ "vCodeText": "获取验证码" });
    var phone = e.detail.value;
    this.data.phone = phone;
    //valid phone
    if (phone.length === 11) {
      //this.setData({ "phone": e.detail.value });
      var flag = false;
      phones.forEach(item => {
        if (phone == item) {
          flag = true;
        };
      });
      flag ? this.setData({ "disabledSubmit": false }) : this.setData({ "hiddenGetVerifyCode": false });
    } else {
      this.data.disabledSubmit || this.setData({ "disabledSubmit": true });
      this.data.hiddenGetVerifyCode || this.setData({ "hiddenGetVerifyCode": true });
      this.data.hiddenVerifyCodeInput || this.setData({ "hiddenVerifyCodeInput": true });
    }
  },

  onLoad: function (op) {
    // display page options
    console.log("op: ", op);

    /**
     * get user phone from server
     * @return array phones
     */
    //wafer.request();
    phones = [18669077710, 13708438123];

    if (phones !== []) {
      this.setData({
        name: app.globalData.userInfo.nickName || null,
        phone: phones[0],
        "disabledSubmit": false
      });
    }
  },

  submitUserInfo: function (e) {
    console.log(e);
    var sendData = app.globalData.rateSendData;
    console.log(sendData);
    sendData.phone = e.detail.value.phone;
    sendData.verifyCode = e.detail.verifyCode || 0;
    console.log("phone-form/sendData: ", sendData);

    if (sendData.phone === '') {
      wx.showToast({
        title: '手机号？',
        icon: 'none'
      });
      return;
    }

    if (sendData.verifyCode === '' && !this.data.hiddenGetVerifyCode) {
      wx.showToast({
        title: '手机验证码？',
        icon: 'none'
      });
      return;
    }
    rate(wafer, sendData).catch(console.log);
  },
});