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
    var that = this;
    wx.getStorage({
      key: 'keepDays',
      success: function(res) {
        var length = Object.keys(res.data).length;
        that.setData({
          keepDays: res.data,
          keepDays_length: length
        })
      },
      fail: function () {
        that.setData({
          keepDays_length: 0
        })
      }
    })
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
    console.log(logs)
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