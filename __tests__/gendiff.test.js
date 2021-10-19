import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__tests__/__fixtures__/${fileName}`);
const getFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');
const results = getFile('result.txt');

const extensions = ['json', 'yml'];

test.each(extensions)('gendiff extension %s', (extension) => {
  const diffResult = genDiff(getFixturePath(`file1.${extension}`), getFixturePath(`file2.${extension}`), 'stylish');
  expect(diffResult).toBe(results);
});
