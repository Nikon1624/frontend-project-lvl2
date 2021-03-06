import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import compareData from './compare-data.js';
import getFormatter from './formatters/index.js';

const getFileData = (file) => {
  const pathToFile = path.resolve(process.cwd(), file);
  const extension = path.extname(file).slice(1);
  const fileContent = fs.readFileSync(pathToFile, 'utf8');

  return parseData(fileContent, extension);
};

const genDiff = (pathToFileA, pathToFileB, format = 'stylish') => {
  const fileAData = getFileData(pathToFileA);
  const fileBData = getFileData(pathToFileB);

  const diffs = compareData(fileAData, fileBData);

  return getFormatter(format)(diffs);
};

export default genDiff;
