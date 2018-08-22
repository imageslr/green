import { autoLogin, isLogin } from "./utils/permission";
import { getUserInfo } from "./apis/user";

App({
  onLaunch: function() {
    autoLogin();
  },
  globalData: {
    userInfo: null
  },
  // getUserInfo: function() {
  //   if (!isLogin) {
  //     return Promise.reject(new Error("未登录"));
  //   }
  //   // 已经有用户信息时直接返回
  //   if (this.globalData.userInfo.id) {
  //     return Promise.resolve(this.globalData.userInfo);
  //   }
  //   return getUserInfo().then(({ data }) => {
  //     this.setUserInfo(data);
  //     return res.data;
  //   });
  // },

  setUserInfo: function(userInfo) {
    this.globalData.userInfo = userInfo;
  }
});
