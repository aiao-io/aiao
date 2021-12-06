import { ColorRGB, ColorRGBA } from './interface';

// eslint-disable-next-line
export const RGBAToRGB = ({ a, ...rgb }: ColorRGBA): ColorRGB => rgb;
