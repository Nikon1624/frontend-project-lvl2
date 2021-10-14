import genDiff from '../src/gendiff.js';

const fileA = './__tests__/__fixtures__/file1.';
const fileB = './__tests__/__fixtures__/file2.';
const extensions = ['json', 'yml'];

const result = `{
  - follow : false
    host : hexlet.io
  - proxy : 123.234.53.22
  - timeout : 50
  + timeout : 20
  + verbose : true
}`;

test.each(extensions)('gendiff extension %s', (extension) => {
  expect(genDiff(`${fileA}${extension}`, `${fileB}${extension}`)).toBe(result);
});
