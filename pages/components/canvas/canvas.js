// pages/components/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 500,
    leftStyle: 'left: 0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'today',
      success: function(res) {
        that.setData({
          data: res.data
        })
      }
    })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       width: res.windowWidth
    //     })
    //     console.log(res.windowWidth)
    //     console.log(res.windowHeight)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var width = this.data.width - 10;
    var ctx = wx.createCanvasContext('timeData');

    ctx.setFillStyle('#DDDDDD')
    ctx.fillRect(30, 0, width, 200)
    ctx.draw()
    ctx.setFillStyle('red')
    ctx.fillRect(300, 100, 150, 75)
    ctx.draw()
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
  
  },
  scroll: function (e) {
    this.setData({
      left: e.detail.scrollLeft
    })
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var width = this.data.width;
      var leftStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        leftStyle = "left:0";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        leftStyle = "left:-" + disX + "rpx";
        if (disX >= width) {
          //控制手指移动距离最大值为删除按钮的宽度
          leftStyle = "left:-" + width + "rpx";
        }
      }
      this.setData({
        leftStyle: leftStyle
      });
    }
  },
  // touchE: function (e) {
  //   if (e.changedTouches.length == 1) {
  //     //手指移动结束后水平位置
  //     var endX = e.changedTouches[0].clientX;
  //     //触摸开始与结束，手指移动的距离
  //     var disX = this.data.startX - endX;
  //     var width = this.data.width;
  //     //如果距离小于删除按钮的1/2，不显示删除按钮
  //     var leftStyle = disX > btnWidth / 5 ? "left:-" + btnWidth + "rpx" : "left:20rpx";
  //     //获取手指触摸的是哪一项
  //     var index = e.target.dataset.index;
  //     var list = this.data.list;
  //     list[index].leftStyle = leftStyle;
  //     //更新列表的状态
  //     this.setData({
  //       list: list
  //     });
  //   }
  // },  
})