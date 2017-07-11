// pages/components/alldata/alldata.js
var app = getApp();
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    
    var logs = wx.getStorageSync('logs')
    if (logs) {
      let length = Object.keys(logs).length;
      this.setData({
        logs: logs,
        logs_length: length
      })
    } else {
      this.setData({
        logs_length: 0
      })
    }
    var date = new Date()
    var moment = util.dayMoment(date);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = date.getDate();
    var firstDay = new Date(year, month-1, 1);
    var weekday = firstDay.getDay();
    console.log(weekday);
    var monthDays = util.formatTime(new Date(year, month, 1), -1).slice(-2)
    var calendar = util.makeCalendar(monthDays, weekday, logs);
    this.setData({
      yearMonth: year + '年' + month + '月' + today + '日',
      moment: moment,
      monthDays: monthDays,
      calendar: calendar,
      today: today
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var today = util.formatTime(new Date(), 0);
    var keepDays = wx.getStorageSync('keepDays') || [];
    var keepDays_length = Object.keys(keepDays).length;
    var sugars = wx.getStorageSync('sugars');
    if (sugars) {
      var progress = sugars.map(function (item) {
        var obj = {};
        obj['name'] = item.name;
        if (item.sugarDays) {
          var leftDays = item.sugarDays % item.days;
          var times = Math.floor(item.sugarDays / item.days);
          var percent = (leftDays / item.days).toFixed(2) * 100 || 100
          obj['percent'] = percent
        } else if (item.sugarDays == 0) {
          obj['percent'] = 0
        }
        var arr = ['#D3DCE6'];
        for (var i=0; i < times; i++) {
          arr.unshift(item.color)
        }
        if (percent == 100 && !keepDays.hasOwnProperty(today)) {
          obj['percent'] = 0;
          arr.push('#D3DCE6');
        }
        if (percent == 100) {
          arr.pop();
        } else if (arr[arr.length-1] == item.color) {
          arr.push('#D3DCE6')
        } 
        obj['icon'] = arr;
        obj['color'] = item.color;
        return obj
      })
      console.log(progress)
      this.setData({
        progress: progress
      })
    }
    this.setData({
      keepDays: keepDays,
      keepDays_length: keepDays_length
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})