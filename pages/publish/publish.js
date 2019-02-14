const app = getApp()
var that;
Page({
  data: {
    images: [],
    uploadedImages: [],
    hidden1: true,
    
  },
  onLoad: function(options) {
    that = this;
    var objectId = options.objectId;
    
  },
  chooseImage: function() {
    // 选择图片
    var images = that.data.images;
    if (images.length < 9) {
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          that.setData({
            images: that.data.images.concat(tempFilePaths)
          });
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '最多只能添加9张图片',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  // 图片预览
  previewImage: function(e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  // submit: function () {        
  //   // 提交图片，事先遍历图集数组
  //   that.data.images.forEach(function (tempFilePath) {
  //     new AV.File('file-name', {
  //       blob: {
  //         uri: tempFilePath,
  //       },
  //     }).save().then(                
  //       // file => console.log(file.url())
  //     function (file) {                    
  //       // 先读取
  //       var uploadedImages = that.data.uploadedImages;
  //       uploadedImages.push(file.url());                    
  //       // 再写入
  //       that.setData({
  //         uploadedImages: uploadedImages
  //       }); console.log(uploadedImages);
  //     }
  //     ).catch(console.error);
  //   });
  //   wx.showToast({
  //     title: '评价成功', success: function () {
  //       wx.navigateBack();
  //     }
  //   });
  // }, 
  delete: function(e) {
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },
  choseType: function(){
    that.setData({
      hidden: true,
      hidden1: false
    })
  },
  bqb:function(){
    that.setData({
      hiddenbqb: false,
      hiddentx: true,
      hiddenbz: true,
    })
  },
  tx: function () {
    that.setData({
      hiddenbqb: true,
      hiddentx: false,
      hiddenbz: true,
    })
  },
  bz: function () {
    that.setData({
      hiddenbqb: true,
      hiddentx: true,
      hiddenbz: false,
    })
  }
})