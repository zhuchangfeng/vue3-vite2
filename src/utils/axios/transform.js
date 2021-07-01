import { isString } from '../is';
export const transformBeforeRequest = (config, options) => {
  const { urlPrefix } = options;
  const params = config.params || {};
  const data = config.data || {};

  if (urlPrefix && isString(urlPrefix)) {
    config.url = `${urlPrefix}${config.url}`;
  }
  if (config.method?.toUpperCase() === 'GET') {
    if (!isString(params)) {
      config.params = Object.assign(params, { timestamp: +new Date() });
    } else {
      config.url = config.url + params + `?timestamp=${+new Date()}`;
    }
  } else {
    if (!isString(params)) {
      config.data = Object.assign(data, params);
    } else {
      config.url = config.url + params;
      config.params = null;
    }
  }

  return config;
};

export const transformRequest = (res) => {
  console.log(res);
};
