import { HEXToRGB } from './rgb-hex';

describe('RGB HEX', () => {
  describe('HEXToRGB', () => {
    it('#000', () => {
      expect(HEXToRGB('#000')).toEqual({ r: 0, g: 0, b: 0 });
    });
    it('#333', () => {
      expect(HEXToRGB('#333')).toEqual({ r: 51, g: 51, b: 51 });
    });
    it('#333333', () => {
      expect(HEXToRGB('#333333')).toEqual({ r: 51, g: 51, b: 51 });
    });
  });
});
