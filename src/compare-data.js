const compareData = (dataA, dataB) => {
  const result = [];
  const keys = [...Object.keys(dataA), ...Object.keys(dataB)].sort((a, b) => {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;

    return 0;
  });

  new Set(keys).forEach((key) => {
    const AHasKey = Object.prototype.hasOwnProperty.call(dataA, key);
    const BHasKey = Object.prototype.hasOwnProperty.call(dataB, key);
    if (AHasKey && BHasKey) {
      if (dataA[key] === dataB[key]) {
        result.push({
          key,
          location: 'both',
          value: dataA[key],
        });
      } else {
        result.push({
          key,
          location: 'a',
          value: dataA[key],
        });

        result.push({
          key,
          location: 'b',
          value: dataB[key],
        });
      }
    } else {
      if (AHasKey) {
        result.push({
          key,
          location: 'a',
          value: dataA[key],
        });
      }

      if (BHasKey) {
        result.push({
          key,
          location: 'b',
          value: dataB[key],
        });
      }
    }
  });

  return result;
};

export default compareData;
