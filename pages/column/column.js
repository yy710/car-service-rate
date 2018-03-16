var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
    main: {
        title: '月度星级评定分数',
        data: [3, 3.5, 4.1, 3.9],
        categories: ['3月', '4月', '5月', '6月']
    },
    sub: [{
        title: '3月调查统计',
        data: [70, 40, 65, 100, 34, 18,12,21,23,22],
        categories: ['接待不及时', '服务态度恶劣', '费用解释不清楚', '未提醒注意事项', '业务生疏', '随车工具及备件缺失',"未做功能操作演示", "验车交车不认真","不介绍售后服务", "无人跟踪回访"]
    }, {
        title: '4月调查统计',
        data: [55, 30, 45, 36, 56, 13],
        categories: ['接待不及时', '服务态度恶劣', '费用解释不清楚', '未提醒注意事项', '业务生疏', '随车工具及备件缺失', "未做功能操作演示", "验车交车不认真", "不介绍售后服务", "无人跟踪回访"]
    }, {
        title: '5月调查统计',
        data: [76, 45, 32, 74, 54, 35],
        categories: ['接待不及时', '服务态度恶劣', '费用解释不清楚', '未提醒注意事项', '业务生疏', '随车工具及备件缺失', "未做功能操作演示", "验车交车不认真", "不介绍售后服务", "无人跟踪回访"]               
    }, {
        title: '6月调查统计',
        data: [76, 54, 23, 12, 45, 65],
        categories: ['接待不及时', '服务态度恶劣', '费用解释不清楚', '未提醒注意事项', '业务生疏', '随车工具及备件缺失', "未做功能操作演示", "验车交车不认真", "不介绍售后服务", "无人跟踪回访"]
    }]
};
Page({
    data: {
      chartTitle: '星级评定平均分',
        isMainChartDisplay: true
    },
    backToMainChart: function () {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
                name: '星级评定平均分',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '分';
                }
            }]
        });
    },
    touchHandler: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                    name: '评价数',
                    data: chartData.sub[index].data,
                    format: function (val, name) {
                        //return val.toFixed(2) + '次';
                        return '';
                    }
                }]
            });

        }
    },
    onReady: function (e) {
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '平均分',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '分';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '';
                },
                title: '',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});