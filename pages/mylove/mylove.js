const app = getApp()
var routes = require('image-routes');
Page({
  data: {
    delBtnWidth: 160,
    data: [{ content: "1", right: 0 }, { content: "2", right: 0 }],
    isScroll: true,
    windowHeight: 0,
    cellHeight: '120px',
    pageItems: []
  },
  onLoad: function () {
    var that = this
    // console.log(routes.PageItems);
    //调用应用实例的方法获取全局数据
    var images_url = [];
    var pageItems = [];
    var row = [];
    var len = routes.PageItems.length;//重组PageItems
    len = Math.floor((len + 2) / 3) * 3;
    for (var i = 0; i < len; i++) {
      if ((i + 1) % 3 == 0) {
        row.push(routes.PageItems[i]);
        pageItems.push(row);
        row = [];
        continue;
      }
      else {
        row.push(routes.PageItems[i]);
      }
    }
    for (var j = 0; j < routes.PageItems.length; j++) {
      images_url[j] = routes.PageItems[j]['icon'];
    }
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          cellHeight: (windowWidth / 3) + 'px'
        })
      },
      complete: function () {
        // console.log(pageItems)
        that.setData({
          pageItems: pageItems,
          imagesList: images_url
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    // console.log(src)
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.data
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.data[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  },
  delItem: function (e) {
  }
})