import { HSBToRGB, RGBToHSB } from './rgb-hsb';

describe('HSB RGB', () => {
  describe('HSBToRGB', () => {
    it('true', () => {
      expect(HSBToRGB({ h: 360, s: 1, b: 1 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(HSBToRGB({ h: 0, s: 1, b: 1 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(HSBToRGB({ h: 135, s: 0.65, b: 0.65 })).toEqual({ r: 58, g: 166, b: 85 });
      expect(HSBToRGB({ h: 205, s: 0.64, b: 0.57 })).toEqual({ r: 52, g: 107, b: 145 });
      expect(HSBToRGB({ h: 61, s: 0.64, b: 0.57 })).toEqual({ r: 144, g: 145, b: 52 });
      expect(HSBToRGB({ h: 240, s: 0.64, b: 0.57 })).toEqual({ r: 52, g: 52, b: 145 });
      expect(HSBToRGB({ h: 300, s: 0.64, b: 0.57 })).toEqual({ r: 145, g: 52, b: 145 });
    });
  });
  describe('RGBToHSB', () => {
    it('true', () => {
      expect(RGBToHSB({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 1, b: 1 });
      expect(RGBToHSB({ r: 58, g: 166, b: 85 })).toEqual({ h: 135, s: 0.6506024096385543, b: 0.6509803921568628 });
      expect(RGBToHSB({ r: 10, g: 38, b: 238 })).toEqual({
        h: 232.63157894736844,
        s: 0.957983193277311,
        b: 0.9333333333333333
      });
      expect(RGBToHSB({ r: 240, g: 38, b: 238 })).toEqual({
        h: 300.5940594059406,
        s: 0.8416666666666667,
        b: 0.9411764705882353
      });
    });
  });
});
