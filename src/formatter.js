import _ from 'lodash';

const SYMBOLS = {
  both: ' ',
  a: '-',
  b: '+',
};

const symbolDeviation = '  ';
const initialIndent = '  ';

const formatObjectValue = (obj, indent) => {
  const closingIndent = indent.length === initialIndent.length
    ? '  '
    : indent.slice(0, indent.length / 2);
  const keys = Object.keys(obj);
  const result = keys.reduce((acc, key) => {
    let value = obj[key];
    if (_.isPlainObject(value)) {
      value = formatObjectValue(value, indent + initialIndent + symbolDeviation);
    }

    return `${acc}${indent}${symbolDeviation}${key} : ${value}\n`;
  }, '');
  return `{\n${result}${closingIndent}}`;
};

const format = (indent = initialIndent) => (data) => {
  const closingIndent = indent.length === initialIndent.length
    ? ''
    : indent.slice(0, indent.length / 2) + symbolDeviation;
  const result = data.reduce((acc, item) => {
    const {
      key,
      location,
      withChildren,
    } = item;
    const symbol = SYMBOLS[location];
    let { value } = item;

    if (withChildren) {
      value = format(indent + initialIndent + symbolDeviation)(value);
    }

    if (_.isPlainObject(value)) {
      value = formatObjectValue(value, indent + initialIndent + symbolDeviation);
    }

    return `${acc}${indent}${symbol} ${key} : ${value}\n`;
  }, '');

  return `{\n${result}${closingIndent}}`;
};

export default format();
