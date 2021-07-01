import axios from 'axios';
import { interceptorsCatch, interceptorsResponse, interceptorsRequest } from './interceptor';
import { transformBeforeRequest, transformRequest } from './transform';
import { cloneLoop } from '../index';
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
  // 获取转换器参数
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
    this.axiosInstance.interceptors.request.use((config) => {
      return interceptorsRequest(config);
    });

    this.axiosInstance.interceptors.response.use(
      (res) => {
        return interceptorsResponse(res);
      },
      (error) => {
        console.log(error);
        return interceptorsCatch(error);
      }
    );
  }
  get(config, options) {
    return this.request({ ...config, method: 'GET' }, options);
  }
  post(config, options) {
    return this.request({ ...config, method: 'POST' }, options);
  }
  request(config, options) {
    let conf = cloneLoop(config);
    let opt = Object.assign({}, options);
    const { request, beforeRequest } = this.getTransform();
    request && (conf = transformBeforeRequest(conf, opt));
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          beforeRequest && transformRequest(res);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
