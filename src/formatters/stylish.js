import _ from 'lodash';
import KEY_TYPES from '../../consts.js';

const getIndent = (depthLevel, count = 4) => ' '.repeat(depthLevel * count - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const result = Object.entries(value).map(([key, content]) => {
    const handledContent = `${stringify(content, depth + 1)}`;
    return `${getIndent(depth + 1)}  ${key}: ${handledContent}`;
  });

  return `{\n${result.join('\n')}\n${getIndent(depth)}  }`;
};

const stylish = (diffs) => {
  const createResult = (diff, depth) => {
    switch (diff.type) {
      case KEY_TYPES.ROOT: {
        return `{\n${diff.value.map((child) => createResult(child, depth + 1)).join('\n')}\n}`;
      }
      case KEY_TYPES.DELETED: {
        const value = stringify(diff.value, depth);
        return `${getIndent(depth)}- ${diff.key}: ${value}`;
      }
      case KEY_TYPES.ADDED: {
        const value = stringify(diff.value, depth);
        return `${getIndent(depth)}+ ${diff.key}: ${value}`;
      }
      case KEY_TYPES.CHANGED: {
        const newValue = stringify(diff.newValue, depth);
        const oldValue = stringify(diff.value, depth);
        const stringNew = `${getIndent(depth)}- ${diff.key}: ${oldValue}`;
        const stringOld = `${getIndent(depth)}+ ${diff.key}: ${newValue}`;
        return `${stringNew}\n${stringOld}`;
      }
      case KEY_TYPES.UNCHANGED: {
        const value = stringify(diff.value, depth);
        return `${getIndent(depth)}  ${diff.key}: ${value}`;
      }
      case KEY_TYPES.NESTED: {
        const value = `{\n${diff.value.map((child) => createResult(child, depth + 1)).join('\n')}\n${getIndent(depth)}  }`;
        return `${getIndent(depth)}  ${diff.key}: ${value}`;
      }
      default: {
        throw new Error(`Unknown key type ${diff.type}`);
      }
    }
  };
  return createResult(diffs, 0);
};

export default stylish;
