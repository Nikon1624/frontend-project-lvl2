import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.resolve(__dirname, `./__tests__/__fixtures__/${fileName}`);

const uniqArray = (arr) => {
  const uniq = new Set(arr);
  return Array.from(uniq);
};

const sortObjectKeys = (objA, objB) => (
  [...Object.keys(objA), ...Object.keys(objB)].sort((a, b) => {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;

    return 0;
  })
);

export { getFixturePath, uniqArray, sortObjectKeys };
