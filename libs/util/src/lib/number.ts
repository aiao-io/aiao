export const isNumber = (value: any): value is number => value && typeof value.valueOf() === 'number';

export const numberStep = (value: number, step: number) => Math.ceil(value / step) * step;

export const numberStrip = (value: number, precision = 12): number => parseFloat(value.toPrecision(precision));

export const numberStepScreenSize = (value: number, step: number = 80, devicePixelRatio: number = 1) =>
  numberStep(value * devicePixelRatio, step);

export const canBeNumber = (value: any): boolean => !isNaN(parseFloat(value as any));

export const tryToNumber = (value: any): number => (canBeNumber(value) ? Number(value) : value);
