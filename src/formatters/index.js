import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

const getFormatter = (type) => {
  if (!Object.prototype.hasOwnProperty.call(formatters, type)) {
    throw new Error('Unknown formatter type');
  }

  return formatters[type];
};

export default getFormatter;
