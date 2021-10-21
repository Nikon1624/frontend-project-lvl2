import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const getFormatter = (type) => {
  if (!Object.prototype.hasOwnProperty.call(formatters, type)) {
    throw new Error('Unknown formatter type');
  }

  return formatters[type];
};

export default getFormatter;
