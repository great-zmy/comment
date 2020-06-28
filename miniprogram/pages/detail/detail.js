// miniprogram/pages/detail/detail.js
//使用数据库
const db = wx.cloud.database()
const comments = db.collection('comments')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数--查看图片
   */
  preview: function (e) {
    //console.log(e.currentTarget.dataset.url)
    var url = [e.currentTarget.dataset.url]
    wx.previewImage({
      urls: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //获取被点击图片的url
    let id = options.id
    //提示正在加载中
    wx.showLoading({
      title: '数据加载中',
    })

    //查找云数据集comments中该朋友圈的上传记录
    comments.where({
      _id:id
    }).get({
      success:res => {
        this.setData({
          commentList:res.data
        })
        
        //关闭提示框
        wx.hideLoading()
      }
      
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

  }
})