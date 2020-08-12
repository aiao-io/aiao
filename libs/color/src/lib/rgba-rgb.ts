import { ColorRGB, ColorRGBA } from './interface';

export const RGBAToRGB = ({ a, ...rgb }: ColorRGBA): ColorRGB => rgb;
