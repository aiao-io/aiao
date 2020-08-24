import { ColorRGBA } from './interface';
import { colorStringToOptions } from './matchers';

export const colorMix = (colorA: string, colorB: string, weight: number = 0.5): ColorRGBA => {
  const ca = colorStringToOptions(colorA);
  const cb = colorStringToOptions(colorB);
  const { opacity: o1 } = ca;
  const { opacity: o2 } = cb;
  const { r: r1, g: g1, b: b1 } = ca.rgb!;
  const { r: r2, g: g2, b: b2 } = cb.rgb!;
  const w2 = 1 - weight;
  return {
    r: Math.round(r1 * w2 + r2 * weight),
    g: Math.round(g1 * w2 + g2 * weight),
    b: Math.round(b1 * w2 + b2 * weight),
    a: Math.round(o1 * w2 + o2 * weight)
  };
};
