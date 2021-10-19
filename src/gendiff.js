import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import compareData from './compare-data.js';
import format from './formatter.js';

const getFileData = (file) => {
  const pathToFile = path.resolve(process.cwd(), file);
  const extension = path.extname(file).slice(1);
  const fileContent = fs.readFileSync(pathToFile, 'utf8');

  return parseData(fileContent, extension);
};

const genDiff = (fileA, fileB) => {
  const fileAData = getFileData(fileA);
  const fileBData = getFileData(fileB);

  const diffs = compareData(fileAData, fileBData);

  return format(diffs);
};

export default genDiff;
