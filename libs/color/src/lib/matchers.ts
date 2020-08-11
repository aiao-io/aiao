import { ColorHSB, ColorRGB, ColorRGBA } from './interface';
import { RGBAToRGB } from './rgba-rgb';

const CSS_INTEGER = '[-\\+]?\\d+%?';
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;
const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;

const MATCH_RGB = new RegExp('rgb' + PERMISSIVE_MATCH3);
const MATCH_RGBA = new RegExp('rgba' + PERMISSIVE_MATCH4);
const MATCH_HSB = new RegExp('hsb' + PERMISSIVE_MATCH3);

const MATCH_HEX3 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const MATCH_HEX6 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
const MATCH_HEX4 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const MATCH_HEX8 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

const RGB: ('r' | 'g' | 'b')[] = ['r', 'g', 'b'];

const bfb = (str: string) => {
  if (str.endsWith('%')) {
    return parseFloat(str.slice(0, -1)) / 100;
  } else {
    return parseFloat(str);
  }
};

const matchToRgba = (opt: { radix: number; double?: boolean }, match: RegExpExecArray): ColorRGBA => {
  const { radix, double } = opt;
  const matchs = {
    r: match[1],
    g: match[2],
    b: match[3]
  };

  const rgb: ColorRGB = {} as any;
  RGB.forEach(key => {
    let val = matchs[key];
    if (double) {
      val += val;
    }
    rgb[key] = parseInt(val, radix);
  });

  let alpha: number;
  if (radix === 16) {
    alpha = parseInt(match[4], radix);
    alpha = alpha / 255;
  } else {
    alpha = parseFloat(match[4]);
  }

  return { ...rgb, a: alpha };
};

const matchToHsb = (...match: any[]) => ({ h: parseFloat(match[1]), s: bfb(match[2]), b: bfb(match[3]) });

export const getHSB = (color: string): ColorHSB | null => {
  const match = MATCH_HSB.exec(color);
  if (match) {
    return matchToHsb(...match);
  }
  return null;
};

export const getRGBA = (color: string): ColorRGBA | null => {
  let match: RegExpExecArray | null;
  let radix!: number;
  let double!: boolean;
  if ((match = MATCH_RGBA.exec(color) || MATCH_RGB.exec(color))) {
    radix = 10;
  } else if ((match = MATCH_HEX6.exec(color) || MATCH_HEX8.exec(color))) {
    radix = 16;
  } else if ((match = MATCH_HEX4.exec(color) || MATCH_HEX3.exec(color))) {
    radix = 16;
    double = true;
  }
  if (match) {
    return matchToRgba({ radix, double }, match);
  }
  return null;
};

export const colorStringToOptions = (colorString: string) => {
  const color = colorString.trim().toLowerCase();
  let rgba!: ColorRGBA | null;
  let hsb!: ColorHSB | null;
  let rgb!: ColorRGB | null;
  let opacity = 1;
  if (color.startsWith('hsb')) {
    hsb = getHSB(color);
  } else {
    rgba = getRGBA(color);
  }
  if (rgba) {
    rgb = RGBAToRGB(rgba);
    opacity = isNaN(rgba.a) ? 1 : rgba.a;
  }

  return {
    rgb,
    hsb,
    opacity
  };
};
