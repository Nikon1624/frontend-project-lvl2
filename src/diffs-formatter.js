const SYMBOLS = {
  both: ' ',
  a: '-',
  b: '+',
};

const format = (data) => {
  const str = data.reduce((acc, item) => {
    let res = acc;
    res += `  ${SYMBOLS[item.location]} ${item.key} : ${item.value}\n`;
    return res;
  }, '');

  return `{\n${str}}`;
};

export default format;
