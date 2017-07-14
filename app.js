//app.js
App({
  onLaunch: function() {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://time.xuhaodong.cn/api/user',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              that.globalData.openid = res.data.openid
            },
            fail: function (err) {
              console.log(err)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    this.globalData.rank = true
    console.log(this.globalData)
    
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },


  globalData: {
    userInfo: null
  }
})
