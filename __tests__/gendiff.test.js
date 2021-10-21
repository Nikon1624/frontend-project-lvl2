import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__tests__/__fixtures__/${fileName}`);
const getFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');
const stylishResult = getFile('stylish-result.txt');
const plainResult = getFile('plain-result.txt');

const extensions = ['json', 'yml'];

test.each(extensions)('gendiff extension %s', (extension) => {
  const pathA = getFixturePath(`file1.${extension}`);
  const pathB = getFixturePath(`file2.${extension}`);
  const diffStylishResult = genDiff(pathA, pathB, 'stylish');
  const diffPlainResult = genDiff(pathA, pathB, 'plain');

  expect(diffStylishResult).toBe(stylishResult);
  expect(diffPlainResult).toBe(plainResult);
});
