import { isSet } from './is';

export default class SetHelper extends Set {
  constructor(val) {
    super(val);
  }
  // 获取两个集合的并集
  union(set) {
    return !isSet(set) ? [] : [...this, ...set];
  }
  // 获取两个集合的交集
  intersection(set) {
    return !isSet(set) ? [] : [...set].filter((s) => this.has(s));
  }
  // 获取两个集合的差集
  difference(set) {
    return !isSet(set) ? [] : [...set].filter((s) => !this.has(s));
  }
  // 子集
  subset(set) {
    return !isSet(set) ? false : this.size <= set.size && [...this].every((s) => set.has(s));
  }
  // 超集
  superset(set) {
    return !isSet(set) ? false : this.size >= set.size && [...set].every((s) => this.has(s));
  }
  // 对称差集
  intersectionDifference(set) {
    return !isSet(set) ? [] : [...this.difference(set), ...new SetHelper(set).difference(this)];
  }
}
