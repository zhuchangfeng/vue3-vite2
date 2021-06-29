export const interceptorsResponse = (res) => {
  return res;
};

export const interceptorsCatch = (error) => {
  const { response, code, message } = error || {};
  const msg = response?.data?.msg ?? '';
  console.log(response, msg);
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
