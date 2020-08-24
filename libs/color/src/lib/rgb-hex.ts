import { ColorRGB, ColorRGBA } from './interface';

const expandHex = (hex: string): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  return `#${hex.replace('#', '')}`;
};

/**
 * reb 转 hex
 * @param hex
 */
export const RGBToHEX = ({ r, g, b }: ColorRGB) =>
  '#' + [r, g, b].map(val => val.toString(16).padStart(2, '0')).join('');

/**
 * reba 转 hex
 * @param hex
 */
export const RGBAToHEX = (rbga: ColorRGBA) =>
  RGBToHEX(rbga) +
  Math.round(rbga.a * 255)
    .toString(16)
    .padStart(2, '0');

/**
 * hex 转 rgb
 * @param hex
 */
export const HEXToRGB = (hex: string): ColorRGB => {
  hex = expandHex(hex);
  hex = hex.replace('#', '');
  const intValue: number = parseInt(hex, 16);
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255
  };
};
