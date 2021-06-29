import axios from 'axios';
// import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { interceptorsCatch, interceptorsResponse } from '../axios/transform';
// 是否为IE9
export class Axios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }
  // 设置头部
  setHeader(headers) {
    if (!this.axiosInstance) return;
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  // 获取拦截器参数
  getTransform() {
    const { transform } = this.options;
    return transform;
  }
  // 文件上传
  uploadFile(config, params) {
    const formData = new window.FormData();
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data[key]);
      });
    } else {
      formData.append(params.name || 'file', params.file, params.filename);
      delete params.file;
      delete params.filename;
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
    }
    return this.axiosInstance({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
        ignoreCancelToken: true,
      },
    });
  }
  // 拦截器设置
  setupInterceptors() {
    const axiosCanceler = new AxiosCanceler();
    this.axiosInstance.interceptors.request.use((config) => {
      const {
        headers: { ignoreCancelToken },
      } = config;
      // 检查ignoreCancel是否存在？存在赋值，不存在去配置找
      const ignoreCancel =
        typeof ignoreCancelToken === 'undefined'
          ? this.options?.request?.ignoreCancelToken
          : ignoreCancelToken;
      !ignoreCancel && axiosCanceler.addPending(config);
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (res) => {
        res && axiosCanceler.removeAllPending(res.config);
        return interceptorsResponse(res);
      },
      (error) => {
        console.log(error);
        return interceptorsCatch(error);
      }
    );
  }
}
