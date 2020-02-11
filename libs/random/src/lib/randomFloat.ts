// 随机浮点数
export const randomFloat = (min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) =>
  Math.random() * (max - min) + min;
