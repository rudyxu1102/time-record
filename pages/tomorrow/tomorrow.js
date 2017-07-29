//tomorrow.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    btnWidth: 310,
    starUrl: '../../image/star.png',
    starHlUrl: '../../image/star_hl.png',
    scrollFlag: false,
    scrollTop: 0,
    temNames: ['添加新模板'],
    list: [
      {
        "timeStart": "07:00",
        "timeEnd": "08:00",
        "placeholder": "开启新的一天",
        "leftStyle": 'left: 20rpx',
        "rightStyle": 'right: -310rpx',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "08:00",
        "timeEnd": "09:00",
        "placeholder": "开启新的一天",
        "leftStyle": 'left: 20rpx',
        "rightStyle": 'right: -310rpx',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "09:00",
        "timeEnd": "11:00",
        "placeholder": "开启新的一天",
        "leftStyle": 'left: 20rpx',
        "rightStyle": 'right: -310rpx',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "11:00",
        "timeEnd": "12:00",
        "placeholder": "开启新的一天",
        "leftStyle": 'left: 20rpx',
        "rightStyle": 'right: -310rpx',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "12:00",
        "timeEnd": "13:00",
        "placeholder": "开启新的一天",
        "leftStyle": 'left: 20rpx',
        "rightStyle": 'right: -310rpx',
        "value": '',
        "stars": 0
      }
    ]
  },
  onShareAppMessage: function () {
    return {
      title: '时间都去哪儿了😨',
      path: 'pages/tomorrow/tomorrow',
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
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'tomorrow',
      success: function (res) {
        if (res.data) {
          that.setData({
            list: res.data
          })
        }
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
      key: 'temNames',
      success: function (res) {
        that.setData({
          temNames: res.data
        })
      }
    })
    wx.getStorage({
      key: 'templates',
      success: function(res) {
        that.setData({
          templates: res.data
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
    wx.getStorage({
      key: 'templates',
      success: function (res) {
        that.setData({
          templates: res.data
        })
      }
    })
  },
  onHide: function () {
    this.setData({
      isEmpty: false
    })
  },

  scroll: util.debounce(function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    })
    if (e.detail.scrollTop > 50) {
      wx.setNavigationBarTitle({
        title: '明天'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '时间计划表'
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
      var disX = this.data.startX - moveX ;
      var btnWidth = this.data.btnWidth;
      var leftStyle = "";
      var rightStyle = '';
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        leftStyle = "left:20rpx";
        rightStyle = "right: -310rpx;"
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        leftStyle = "left:-" + disX + "rpx";
        var right = btnWidth - disX;
        rightStyle = "right: -" + right + 'rpx'
        if (disX >= btnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          leftStyle = "left:-" + btnWidth + "rpx";
          rightStyle = "right: 0"
        }
      } 
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].leftStyle = leftStyle;
      list[index].rightStyle = rightStyle;
      // //更新列表的状态
      this.setData({
        list: list
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
      var rightStyle = disX > btnWidth / 5 ? "right: 0" : "right: -310rpx"
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].leftStyle = leftStyle;
      list[index].rightStyle = rightStyle
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },  
  bindTimeChange: function (e) {
    var timeStart, timeEnd, isSure;
    var that = this;
    var array = this.data.list;
    var index = e.target.dataset.index;
    var key = e.target.dataset.time;  // 开始时间或者结束时间
    if (key == 'timeStart') {
      timeStart = e.detail.value;
      timeEnd = array[index].timeEnd;
      isSure = util.compareTime(timeStart, timeEnd)
    } else {
      timeEnd = e.detail.value;
      timeStart = array[index].timeStart;
      isSure = util.compareTime(timeStart, timeEnd);
    }
    if (isSure) {
      array[index][key] = e.detail.value;
    } else {
      this.setData({
        title: '提示',
        message: '开始时间不能大于结束时间哦',
        isEmpty: true
      })
      return
    }
    this.setData({
      list: array
    })
  },
  bindfocus: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    list[index].placeholder = '';
    this.setData({
      list: list
    })
  },
  addRecord: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list
    list[index].leftStyle = "left: 20rpx";  // 返回原来的位置
    list[index].rightStyle = "right: -310rpx"; // 返回原来的位置
    var timeStart = list[index].timeStart;
    var timeEnd = list[index].timeEnd;
    var newStart = timeEnd;
    var newEnd = util.newTime(timeEnd);
    let item = {
      "timeStart": newStart,
      "timeEnd": newEnd,
      "placeholder": "开启新的一天",
      "leftStyle": 'left: 20rpx',
      "rightStyle": 'right: -310rpx',
      "stars": 0,
      "value": ''
    }
    list.splice(index + 1, 0, item);
    this.setData({
      list: list,
      scrollFlag: true     // 页面可以滚动
    })
    
    // 滚动到新添加的安排
    var that = this;
    setTimeout(function () {
      that.setData({
        scrollTop: that.data.scrollTop + 60
      })
    }, 250)
  },
  delRecord: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    list.splice(index, 1);
    this.setData({
      list: list
    })
    // 设置页面滚动
    if (list.length < 6) {
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
      var list = this.data.list;
      list[index].value = e.detail.value
      this.setData({
        list: list
      })
  }, 1000),
  oneStar: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    if (list[index].stars == 1) {
      list[index].stars = 0;
    } else {
      list[index].stars = 1;
    }    
    this.setData({
      list: list
    })
  },
  twoStar: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    if (list[index].stars == 2) {
      list[index].stars = 1;
    } else {
      list[index].stars = 2;
    }   
    this.setData({
      list: list
    })
  },
  threeStar: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    if (list[index].stars == 3) {
      list[index].stars = 2;
    } else {
      list[index].stars = 3;
    }   
    this.setData({
      list: list
    })
  },
  confirmPlan: function () {
    var list = this.data.list;
    var isEmpty = list.some(function (item) {
      return item.value == ''
    })
    this.setData({
      isEmpty: isEmpty,
      message: '还没有时间安排没填喔',
      title: '提示'
    })
    if (!isEmpty) {
      wx.setStorage({
        key: "tomorrow",
        data: this.data.list
      })
      wx.setStorage({
        key: 'today',
        data: this.data.list,
      })
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  outLoading: function () {
    this.setData({
      isEmpty: false
    })
  },
  selectTem: function () {
    var that = this;
    var temNames = this.data.temNames;
    var lastIndex = temNames.length - 1;
    var templates = this.data.templates;
    wx.showActionSheet({
      itemList: temNames,
      success: function (res) {
        if (res.tapIndex >= 0 && temNames[res.tapIndex] !== '添加新模板') {
          that.setData({
            list: templates[res.tapIndex]
          })
        }
        if (res.tapIndex == lastIndex && temNames[lastIndex] == '添加新模板') {
          wx.navigateTo({
            url: '../components/template/template'
          })
        }
      }
    })
  }
})
