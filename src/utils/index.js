import { isObject } from './is';
const typer = Object.prototype.toString;
/**
 * @param {value} 待检查的值
 * @description
 * 获取值的类型
 * @export
 */
export function getType(value) {
  var typeStr = typer.call(value);
  typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1');
  return typeStr.toLowerCase();
}
/**
 * 数组去重
 * @param {目标数组:Array} arr
 */
export function uniq(arr) {
  const result = [];
  if (getType(arr) === 'array') {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      if (!obj[elem]) {
        result.push(elem);
        obj[elem] = 1;
      }
    }
  }
  return result;
}

export function deepMerge(src = {}, target = {}) {
  for (let key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : target[key];
  }
  return src;
}
