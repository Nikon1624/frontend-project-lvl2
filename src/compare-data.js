import _ from 'lodash';
import KEY_TYPES from '../consts.js';

const createKeyResult = (key, type, value, newValue = null) => ({
  key,
  type,
  value,
  newValue,
});

const compareData = (dataA, dataB) => {
  const keys = _.union(_.keys(dataA), _.keys(dataB));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const dataAHasKey = Object.prototype.hasOwnProperty.call(dataA, key);
    const dataBHasKey = Object.prototype.hasOwnProperty.call(dataB, key);

    if (!dataAHasKey) {
      return createKeyResult(key, KEY_TYPES.ADDED, dataB[key]);
    }

    if (!dataBHasKey) {
      return createKeyResult(key, KEY_TYPES.DELETED, dataA[key]);
    }

    if (_.isPlainObject(dataA[key]) && _.isPlainObject(dataB[key])) {
      const childrenResult = compareData(dataA[key], dataB[key]);
      return createKeyResult(key, KEY_TYPES.NESTED, childrenResult);
    }

    if (dataA[key] === dataB[key]) {
      return createKeyResult(key, KEY_TYPES.UNCHANGED, dataA[key]);
    }

    return createKeyResult(key, KEY_TYPES.CHANGED, dataA[key], dataB[key]);
  });
};

export default (dataA, dataB) => (createKeyResult(null, KEY_TYPES.ROOT, compareData(dataA, dataB)));
