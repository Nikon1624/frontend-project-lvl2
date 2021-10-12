import fs from 'fs';
import path from 'path';
import compareData from './compare-data.js';

const DATA_TYPES = {
  json: JSON.parse,
};

const parseData = (data, extension) => {
  if (!Object.prototype.hasOwnProperty.call(DATA_TYPES, extension)) {
    throw new Error('Unknown file extension');
  }

  return DATA_TYPES[extension](data);
};

const SYMBOLS = {
  both: ' ',
  a: '-',
  b: '+',
};

const format = (data) => {
  const str = data.reduce((acc, item) => {
    let res = acc;
    res += `  ${SYMBOLS[item.location]} ${item.key} : ${item.value}\n`;
    return res;
  }, '');

  return `{\n${str}}`;
};

const getFileData = (file) => {
  const pathToFile = path.resolve(process.cwd(), file);
  const extension = path.extname(file).slice(1);
  const fileContent = fs.readFileSync(pathToFile, 'utf8');

  return parseData(fileContent, extension);
};

const genDiff = (fileA, fileB) => {
  const fileAData = getFileData(fileA);
  const fileBData = getFileData(fileB);

  return format(compareData(fileAData, fileBData));
};

export default genDiff;