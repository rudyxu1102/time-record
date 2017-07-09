//logs.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    temNames: ['添加新模板']
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    wx.getStorage({
      key: 'temNames',
      success: function(res) {
        that.setData({
          temNames: res.data
        })
      }
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'temNames',
      success: function (res) {
        that.setData({
          temNames: res.data
        })
      }
    })
  },
  addTemplate: function ()　{
    var that = this;
    var temNames = this.data.temNames;
    wx.showActionSheet({
      itemList: temNames,
      success: function (res) {
        if (res.tapIndex >= 0) {
          wx.navigateTo({
            url: '../components/template/template?tapIndex=' + res.tapIndex
          })
        }
      }
    })
  },
  introduce: function () {
    wx.navigateTo({
      url: '../components/introduce/introduce'
    })
  },
  showRank: function () {
    wx.navigateTo({
      url: '../components/rank/rank'
    })
  },
  makeSugar: function () {
    wx.navigateTo({
      url: '../components/sugar/sugar'
    })
  }
})
