import fs from 'fs';
import yaml from 'js-yaml';
import { getFixturePath } from '../src/utils.js';
import compareData from '../src/compare-data.js';

const getFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');

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
