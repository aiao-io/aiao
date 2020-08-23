import { colorMix } from './color-mix';
import { RGBToHEX } from './rgb-hex';

describe('ColorMix', () => {
  it('tint', () => {
    const a = colorMix('#3880ff', '#FFF', 0.1);
    const b = RGBToHEX(a);
    expect(a).toEqual({ r: 76, g: 141, b: 255, a: 1 });
    expect(b).toEqual('#4c8dff');
  });

  it('shade', () => {
    const a = colorMix('#3880ff', '#000', 0.12);
    const b = RGBToHEX(a);
    expect(b).toEqual('#3171e0');
  });
});
