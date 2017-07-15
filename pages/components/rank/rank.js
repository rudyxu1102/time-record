// pages/components/rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.rank) {
      this.setData({
        text: '退出'
      })
    } else {
      this.setData({
        text: '进入'
      })
    }
    if (!app.globalData.userInfo.city) {
      this.setData({
        hasBtn: false
      })
    } else {
      this.setData({
        hasBtn: true
      })
    }
    wx.request({
      url: 'https://time.xuhaodong.cn/api/allinfo',
      method: 'GET',
      success: function (res) {
        that.setData({
          infos: res.data
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '时间都去哪儿了😨',
      path: 'pages/components/rank/rank',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  outRank: function () {
    var that = this;
    var flag = !app.globalData.rank;
    var value;
    var text = this.data.text;
    if (app.globalData.rank) {
      value = '进入'
    } else {
      value = '退出'
    }

    if (app.globalData.userInfo.city) {
      wx.showModal({
        title: '提示',
        content: '是否' + text + '排行榜？',
        confirmColor: '#90CFF0',
        success: function (res) {
            if (res.confirm) {
              wx.request({
                url: 'https://time.xuhaodong.cn/api/changeInfo',
                method: 'POST',
                data: {
                  rank: flag,
                  openid: app.globalData.openid
                },
                success: function () {
                  app.globalData.rank = flag
                  wx.request({
                    url: 'https://time.xuhaodong.cn/api/allinfo',
                    method: 'GET',
                    success: function (res) {
                      that.setData({
                        text: value,
                        infos: res.data
                      })
                      wx.showToast({
                        title: '已' + text + '排行榜',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                }
              })
            }
          }
      })
    }
  }
})