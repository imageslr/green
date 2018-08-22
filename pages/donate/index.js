import { isLogin } from "../../utils/permission";

Page({
  onNavigate: function() {
    if (isLogin()) {
      wx.navigateTo({
        url: "./donate?type=realname"
      });
    } else {
      wx.navigateTo({
        url: "../login/index?from=donate"
      });
    }
  }
});
