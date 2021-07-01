import { AxiosCanceler } from './axiosCancel';
const axiosCanceler = new AxiosCanceler();
// 请求后返回
export const interceptorsResponse = (res) => {
  res && axiosCanceler.removeAllPending(res.config);
  return res;
};
// 请求后失败
export const interceptorsCatch = (error) => {
  const { response, code, message } = error || {};
  const msg = response?.data?.msg ?? '';
  console.log(msg);
  const err = error?.toString?.() ?? '';
  let errMessage = '';
  try {
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = 'timeout';
    }
    if (err?.includes('Network Error')) {
      errMessage = 'Network Error';
    }
    if (errMessage) {
      return Promise.reject(error);
    }
  } catch (error) {
    throw new Error(error);
  }
  return Promise.reject(error);
};

export const interceptorsRequest = (config) => {
  const {
    headers: { ignoreCancelToken },
    urlPrefix,
  } = config;
  // 检查ignoreCancel是否存在？存在赋值，不存在去配置找
  const ignoreCancel =
    typeof ignoreCancelToken === 'undefined'
      ? this.options?.request?.ignoreCancelToken
      : ignoreCancelToken;
  !ignoreCancel && axiosCanceler.addPending(config);
  config.url = typeof urlPrefix === 'undefined' ? config.url : urlPrefix + config.url;
  return config;
};
