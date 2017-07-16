// pages/components/sugar/sugar.js
var util = require('../../../utils/util');
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
        nameHolder: '看一部电影',
        daysHolder: '3',
        pointHolder: '0~100',
        leftHide: 'left: 0rpx',
        color: util.getRandColor(5),
        times: 0,
        flag: true   // 防止times重复增加
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'sugars',
      success: function(res) {
        if (res.data) {
          that.setData({
            sugars: res.data
          })
        }
      },
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
    this.setData({
      loading: false
    })
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
      display: 'display: block',
      color: util.getRandColor(5),
      times: 0
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
        leftStyle = "left:-" + hideWidth + "rpx";
      }
      var index = e.target.dataset.index;
      var sugars = this.data.sugars;
      sugars[index].leftHide = leftStyle;
      if (disX >= hideWidth) {
        sugars[index].display = 'display: none'
      }
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
    var that = this;
    setTimeout(function () {
      var index = e.target.dataset.index;
      var sugars = that.data.sugars;
      sugars[index].leftHide = 'left: 0';
      sugars[index].display = "display: block"
      that.setData({
        sugars: sugars
      })
    }, 4000)
  },
  delSugar: function (e) {
    var index = e.target.dataset.index;
    if (index) {
      var sugars = this.data.sugars;
      sugars.splice(index, 1);
      if (index == 1 && sugars.length == 2) {
        console.log(111)
        sugars[1].level = '中级'
      }
      this.setData({
        sugars: sugars
      })
      wx.setStorage({
        key: 'sugars',
        data: sugars
      })
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  saveSugar: util.debounce(function (e) {
    var index = e.target.dataset.index;
    var key = e.target.dataset.key;
    var sugars = this.data.sugars;
    sugars[index][key] = e.detail.value;
    if (key == 'point') {
      if (e.detail.value < 0 || e.detail.value > 100) {
        sugars[index].point = '';
        this.setData({
          loading: true,
          message: '请在合适的范围内输入',
          title: '提示',
        })
      }
    }
    this.setData({
      sugars: sugars
    })
  }, 500),
  hideDelBtn: function (e) {
    var index = e.target.dataset.index;
    var sugars = this.data.sugars;
    sugars[index].leftHide = 'left: 0';
    sugars[index].display = "display: block";
    this.setData({
      sugars: sugars
    })
  },
  confirm: function () {
    var sugars = this.data.sugars;
    var isEmpty = sugars.some(function (item) {
      return item.name == '' && item.days == '' && item.point == '';
    })
    if (!isEmpty) {
      wx.setStorage({
        key: 'sugars',
        data: sugars,
      })
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      this.setData({
        loading: true,
        message: '还有选项没写哦',
        title: '提示'
      })
    }
  },
  outLoading: function () {
    this.setData({
      loading: false
    })
  }
})