import axios from 'axios';
let pendingMap = new Map();
export const getPendingUrl = (config) => [config.method, config.url].join('&');

export class AxiosCanceler {
  addPending(config) {
    this.removePending(config);
    const CancelToken = axios.CancelToken;
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel);
        }
      });
  }
  // 删除等待状态
  removePending(config) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && typeof cancel === 'function' && cancel();
    });
    pendingMap.clear();
  }
  reset() {
    pendingMap = new Map();
  }
}
