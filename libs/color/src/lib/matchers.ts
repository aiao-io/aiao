import isNumber from 'lodash/isNumber';

import { ColorHSB, ColorRGBA } from './interface';

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

const RGBA = ['r', 'g', 'b', 'a'];

const bfb = (str: string) => {
  if (str.endsWith('%')) {
    return parseFloat(str.slice(0, -1)) / 100;
  } else {
    return parseFloat(str);
  }
};

const matchToRgba = (opt: { radix: number; double?: boolean }, ...match: any[]): ColorRGBA => {
  const { radix, double } = opt;
  const back = { r: match[1], g: match[2], b: match[3], a: match[4] };
  RGBA.forEach(key => {
    let val = back[key];
    if (double) {
      val += val;
    }
    if (key === 'a') {
      let alpha: number;
      if (radix === 16) {
        alpha = parseInt(back.a, radix);
        alpha = alpha / 255;
      } else {
        alpha = parseFloat(back.a);
      }

      alpha = isNumber(alpha) && alpha >= 0 ? alpha : 1;
      back.a = alpha;
    } else {
      back[key] = parseInt(val, radix);
    }
  });
  return back;
};

const matchToHsb = (...match: any[]) => ({ h: parseFloat(match[1]), s: bfb(match[2]), b: bfb(match[3]) });

export const getHSB = (color: string): ColorHSB => {
  const match: string[] = MATCH_HSB.exec(color);
  if (match) {
    return matchToHsb(...match);
  }
  return null;
};

export const getRGBA = (color: string): ColorRGBA => {
  let match: string[];
  if ((match = MATCH_RGBA.exec(color)) || (match = MATCH_RGB.exec(color))) {
    return matchToRgba({ radix: 10 }, ...match);
  } else if ((match = MATCH_HEX6.exec(color)) || (match = MATCH_HEX8.exec(color))) {
    return matchToRgba({ radix: 16 }, ...match);
  } else if ((match = MATCH_HEX4.exec(color)) || (match = MATCH_HEX3.exec(color))) {
    return matchToRgba({ radix: 16, double: true }, ...match);
  }
  return null;
};

export const colorStringToOptions = (colorString: string) => {
  const color = colorString.trim().toLowerCase();
  let rgba: ColorRGBA;
  let hsb: ColorHSB;
  if (color.startsWith('hsb')) {
    hsb = getHSB(color);
  } else {
    rgba = getRGBA(color);
  }
  return {
    rgb: rgba,
    hsb,
    opacity: rgba ? rgba.a : 1
  };
};
