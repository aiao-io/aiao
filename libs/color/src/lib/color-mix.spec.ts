import { colorMix } from './color-mix';
import { RGBToHEX } from './rgb-hex';

describe('ColorMix', () => {
  it('#3880ff tint', () => {
    const a = colorMix('#3880ff', '#FFF', 0.1);
    const b = RGBToHEX(a);
    expect(b).toEqual('#4c8dff');
  });

  it('#3880ff shade', () => {
    const a = colorMix('#3880ff', '#000', 0.12);
    const b = RGBToHEX(a);
    expect(b).toEqual('#3171e0');
  });
  it('#3dc2ff tint', () => {
    const a = colorMix('#3dc2ff', '#FFF', 0.1);
    const b = RGBToHEX(a);
    expect(b).toEqual('#50c8ff');
  });

  it('#3dc2ff shade', () => {
    const a = colorMix('#3dc2ff', '#000', 0.12);
    const b = RGBToHEX(a);
    expect(b).toEqual('#36abe0');
  });

  it('no weight', () => {
    const a = colorMix('#3dc2ff', '#000');
    const b = RGBToHEX(a);
    expect(b).toEqual('#1f6180');
  });
});
