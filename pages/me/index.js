import { isLogin, login } from "../../utils/permission";
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

  drawQRCode: function() {
    var params = JSON.stringify(Date.now() + Date.now() + Date.now()); // TODO 二维码内容
    QR.qrApi.draw(params, "qrcode", 300, 300);
  }
});
