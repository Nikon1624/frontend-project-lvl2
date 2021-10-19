import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import compareData from './compare-data.js';
import formatters from './formatters/index.js';

const getFileData = (file) => {
  const pathToFile = path.resolve(process.cwd(), file);
  const extension = path.extname(file).slice(1);
  const fileContent = fs.readFileSync(pathToFile, 'utf8');

  return parseData(fileContent, extension);
};

const genDiff = (fileA, fileB, format) => {
  const fileAData = getFileData(fileA);
  const fileBData = getFileData(fileB);

  const diffs = compareData(fileAData, fileBData);

  return formatters[format](diffs);
};

export default genDiff;
