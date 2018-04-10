let wafer = require('./components/wafer-client-sdk/index.js');

App({
  onLaunch: function () {
    let that = this;
    // 设置登录地址
    wafer.setLoginUrl('https://www.xingshenxunjiechuxing.com/rate/login');
    this.globalData.wafer = wafer;
    wafer.login({
      success: function (userInfo) {
        console.log('登录成功', userInfo);
        that.globalData.userInfo = userInfo;
      },
      fail: function (err) {
        console.log('登录失败', err);
      }
    });
  },
  globalData: {
    userInfo: null
  }
})