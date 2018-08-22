import { get, post } from "./request";

module.exports = {
  sendCode: function(phone) {
    return post(`/verification_code/register`, { phone });
  },
  getUserInfo: function() {
    return get("/user");
  },
  bindAccount: function(body) {
    return post(`/members/login/miniapp`, body);
  }
};
