//logs.js
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  addTemplate: function ()　{
    var that = this;
    var temList = ['工作日', '休息日', '添加新模板'];
    wx.showActionSheet({
      itemList: temList,
      success: function (res) {
        var length = temList.length;
        if(res.tapIndex === length - 1) {
          wx.navigateTo({
            url: '../components/template/template'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
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
