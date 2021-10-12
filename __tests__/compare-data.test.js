import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import compareData from '../src/compare-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFile = (fileName) => fs.readFileSync(path.resolve(__dirname, `./__fixtures__/${fileName}`), 'utf8');

const jsonResults = [
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

const extensions = ['json'];

test.each(extensions)('compare data extension %s', (extension) => {
  const fileA = getFile(`file1.${extension}`);
  const fileB = getFile(`file2.${extension}`);

  expect(compareData(JSON.parse(fileA), JSON.parse(fileB))).toEqual(jsonResults[0]);
  expect(compareData(JSON.parse(fileA), JSON.parse(fileA))).toEqual(jsonResults[1]);
  expect(compareData({}, {})).toEqual(jsonResults[2]);
});
