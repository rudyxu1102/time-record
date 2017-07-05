//tomorrow.js
//获取应用实例
var util = require('../../utils/util.js');
Page({
  data: {
    btnWidth: 310,
    starUrl: '../../image/star.png',
    starHlUrl: '../../image/star_hl.png',
    scrollFlag: false,
    scrollTop: 0,
    list: [
      {
        "timeStart": "07:00",
        "timeEnd": "08:00",
        "placeholder": "开启新的一天",
        "leftStyle": '',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "08:00",
        "timeEnd": "09:00",
        "placeholder": "开启新的一天",
        "leftStyle": '',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "09:00",
        "timeEnd": "11:00",
        "placeholder": "开启新的一天",
        "leftStyle": '',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "11:00",
        "timeEnd": "12:00",
        "placeholder": "开启新的一天",
        "leftStyle": '',
        "value": '',
        "stars": 0
      },
      {
        "timeStart": "12:00",
        "timeEnd": "13:00",
        "placeholder": "开启新的一天",
        "leftStyle": '',
        "value": '',
        "stars": 0
      }
    ]
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
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       windowHeight: res.windowHeight
    //     })
    //   }
    // })
  },
  scroll: util.debounce(function (e) {
    console.log(e.detail.scrollTop)
    this.setData({
      scrollTop: e.detail.scrollTop
    })
    if (e.detail.scrollTop > 50) {
      wx.setNavigationBarTitle({
        title: '明天'
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
      var disX = this.data.startX - moveX;
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
      var list = this.data.list;
      list[index].leftStyle = leftStyle;
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
      var disX = this.data.startX - endX;
      var btnWidth = this.data.btnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var leftStyle = disX > btnWidth / 5 ? "left:-" + btnWidth + "rpx" : "left:20rpx";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].leftStyle = leftStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  bindTimeChange: function (e) {
    var that = this;
    var array = this.data.list;
    var index = e.target.dataset.index;
    var order = e.target.dataset.time;  // 开始时间或者结束时间
    array[index][order] = e.detail.value;
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
    var timeStart = list[index].timeStart;
    var timeEnd = list[index].timeEnd;
    var newStart = util.newTime(timeStart);
    var newEnd = util.newTime(timeEnd);
    let item = {
      "timeStart": newStart,
      "timeEnd": newEnd,
      "placeholder": "开启新的一天",
      "leftStyle": ''
    }
    list.splice(index + 1, 0, item);
    this.setData({
      list: list,
      scrollFlag: true     // 页面可以滚动
    })
    // 滚动到新添加的安排
    this.setData({
      scrollTop: this.data.scrollTop + 60 
    })
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
    list[index].stars = 2;
    this.setData({
      list: list
    })
  },
  threeStar: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    list[index].stars = 3;
    this.setData({
      list: list
    })
  },
  confirmPlan: function () {
    // wx.showLoading({
    //   title: 'haha',
    // })
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
    // wx.hideLoading();
  },
  selectTem: function () {
    var that = this;
    var temList = ['工作日', '休息日', '添加新模板'];
    wx.showActionSheet({
      itemList: temList,
      success: function (res) {
        var length = temList.length;

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})
