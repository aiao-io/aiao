const fraction = ['角', '分', '厘'];
const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const unit = [
  ['元', '万', '亿', '兆', '京', '垓'],
  ['', '拾', '佰', '仟']
];

const max = Math.pow(10, 22);
export const rmbUppercase = (value: number) => {
  const head = value < 0 ? '欠' : '';
  let num = Math.abs(value);

  if (num > max) {
    throw new Error(`max value is ${max}`);
  }

  let str = '';
  if (value > Math.floor(value)) {
    const n = Number('0.' + `${num}`.split('.')[1]);
    str = fraction.reduce(
      (p, c, i) => p + (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + c).replace(/零./, ''),
      ''
    );
  }
  str = str || '整';
  num = Math.floor(num);

  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    str = p.replace(/(零.)*零$/g, '').replace(/^$/, '零') + unit[0][i] + str;
  }
  return `${head}${str
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')}`;
};
