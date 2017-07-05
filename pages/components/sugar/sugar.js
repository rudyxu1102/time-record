// pages/components/sugar/sugar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sugars: [
      {
        level: '初级',
        name: '',
        days: '',
        point: ''
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
      point: ''
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
  }
})