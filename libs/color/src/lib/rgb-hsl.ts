import { ColorHSL, ColorRGB } from './interface';

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};

export const RGBToHSL = ({ r, g, b }: ColorRGB): ColorHSL => {
  r = Math.max(Math.min(r / 255, 1), 0);
  g = Math.max(Math.min(g / 255, 1), 0);
  b = Math.max(Math.min(b / 255, 1), 0);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = Math.min(1, Math.max(0, (max + min) / 2));
  let d;
  let h;
  let s;

  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h = h / 6;
  } else {
    h = s = 0;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export const HSLToRGB = ({ h, s, l }: ColorHSL): ColorRGB => {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  if (s === 0) {
    l = Math.round(l * 255);
    return {
      r: l,
      g: l,
      b: l
    };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};
