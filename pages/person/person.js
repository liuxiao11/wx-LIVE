const app = getApp()
Page({
  data: {
    time: new Date().getFullYear()
  },
  onLoad: function () {
    this.setData({
      // time:'111'
      //上边data里和这儿都可以为xml里的变量赋值，此处的优先级高于上边 是因为 上边data 数据是构建初始数据
    })
  },
  mylove: function(){
    wx.navigateTo({
      url: '../mylove/mylove',
    })
  }
})