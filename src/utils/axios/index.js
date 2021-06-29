import { Axios } from './Axios';
import { deepMerge } from '../index';
export const createAxios = (option = {}) => {
  return new Axios(
    deepMerge(
      {
        // 时间超时
        timeout: 10 * 1000,
        // `baseURL` 将自动加在 `url` 前面
        baseURL: '/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          // 忽略重复请求拦截
          ignoreCancelToken: false,
        },
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: true,
        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: 'json', // default
        // urlPrefix: '/api',
      },
      option
    )
  );
};
