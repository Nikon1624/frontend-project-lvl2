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

export { uniqArray, sortObjectKeys };
