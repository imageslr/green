import { autoLogin, isLogin } from "./utils/permission";
import { getUserInfo } from "./apis/user";

App({
  onLaunch: function() {
    autoLogin();
  },
  globalData: {
    userInfo: null
  },
  setUserInfo: function(userInfo) {
    this.globalData.userInfo = userInfo;
  }
});
