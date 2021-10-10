const DATA_TYPES = {
  json: JSON.parse,
};

const parseData = (data, extension) => {
  if (!Object.prototype.hasOwnProperty.call(DATA_TYPES, extension)) {
    throw new Error('Unknown file extension');
  }

  return DATA_TYPES[extension](data);
};

export default parseData;
