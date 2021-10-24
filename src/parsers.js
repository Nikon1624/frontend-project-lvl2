import yaml from 'js-yaml';

const DATA_TYPES = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parseData = (data, extension) => {
  if (!DATA_TYPES[extension]) {
    throw new Error(`Unknown file extension: ${extension}`);
  }

  return DATA_TYPES[extension](data);
};

export default parseData;
