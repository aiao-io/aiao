import { ColorRGB, ColorRGBA } from './interface';

export const RGBToHEX = ({ r, g, b }: ColorRGB) =>
  '#' + [r, g, b].map(val => val.toString(16).padStart(2, '0')).join('');

export const RGBAToHEX = (rbga: ColorRGBA) =>
  RGBToHEX(rbga) +
  Math.round(rbga.a * 255)
    .toString(16)
    .padStart(2, '0');
