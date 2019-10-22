import { canBeNumber, numberStep, numberStepScreenSize, numberStrip, tryToNumber } from './number';

describe('number', () => {
  it('numberStrip', () => {
    expect(numberStrip(0.09999999999999998)).toEqual(0.1);
    expect(numberStrip(1.0000000000000001)).toEqual(1);
    expect(0.1 + 0.2).not.toEqual(0.3);
    expect(numberStrip(0.1 + 0.2)).toEqual(0.3);
    expect(1.0 - 0.9).not.toEqual(0.1);
    expect(numberStrip(1.0 - 0.9)).toEqual(0.1);
  });
  it('numberStep', () => {
    expect(numberStep(5, 3)).toEqual(6);
    expect(numberStep(6, 3)).toEqual(6);
    expect(numberStep(7, 3)).toEqual(9);
    expect(numberStep(7, 2.5)).toEqual(7.5);
  });
  it('numberStepScreenSize', () => {
    expect(numberStepScreenSize(200, 80, 1)).toEqual(240);
    expect(numberStepScreenSize(200, 80, 2)).toEqual(400);
    expect(numberStepScreenSize(200)).toEqual(240);
  });

  it('canBeNumber', () => {
    expect(canBeNumber(1)).toBeTruthy();
    expect(canBeNumber(1.1)).toBeTruthy();
    expect(canBeNumber('1')).toBeTruthy();
    expect(canBeNumber('1.1')).toBeTruthy();
    expect(canBeNumber(Number.MAX_SAFE_INTEGER)).toBeTruthy();
    expect(canBeNumber(Number.MAX_VALUE)).toBeTruthy();
    expect(canBeNumber(Infinity)).toBeTruthy();
    expect(canBeNumber({})).toBeFalsy();
    expect(canBeNumber([])).toBeFalsy();
    expect(canBeNumber('a')).toBeFalsy();
    expect(canBeNumber(false)).toBeFalsy();
    expect(canBeNumber(true)).toBeFalsy();
    expect(canBeNumber(undefined)).toBeFalsy();
    expect(canBeNumber(null)).toBeFalsy();
    expect(canBeNumber('')).toBeFalsy();
    expect(canBeNumber(' ')).toBeFalsy();
    expect(canBeNumber(new Date())).toBeFalsy();
  });

  it('tryToNumber', () => {
    expect(tryToNumber(1)).toEqual(1);
    expect(tryToNumber(1.1)).toEqual(1.1);
    expect(tryToNumber('1')).toEqual(1);
    expect(tryToNumber('1.1')).toEqual(1.1);
    expect(tryToNumber(Number())).toEqual(0);
    expect(tryToNumber(Infinity)).toEqual(Infinity);
    expect(tryToNumber(Infinity + Infinity)).toEqual(Infinity);
    expect(tryToNumber({})).toEqual({});
    expect(tryToNumber([])).toEqual([]);
    expect(tryToNumber('a')).toEqual('a');
    expect(tryToNumber(false)).toEqual(false);
    expect(tryToNumber(true)).toEqual(true);
    expect(tryToNumber('')).toEqual('');
    expect(tryToNumber(' ')).toEqual(' ');
  });
});
