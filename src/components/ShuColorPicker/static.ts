// 下拉框
export const options = [
  {
    label: 'RGB',
    value: 'RGB'
  },
  {
    label: 'HEX',
    value: 'HEX'
  }
];
// 主题颜色
export const tColor = [
  '#000000',
  '#ffffff',
  '#eeece1',
  '#1e497b',
  '#4e81bb',
  '#e2534d',
  '#9aba60',
  '#8165a0',
  '#47acc5',
  '#f9974c'
];
// 颜色面板
export const colorConfig: Array<Array<string>> = [
  ['#0d0d0d', '#808080'],
  ['#7f7f7f', '#f2f2f2'],
  ['#1c1a10', '#ddd8c3'],
  ['#0e243d', '#c6d9f0'],
  ['#233f5e', '#dae5f0'],
  ['#632623', '#f2dbdb'],
  ['#4d602c', '#eaf1de'],
  ['#3f3150', '#e6e0ec'],
  ['#1e5867', '#d9eef3'],
  ['#99490f', '#fee9da']
];
// 标准颜色
export const bColor = [
  '#c21401',
  '#ff1e02',
  '#ffc12a',
  '#ffff3a',
  '#90cf5b',
  '#00af57',
  '#00afee',
  '#0071be',
  '#00215f',
  '#72349d'
];

/**
 * 颜色计算
 */
// 格式化 hex 颜色值
export const parseColor = (hexStr: string) => {
  if (hexStr.length === 4) {
    return (hexStr =
      '#' +
      hexStr[1] +
      hexStr[1] +
      hexStr[2] +
      hexStr[2] +
      hexStr[3] +
      hexStr[3]);
  } else {
    return hexStr;
  }
};

// RGB 颜色 转 HEX 颜色
export const rgbToHex = (r: number, g: number, b: number) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};

// HEX 转 RGB 颜色
const hexToRgb = (hex: string) => {
  hex = parseColor(hex);
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)));
  }
  return rgb;
};
// 计算渐变过渡颜色
export const gradient = (
  startColor: string,
  endColor: string,
  step: number
) => {
  // 讲 hex 转换为 rgb
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);
  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;
  const gradientColorArr = [];
  // 计算每一步的hex值
  for (let i = 0; i < step; i++) {
    gradientColorArr.push(
      rgbToHex(
        rStep * i + sColor[0],
        gStep * i + sColor[1],
        bStep * i + sColor[2]
      )
    );
  }
  return gradientColorArr;
};
