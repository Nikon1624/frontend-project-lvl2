import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

const getFormatter = (type) => {
  if (!formatters[type]) {
    throw new Error(`Unknown formatter type ${type}`);
  }

  return formatters[type];
};

export default getFormatter;
