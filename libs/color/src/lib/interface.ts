export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSB {
  h: number;
  s: number;
  b: number;
}

export interface ColorRGBA extends ColorRGB {
  a: number;
}

export type ColorType = 'hex' | 'rgb' | 'rgba' | 'hsb';

export interface ColorOptions {
  rgb: ColorRGB;
  hsb: ColorHSB;
  opacity: number;
}
