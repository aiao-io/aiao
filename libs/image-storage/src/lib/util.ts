export const numberStep = (value: number, step: number) => Math.ceil(value / step) * step;

export const numberStepScreenSize = (value: number, step: number = 80, devicePixelRatio: number = 1) =>
  numberStep(value * devicePixelRatio, step);
