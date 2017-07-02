//tomorrow.js
//获取应用实例
var app = getApp()
Page({
  data: {
    btnWidth: 300,
    list: [
      {
        "timeStart": "07:00",
        "timeEnd": "08:00",
        "inputValue": "hello world",
        "leftStyle": ''
      },
      {
        "timeStart": "08:00",
        "timeEnd": "09:00",
        "inputValue": "hello world",
        "leftStyle": ''
      },
      {
        "timeStart": "09:00",
        "timeEnd": "11:00",
        "inputValue": "hello world",
        "leftStyle": ''
      },
      {
        "timeStart": "11:00",
        "timeEnd": "12:00",
        "inputValue": "hello world",
        "leftStyle": ''
      }
    ]
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
      var btnWidth = this.data.btnWidth;
      var leftStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        leftStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        leftStyle = "left:-" + disX + "rpx";
        if (disX >= btnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          leftStyle = "left:-" + btnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      console.log(e)
      console.log(leftStyle)
      var list = this.data.list;
      list[index].Style = leftStyle;
      // //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  touchE: function (e) {
    // if (e.changedTouches.length == 1) {
    //   //手指移动结束后水平位置
    //   var endX = e.changedTouches[0].clientX;
    //   //触摸开始与结束，手指移动的距离
    //   var disX = this.data.startX - endX;
    //   var btnWidth = this.data.btnWidth;
    //   //如果距离小于删除按钮的1/2，不显示删除按钮
    //   var leftStyle = disX > btnWidth / 2 ? "left:-" + btnWidth + "px" : "left:0px";
    //   //获取手指触摸的是哪一项
    //   var index = e.target.dataset.i;
    //   var list = this.data.list;
    //   list[index].leftStyle = leftStyle;
    //   //更新列表的状态
    //   this.setData({
    //     list: list
    //   });
    // }
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
  }
})
