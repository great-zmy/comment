// miniprogram/pages/add/add.js
var app = getApp()
//使用数据库
const db = wx.cloud.database()
const comments = db.collection('comments')

//格式化日期
function formatDate(){
  var now = new Date()
  var year = now.getFullYear()
  var month = now .getMonth()+1 //从0开始
  var day = now.getDate()

  if(month<10) month='0'+month
  if(day<10) day='0'+day

  return year + '-' + month + '-' + day
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    location:'',
    filePath:''
  },

  /**
   * 自定义函数--选择图片
   */
  choose: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        wx.showLoading({
          title: '上传中...',
        })
        //获取图片临时地址
        that.setData({
          filePath:res.tempFilePaths[0]
        })

        
      },
      fail:e => {
        console.log(e)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  /**
   * 选择位置
   */
  location:function(){
    wx.chooseLocation({
      success:res => {
        this.setData({
          location : res.name
        })
      },
      fail:e => {
        wx.showToast({
          title: '选择位置失败',
          icon:'none'
        })
      }
    })
  },
  
  bindTextAreaBlur: function(e) {
    this.setData({
      content:e.detail.value
    }) 
  },  
  /**
   * 自定义函数--发布朋友圈
   */
  upload:function(){
    let that = this
    //console.log(that.data.content,that.data.location,this.data.filePath)
    //自定义云端的图片名称
    const filePath = that.data.filePath
    let cloudPath = ''
    if(filePath){
      cloudPath = Math.floor(Math.random() * 1000000) + filePath.match(/\.[^.]+?$/)[0]
    }else{
      cloudPath = ''
    }
    //console.log(cloudPath)

    //上传图片到云存储空间中
    wx.cloud.uploadFile({
      filePath,
      cloudPath,
      success (res){
        //提示发布成功
        wx.showToast({
          title: '发布成功',
          duration:3000
        })
        //获取个人信息
        let userInfo = app.globalData.userInfo
        //获取当天日期
        let today = formatDate()

        //往云数据集中添加一条记录
        comments.add({
          data:{
            photoUrl:res.fileID,
            avatarUrl:userInfo.avatarUrl,
            nickName:userInfo.nickName,
            addDate:today,
            content:that.data.content,
            location:that.data.location,
            like:0
          },
          success:res=>{
            wx.navigateBack()
          },
          fail: e => {
            console.log(e)
          }
        })
      },
      fail:e => {
        //提示发布失败
        wx.showToast({
          title: '发布失败',
          icon:'none'
        })
      }
    })
  },

  /**
   * 自定义函数--关闭图片选择其他
   */
  close: function () {
    this.setData({
      filePath:''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
    // console.log(app.globalData.openid)
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