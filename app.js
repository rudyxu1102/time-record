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
              that.globalData.openid = res.data.openid;
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              })
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

    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
      },
      fail: function () {
        that.globalData.userInfo = {
          nickName: '👻👻👻',
          avatarUrl: 'http://chuantu.biz/t5/135/1500080922x2890149823.jpg'
        }
      }
    })
    console.log(this.globalData)
  },


  globalData: {
    userInfo: null
  }
})
