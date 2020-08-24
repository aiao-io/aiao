import { ColorRGB } from './interface';

export const RGBToYIQ = ({ r, g, b }: ColorRGB): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};
