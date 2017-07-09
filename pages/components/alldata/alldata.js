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
      }
    })
    wx.getStorage({
      key: 'logs',
      success: function(res) {
        var length = Object.keys(res.data).length;
        that.setData({
          logs: res.data,
          logs_length: length
        })
      }
    })
    var date = util.yearMonth(new Date())
    this.setData({
      date: date
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