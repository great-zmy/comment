//index.js
var app = getApp()
//使用数据库
const db = wx.cloud.database()
const comments = db.collection('comments')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:''
  },

  /**
   * 自定义函数--获取用户个人信息
   */
  getUserInfo: function (e) {
    //console.log(e.detail.userInfo)
    //将个人信息存放到全局变量userInfo中
    app.globalData.userInfo = e.detail.userInfo
    //检查是否已经获取openid,如果是第一次的话就。。。
    if (app.globalData.openid == null) {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          //console.log(res.result.openid)
          //将用户openid信息存放到全局变量openid中
          app.globalData.openid = res.result.openid
        }
      })
    }
  },

  /**
   * 自定义函数--跳转页面
   */
  goToAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
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
    this.setData({
      nickName:options.nickName,
      avatarUrl:options.avatarUrl
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
    //获取朋友圈列表
    comments.orderBy('addDate', 'desc').get({
      success: res => {

        this.setData({
          commentList: res.data
        })
      }
    })
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
