import { sendCode, bindAccount } from "../../apis/user";
import { login } from "../../utils/permission";
import { isPhone, isVrcode } from "../../utils/validator";

var toptip; // 保存toptip组件的引用
var toast; // 保存toast组件的引用
var sendBtn; // 保存send-code组件的引用

var comeFrom; // 从哪个页面来：me、donate

Page({
  data: {
    name: "",
    phone: "",
    vrcode: ""
  },

  onLoad: function(options) {
    comeFrom = options.from;
  },

  onReady: function() {
    toptip = this.selectComponent("#toptip");
    toast = this.selectComponent("#toast");
    sendBtn = this.selectComponent("#send-btn");
  },

  onInput: function(e) {
    var params = {};
    params[e.currentTarget.dataset.label] = e.detail.value;
    this.setData(params);
  },

  onSend: function() {
    if (!isPhone(this.data.phone)) {
      return toptip.show("手机号格式不正确");
    }
    sendBtn.prepare();
    sendCode(this.data.phone)
      .then(() => {
        toast.show("验证码将以短信的形式发送至您的手机");
        sendBtn.start();
      })
      .catch(() => sendBtn.stop());
  },

  onSubmit: function() {
    let { name, phone, vrcode } = this.data;
    if (!name) {
      toptip.show("请输入您的姓名");
      return;
    }
    if (!isPhone(phone)) {
      toptip.show("手机号格式不正确");
      return;
    }
    if (!isVrcode(vrcode)) {
      toptip.show("请输入6位数字验证码");
      return;
    }
    wx.showLoading();
    // TODO 获取code
    bindAccount({ phone, vrcode, name })
      .then(({ data }) => {
        wx.showToast({
          title: "绑定成功",
          icon: "success"
        });
        login(data.token_info.token, data.member);

        // 跳转页面
        if (comeFrom === "me") {
          wx.navigateBack();
        } else if (comeFrom === "donate") {
          wx.redirectTo({
            url: "/pages/donate/donate?type=realname"
          });
        }
      })
      .catch(() => {
        wx.hideLoading();
      });
  }
});
