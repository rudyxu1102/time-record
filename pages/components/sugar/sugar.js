// pages/components/sugar/sugar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideWidth: 200,
    sugars: [
      {
        level: '初级',
        name: '',
        days: '',
        point: '',
        leftHide: 'left: 0rpx'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  addSugar: function () {
    var item = {
      level: '',
      name: '',
      days: '',
      point: '',
      leftHide: 'left: 0rpx',
      display: 'display: block'
    }
    if (this.data.sugars.length === 1) {
      item.level = '中级'
    } else {
      item.level = '终极'
    }
    var sugars = this.data.sugars;
    sugars.push(item);
    this.setData({
      sugars: sugars
    })
  },
  backHome: function () {
    wx.switchTab({
      url: '../../setting/setting'
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
      var hideWidth = this.data.hideWidth;
      var leftStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        leftStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        leftStyle = "left:-" + disX + "rpx";
        if (disX >= hideWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          leftStyle = "left:-" + hideWidth + "rpx";
        }
      }
      var index = e.target.dataset.index;
      var sugars = this.data.sugars;
      sugars[index].leftHide = leftStyle;
      this.setData({
        sugars: sugars
      })
    }
  },
  touchE: function (e) {
    var index = e.target.dataset.index;
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var hideWidth = this.data.hideWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var leftStyle = disX > hideWidth / 4 ? "left:-" + hideWidth + "rpx" : "left:0rpx";
    }
    var sugars = this.data.sugars;
    sugars[index].leftHide = leftStyle;
    sugars[index].display = "display: none"
    this.setData({
      sugars: sugars
    })
  },
  backright: function (e) {
    var sugars = this.data.sugars;
    sugars[index].leftHide = 'left: 0';
    sugars[index].display = "display: block"
    this.setData({
      sugars: sugars
    })
  },
  delSugar: function (e) {
    console.log(e)
    var index = e.target.dataset.index;
    if (index) {
      var sugars = this.data.sugars;
      sugars.splice(index, 1);
      this.setData({
        sugars: sugars
      })
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
})