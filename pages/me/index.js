import { isLogin, login } from "../../utils/permission";
import { getUserInfo } from "../../apis/user";
import QR from "../../utils/qrcode";

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
    if (isLogin()) {
      if (!getApp().globalData.userInfo) {
        wx.showLoading();
        getUserInfo()
          .then(({ data }) => {
            this.setData({ userInfo: data });
            this.drawQRCode();
            wx.hideLoading();
          })
          .catch(() => {
            wx.hideLoading();
          });
      } else {
        this.setData({ userInfo: getApp().globalData.userInfo });
        this.drawQRCode();
      }
    }
  },

  drawQRCode: function() {
    var params = JSON.stringify(Date.now() + Date.now() + Date.now()); // TODO 二维码内容
    QR.qrApi.draw(params, "qrcode", 300, 300);
  }
});
