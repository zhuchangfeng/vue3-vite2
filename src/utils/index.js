import { isObject } from './is';
const typer = Object.prototype.toString;
/**
 * @description 获取值的类型
 */

export const getType = (value) => {
  let typeStr = typer.call(value);
  typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1');
  return typeStr.toLowerCase();
};
/**
 * @description 数组去重
 */
export const uniq = (arr) => {
  let result = [];
  if (getType(arr) === 'array') {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      if (!obj[elem]) {
        result.push(elem);
        obj[elem] = 1;
      }
    }
  }
  return result;
};
/**
 * @description 对象深程合并
 */
export function deepMerge(src = {}, target = {}) {
  for (let key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : target[key];
  }
  return src;
}
/**
 * @description 转化为number
 */
export const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
