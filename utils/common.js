var rate = function (wafer, data) {
  return new Promise(function (resolve, reject) {
    wafer.request({
      url: 'https://www.xingshenxunjiechuxing.com/rate/submit',
      data: data,
      dataType: "json",
      header: { 'content-type': 'application/json' },// 默认值
      success: function (res) {
        resolve(res);
        wx.hideLoading();

        if (res.data.id === 1) {
          wx.showModal({
            title: '提交成功',
            content: '感谢你的参与！',
            success: function (res) {
              wx.switchTab({
                url: '../my/my',
              });
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
    });
  });
}

module.exports = { rate };