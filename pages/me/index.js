import { isLogin, logout } from "../../utils/permission";
import { getUserInfo } from "../../apis/user";
import QR from "../../utils/qrcode";

var app = getApp();

Page({
  data: {
    isLogin: isLogin(),
    userInfo: {
      id: null,
      name: "",
      phone: ""
    }
  },

  onShow: function(options) {
    this.setData({ isLogin: isLogin() });
    if (!this.data.userInfo.id && isLogin()) {
      if (!app.globalData.userInfo) {
        wx.showLoading();
        getUserInfo()
          .then(({ data }) => {
            wx.hideLoading();
            app.setUserInfo(data);
            this.setData({ userInfo: data });
            this.drawQRCode();
          })
          .catch(() => {
            wx.hideLoading();
          });
      } else {
        this.setData({ userInfo: app.globalData.userInfo });
        this.drawQRCode();
      }
    }
  },

  onLogout: function() {
    wx.showModal({
      content: "确定退出登录？",
      success: res => {
        if (res.confirm) {
          logout() && this.setData({ isLogin: false });
        }
      }
    });
  },

  drawQRCode: function() {
    var size = this.setCanvasSize();
    var params = JSON.stringify(Date.now() + Date.now() + Date.now()); // TODO 二维码内容
    QR.qrApi.draw(params, "qrcode", size.w, size.h);
  },

  // 适配不同屏幕大小的canvas
  setCanvasSize: function() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 600; // 不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; // canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  }
});
