/**
 * 登录、退出、检测是否登录
 */

/**
 * storage key
 */
const TOKEN_KEY = "TOKEN";

/**
 * 用户token
 */
var TOKEN = null;

function getToken() {
  return TOKEN;
}

function setToken(token) {
  TOKEN = token;
}

function autoLogin() {
  TOKEN = wx.getStorageSync(TOKEN_KEY);
}

function login(token, userInfo) {
  try {
    wx.setStorageSync(TOKEN_KEY, token);
    setToken(token);
    getApp().setUserInfo(userInfo);
    return true;
  } catch (e) {
    console.error("设置storage失败: " + e);
    return false;
  }
}

function logout() {
  try {
    wx.clearStorageSync();
    setToken(null);
    getApp().setUserInfo(null);
    return true;
  } catch (e) {
    console.error("清空storage失败: " + e);
    return false;
  }
}

function isLogin() {
  return !!TOKEN;
}

module.exports = {
  getToken: getToken,
  autoLogin: autoLogin,
  login: login,
  logout: logout,
  isLogin: isLogin
};
