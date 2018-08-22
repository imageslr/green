/**
 * get, post 方法的封装
 */

import { getToken } from "../utils/permission";
var Promise = require("../utils/es6-promise");

/**
 * 服务器根路径
 */
export const BASE_URL =
  "https://www.easy-mock.com/mock/5b7d26d8a553b04aa3c9307c/green";

/**
 * get 方法
 * @param relativeUrl 相对路径 必填
 * @param param 参数 可选
 * @param header 请求头参数 可选
 * @returns {Promise}
 */
export function get(relativeUrl, param, header) {
  return requestWithModal("GET", relativeUrl, param, header);
}

/**
 * post 方法
 */
export function post(relativeUrl, param, header) {
  return requestWithModal("POST", relativeUrl, param, header);
}

/**
 * 请求失败时，显示服务器的错误信息(data.message)或微信的错误信息(errMsg)
 */
export function requestWithModal(method, relativeUrl, param, header) {
  return request(method, relativeUrl, param, header).catch(res => {
    let errMsg;
    if (res.data && res.data.message) {
      errMsg = res.data.message;
    } else {
      errMsg = res.statusCode ? "发生未知错误，请联系开发者" : res.errMsg;
    }
    wx.showModal({
      content: errMsg,
      showCancel: false
    });
    return Promise.reject(res);
  });
}

/**
 * request 基类方法
 * 状态码 ≥ 400 时，返回 rejected 状态的 promise
 * @param method 请求方式 必填
 * @param relativeUrl 相对路径 必填
 * @param param 参数 可选
 * @param header 请求头参数 可选
 * @returns {Promise} 返回响应完整内容
 */
export function request(method, relativeUrl, param, header) {
  // 删除所有为 null 的参数
  for (var key in param) {
    if (param[key] === null) {
      delete param[key];
    }
  }

  let response, error;
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + relativeUrl,
      method: method,
      header: Object.assign(
        {
          "Content-Type": "application/json",
          TOKEN: getToken()
        },
        header
      ),
      data: param || {},
      success(res) {
        response = res.data;
        if (res.statusCode < 400) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(err) {
        error = err;
        reject(err);
      },
      complete() {
        console.info("==============>请求开始<==============");
        console.warn(method, BASE_URL + relativeUrl);
        if (param) console.warn("参数：", param);
        if (response) {
          console.warn("请求成功：", response);
        } else {
          console.warn("请求失败：", error);
        }
        console.info("==============>请求结束<==============");
      }
    });
  });
}