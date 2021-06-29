import { getType } from './index';

export const isObject = (val) => val !== null && getType(val) === 'object';
