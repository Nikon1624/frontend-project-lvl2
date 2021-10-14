import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import compareData from '../src/compare-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFile = (fileName) => fs.readFileSync(path.resolve(__dirname, `./__fixtures__/${fileName}`), 'utf8');

const results = [
  [
    { key: 'follow', location: 'a', value: false },
    { key: 'host', location: 'both', value: 'hexlet.io' },
    { key: 'proxy', location: 'a', value: '123.234.53.22' },
    { key: 'timeout', location: 'a', value: 50 },
    { key: 'timeout', location: 'b', value: 20 },
    { key: 'verbose', location: 'b', value: true },
  ],
  [
    { key: 'follow', location: 'both', value: false },
    { key: 'host', location: 'both', value: 'hexlet.io' },
    { key: 'proxy', location: 'both', value: '123.234.53.22' },
    { key: 'timeout', location: 'both', value: 50 },
  ],
  [],
];

const extensions = [
  ['json', JSON.parse],
  ['yml', yaml.load],
];

test.each(extensions)('compare data extension %s', (extension, parser) => {
  const fileA = getFile(`file1.${extension}`);
  const fileB = getFile(`file2.${extension}`);

  expect(compareData(parser(fileA), parser(fileB))).toEqual(results[0]);
  expect(compareData(parser(fileA), parser(fileA))).toEqual(results[1]);
  expect(compareData({}, {})).toEqual(results[2]);
});
