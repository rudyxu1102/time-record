// pages/today/today.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnWidth: 310,
    starUrl: '../../image/star.png',
    starHlUrl: '../../image/star_hl.png',
    scrollFlag: false,
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'today',
      success: function (res) {
        that.setData({
          todayList: res.data
        })
        // 设置页面滚动
        if (res.data.length > 5) {
          that.setData({
            scrollFlag: true
          })
        } else {
          that.setData({
            scrollFlag: false
          })
        }
      }
    })
    wx.getStorage({
      key: 'tomorrow',
      success: function(res) {
        if (res.data) {
          that.setData({
            tomorrowList: res.data
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
    var that = this;
    wx.getStorage({
      key: 'today',
      success: function (res) {
        that.setData({
          todayList: res.data
        })
        // 设置页面滚动
        if (res.data.length > 5) {
          that.setData({
            scrollFlag: true
          })
        } else {
          that.setData({
            scrollFlag: false
          })
        }
      }
    })
    if (this.data.scrollTop > 50) {
      wx.setNavigationBarTitle({
        title: '今天'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '时间记录'
      })
    }
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
  scroll: util.debounce(function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    })
    if (e.detail.scrollTop > 50) {
      wx.setNavigationBarTitle({
        title: '今天'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '时间记录'
      })
    }
  }, 500),
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
      var disX = this.data.startX - moveX + 20;
      var btnWidth = this.data.btnWidth;
      var leftStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        leftStyle = "left:20rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        leftStyle = "left:-" + disX + "rpx";
        if (disX >= btnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          leftStyle = "left:-" + btnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var todayList = this.data.todayList;
      todayList[index].leftStyle = leftStyle;
      // //更新列表的状态
      this.setData({
        todayList: todayList
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX + 20;
      var btnWidth = this.data.btnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var leftStyle = disX > btnWidth / 5 ? "left:-" + btnWidth + "rpx" : "left:20rpx";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var todayList = this.data.todayList;
      todayList[index].leftStyle = leftStyle;
      //更新列表的状态
      this.setData({
        todayList: todayList
      });
    }
  },
  bindTimeChange: function (e) {
    var timeStart, timeEnd, isSure;
    var that = this;
    var array = this.data.todayList;
    var index = e.target.dataset.index;
    var key = e.target.dataset.time;  // 开始时间或者结束时间
    if (key == 'timeStart') {
      timeStart = e.detail.value;
      timeEnd = array[index].timeEnd;
      isSure = util.compareTime(timeStart, timeEnd)
    } else {
      timeEnd = e.detail.value;
      timeStart = array[index].timeStart;
      isSure = util.compareTime(timeStart, timeEnd)
    }
    if (isSure) {
      array[index][key] = e.detail.value;
    } else {
      this.setData({
        title: '提示',
        message: '时间范围不合适哦',
        loading: true
      })
      return
    }
    this.setData({
      todayList: array
    })
  },
  bindfocus: function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList;
    todayList[index].placeholder = '';
    this.setData({
      todayList: todayList
    })
  },
  addRecord: function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList
    todayList[index].leftStyle = "left: 20rpx";  // 返回原来的位置
    var timeStart = todayList[index].timeStart;
    var timeEnd = todayList[index].timeEnd;
    var newStart = util.newTime(timeStart);
    var newEnd = util.newTime(timeEnd);
    let item = {
      "timeStart": newStart,
      "timeEnd": newEnd,
      "placeholder": "开启新的一天",
      "leftStyle": '',
      "value": ''
    }
    todayList.splice(index + 1, 0, item);
    this.setData({
      todayList: todayList,
      scrollFlag: true     // 页面可以滚动
    })
    wx.setStorage({
      key: 'today',
      data: todayList,
    })
    // 滚动到新添加的安排
    this.setData({
      scrollTop: this.data.scrollTop + 60
    })
  },
  delRecord: function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList;
    todayList.splice(index, 1);
    this.setData({
      todayList: todayList
    })
    wx.setStorage({
      key: 'today',
      data: todayList,
    })
    // 设置页面滚动
    if (todayList.length < 6) {
      this.setData({
        scrollFlag: false,
        scrollTop: 0
      })
    } else {
      this.setData({
        scrollFlag: true
      })
    }
  },
  bindInput: util.debounce(function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList;
    todayList[index].value = e.detail.value
    this.setData({
      todayList: todayList
    })
  }, 500),
  oneStar: function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList;
    if (todayList[index].stars == 1) {
      todayList[index].stars = 0;
    } else {
      todayList[index].stars = 1;
    }
    this.setData({
      todayList: todayList
    })
    wx.setStorage({
      key: 'today',
      data: todayList,
    })
  },
  twoStar: function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList;
    todayList[index].stars = 2;
    this.setData({
      todayList: todayList
    })
    wx.setStorage({
      key: 'today',
      data: todayList,
    })
  },
  threeStar: function (e) {
    var index = e.target.dataset.index;
    var todayList = this.data.todayList;
    todayList[index].stars = 3;
    this.setData({
      todayList: todayList
    })
    wx.setStorage({
      key: 'today',
      data: todayList,
    })
  },
  outLoading: function () {
    this.setData({
      loading: false
    })
  },
  compareData: function () {
    var todayList = this.data.todayList;
    var isEmpty = todayList.some(function (item) {
      return item.value == ''
    })
    if (!isEmpty) {
      var tomorrowList = this.data.tomorrowList;
      var todayList = this.data.todayList;
      
      var todayValue = todayList.map(function (item) {
        return item.value
      })
      var timePoint = 0;
      var starWeight = 0;
      tomorrowList.forEach(function (item, tomorrowIndex) {
        var todayIndex = todayValue.indexOf(item.value)
    
        if (todayIndex !== -1) {
          var tomorrowS = item.timeStart;
          var tomorrowE = item.timeEnd;
          var todayS = todayList[todayIndex].timeStart;
          var todayE = todayList[todayIndex].timeEnd;
          var tomorrowMin = util.deltaTime(tomorrowS, tomorrowE);
          var todayMin = util.deltaTime(todayS, todayE);
          var percent = util.percentMin(tomorrowMin, todayMin);
          var stars = item.stars;
          var weight;
          if (stars == '0') { weight = 0};
          if (stars == '1') { weight = 15 };
          if (stars == '2') { weight = 30 };
          if (stars == '3') { weight = 55 };
          var point = percent * weight;
          timePoint = timePoint + point;
          starWeight = starWeight + weight
          
        } else {

        }
      })
      var planPoint = (timePoint / starWeight).toFixed(0);
      wx.showToast({
        title: '评分：' + planPoint + '分！',
      })
    } else {
      console.log(23333)
      this.setData({
        title: '提示',
        message: '还有时间安排没填哦',
        loading: true
      })
    }
  }
})