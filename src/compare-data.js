import _ from 'lodash';
import { uniqArray, sortObjectKeys } from './utils.js';

const KEY_LOCATIONS = {
  a: 'a',
  b: 'b',
  both: 'both',
};

const createKeyResult = (key, value, location, withChildren) => ({
  key,
  value,
  location,
  withChildren,
});

const compareData = (dataA, dataB) => {
  const result = [];
  const keys = sortObjectKeys(dataA, dataB);
  const uniqKeys = uniqArray(keys);

  uniqKeys.forEach((key) => {
    const dataAHasKey = Object.prototype.hasOwnProperty.call(dataA, key);
    const dataBHasKey = Object.prototype.hasOwnProperty.call(dataB, key);

    if (!dataAHasKey || !dataBHasKey) {
      if (dataAHasKey) {
        result.push(createKeyResult(key, dataA[key], KEY_LOCATIONS.a, false));
      }

      if (dataBHasKey) {
        result.push(createKeyResult(key, dataB[key], KEY_LOCATIONS.b, false));
      }
    } else if (_.isPlainObject(dataA[key]) && _.isPlainObject(dataB[key])) {
      const childrenResult = compareData(dataA[key], dataB[key]);
      result.push(createKeyResult(key, childrenResult, KEY_LOCATIONS.both, true));
    } else if (dataA[key] === dataB[key]) {
      result.push(createKeyResult(key, dataA[key], KEY_LOCATIONS.both, false));
    } else {
      result.push(createKeyResult(key, dataA[key], KEY_LOCATIONS.a, false));
      result.push(createKeyResult(key, dataB[key], KEY_LOCATIONS.b, false));
    }
  });

  return result;
};

export default compareData;
