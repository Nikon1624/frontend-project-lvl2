import _ from 'lodash';
import KEY_TYPES from '../../consts.js';

const getPropertyPath = (path, propertyKey) => [...path, propertyKey].join('.');

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

const plain = (diffs) => {
  const createResult = (diff, path) => {
    switch (diff.type) {
      case KEY_TYPES.ROOT: {
        return diff.value.map((child) => createResult(child, getPropertyPath(path, diff.key)));
      }
      case KEY_TYPES.DELETED: {
        return `Property '${getPropertyPath(path, diff.key)}' was removed`;
      }
      case KEY_TYPES.ADDED: {
        const value = stringify(diff.value);
        return `Property '${getPropertyPath(path, diff.key)}' was added with value: ${value}`;
      }
      case KEY_TYPES.CHANGED: {
        const value = stringify(diff.value);
        const newValue = stringify(diff.newValue);
        return `Property '${getPropertyPath(path, diff.key)}' was updated. From ${value} to ${newValue}`;
      }
      case KEY_TYPES.UNCHANGED: {
        return [];
      }
      case KEY_TYPES.NESTED: {
        return diff.value.map((child) => createResult(child, [getPropertyPath(path, diff.key)]));
      }
      default: {
        throw new Error(`Unknown key type ${diff.type}`);
      }
    }
  };

  return createResult(diffs, []).flat(Infinity).join('\n');
};

export default plain;
