/**
 * 数值步进处理
 * @param value 值
 * @param step 最小步进值
 */
export const numberStep = (value: number, step: number) => Math.ceil(value / step) * step;

/**
 * 根据屏幕，分辨率，请求步进值
 * @param value 值
 * @param step 最小步进值
 * @param devicePixelRatio 设备像素比例
 */
export const numberStepScreenSize = (value: number, step: number = 80, devicePixelRatio: number = 1) =>
  numberStep(value * devicePixelRatio, step);
