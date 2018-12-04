// pages/oneCircle/oneCircle.js
const app = getApp()
const commUrl = require('../../config').Url
const submitUrl = require('../../config').submitUrl
const setId = require('../../config').setId
const headProjectId = require('../../config').headProjectId
const adUrl = require('../../config').adUrl
const dev = require('../../config').dev
const loginUrl = require('../../config').loginUrl
const payId = require('../../config').payId
const hideLoginUrl = require('../../config').hideLoginUrl
var gauss = require('../../gauss.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this
        _this.getDate()
        _this.makePic()
        _this.makePic1()
        
    },
    getDate(e) {
        var date = new Date();
        var seperator1 = "/";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.data.day = currentdate
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    // 下载canvas上用的图片
    downLoadImg (info){
        let _this = this
        console.log(_this.data.info.user_avatar,'userAva')
        wx.downloadFile({
            url: _this.data.info.user_avatar,
            success (res) {
                _this.setData({
                    head: res.tempFilePath,
                    res: res
                })
                console.log(_this.data.head,'head')
                _this.makePic()                
            }
        }) 
    },
    makePic(e) {
        let _this = this,
            wWidth = 325,
            cHeight = 525,
            ctx = wx.createCanvasContext('myCanvas'),
            bgimg = "../../img/bg.png",
            peoImg = "../../img/head.jpg",
            code = '../../img/code.png',
            day = _this.data.day,
            name = "朱一龙",
            hot = "1.2w"
        ctx.drawImage(peoImg, 12, 12, wWidth-24, cHeight-24)
        ctx.drawImage(bgimg, 0, 0, wWidth, cHeight)
        ctx.setFillStyle('#333')
        ctx.font = 'normal bold 24px Adobe 黑体 Std';
        ctx.fillText(name, 22, 415)
        ctx.font = 'normal 15px Adobe 黑体 Std';
        ctx.fillText('热度：' + hot, 22, 435)


        ctx.setFillStyle('#fff')
        ctx.setTextAlign('right')
        // ctx.setFontSize(14)
        // ctx.fillText('我已经加入' + name + '饭圈',310, 435)
        // ctx.fillText('你要不要一起来？',315, 452)

        ctx.setFontSize(11)
        ctx.fillText(day,310, 435)
        ctx.setFontSize(13)
        ctx.fillText('周榜NO.1 月榜NO.1',315, 452)


        // 画出小程序码
        ctx.drawImage(code, 22 , cHeight - 60, 45, 45)
        ctx.setFontSize(12)
        ctx.fillText('长按识别小程序，立即加入',230,cHeight-25)
        ctx.draw()

    },
    makePic1 (info) {
        let _this = this,
            wWidth = 300,
            cHeight = 465,
            ctx = wx.createCanvasContext('myCanvas1'),
            head = "../../img/head.jpg",
            code = '../../img/code.png',
            name = "朱一龙",
            rank = "NO.1",
            hot = "1.2w",
            obj = {
                x: 0,
                y: 0,
                width: wWidth,
                height: cHeight
            },
            obj1= {
                x: 37,
                y: 68,
                width: 225,
                height: 328
            }
        
        ctx.drawImage(head, 0, 0, wWidth, cHeight) 
        setTimeout(() => {
            _this.process('myCanvas1',obj1,0,0,2)
        },500)
        setTimeout(() => {
            console.log(1111)
            ctx.draw(true,()=>{
            
                _this.process('myCanvas1',obj,40,4,1)
                
            })
        },1000)
        setTimeout(() => {
            console.log('2222')
            ctx.draw(true,()=>{
            
                _this.process('myCanvas1',obj1,0,0,3)
                
            })
        },1200)
        // 画出纯色盒子
        ctx.setFillStyle('#facd05')
        ctx.fillRect(37, 68, 225, 328)

        ctx.drawImage(head, 47, 78, 206, 225) 

        ctx.setFillStyle('#333')
        // ctx.setTextAlign('right')
        ctx.setFontSize(12)
        ctx.fillText('长按为爱打榜',47, 330)
        ctx.font = 'normal bold 24px Adobe 黑体 Std';
        ctx.fillText(name, 175, 330)
        ctx.font = 'normal 15px Adobe 黑体 Std';
        ctx.fillText('热度：' + hot, 170, 355)
        ctx.setFontSize(13)
        ctx.fillText('周榜NO.1 月榜NO.1',130, 375)
        ctx.drawImage(code, 52 , 336, 50, 50)

        ctx.draw(true)
    },
    
    // 设置模糊度
    process (el,info,radius,sigma,index) {
        let _this = this
        wx.canvasGetImageData({
          canvasId: el,
          ...info,
          // ...cfg,
          success: (res) => {
            console.log(res,'1111111',index)

            let data = gauss(res,radius,sigma).data
            if (index == 2) {
                _this.data.data2 = res
            }
            if (index == 3) {
                data = gauss(_this.data.data2,radius,sigma).data
            }
            wx.canvasPutImageData({
              canvasId: el,
              data,
              ...info,
              // ...cfg,
              success: (res) => {
                console.log(res)
              },
              fail: (err) => {
                console.error(err)
              }
            })
          },
          fail: (err) => {
            console.error(err)
          }
        })
    },
    // 点击保存，生成图片
    savePicture(e){
        var paths = [],
            _this = this,
            id = e.target.dataset.id
        console.log(e,'zjsj ')
        if (e) {
            _this.isForm(e)
        }
        var user_id = wx.getStorageSync('user_id');
        // _this.isForm(e)
        console.log(_this.data.save1,'点击了保存')
        if (_this.data.save1 && !head) {
            return false
        }
        _this.data.save1 = true

        
        _this.setData({
            save1: false
        })
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: id,
            success(res){
                wx.showLoading({
                    title: '正在保存图片'
                })
               console.log(res,'保存的res')
                _this.data.lastImg = res.tempFilePath
                // wx.previewImage({
                //     current: res.tempFilePath, // 当前显示图片的http链接
                //     urls: [res.tempFilePath] // 需要预览的图片http链接列表
                // })
                wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                        _this.setData({
                            getPic: false
                        })
                        wx.hideLoading()
                        wx.saveImageToPhotosAlbum({
                            filePath: _this.data.lastImg,
                            success(resss) {
                                
                                wx.showToast({
                                    title: '图片保存成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                _this.setData({
                                    save1: false,
                                    showbg: false
                                })
                            },
                            fail(){
                                wx.showToast({
                                    title: '图片保存失败',
                                    icon: 'success',
                                    duration: 2000
                                })
                                _this.setData({
                                    save1: false
                                })
                            }
                        })
                    },
                    fail(){   
                        wx.showToast({
                            title: '您拒绝授权,将无法保存图片,点击重新获取授权。',
                            icon: 'success',
                            duration: 2000
                        })                         
                        wx.hideLoading()
                        _this.setData({
                            save1: false,
                            getPic: true
                        })
                                         
                    }

                })
                
            }
        })
        
    },
    // 点击form提交的函数
    isForm (e) {
        wx.request({
            url: submitUrl,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                "form_id": e.detail.formId,
                "set_id": setId,
                "user_id": wx.getStorageSync('user_id')
            },
            success: function(res) {       
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: "快来支持朱一龙，拿下NO.1",
            
            success: function(res) {
                console.log('转发成功')
            },
            fail: function(res) {
                console.log('外部的分享失败')
            }
        }
    }   
})