import { isString } from '@aiao/util';

import { ColorHSB, ColorRGB, ColorRGBA, ColorType } from './interface';
import { colorStringToOptions } from './matchers';
import { RGBAToHEX, RGBToHEX } from './rgb-hex';
import { HSBToRGB, RGBToHSB } from './rgb-hsb';
import { formatDecimal } from './util';

export class Color {
  // rgb
  private _red = 0; // 红色 (0-255)
  private _green = 0; // 绿色 (0-255)
  private _blue = 0; // 蓝色 (0-255)

  // hsb
  private _hue = 0; // hue 色调  (0-360)
  private _saturation = 0; // saturation 饱和度 (0-1)
  private _brightness = 0; //  亮度 (0-1)

  // opacity
  private _opacity = 1; // 透明度 0-1

  constructor(colorStr: string = '#FFF') {
    if (!isString(colorStr)) {
      throw new Error('color must string');
    }
    const colorObject = colorStringToOptions(colorStr);
    const { rgb, hsb, opacity } = colorObject;
    if (rgb) {
      this.rgb = rgb;
    } else if (hsb) {
      this.hsb = hsb;
    } else {
      throw new Error(`${colorStr} not support`);
    }
    this._opacity = opacity;
  }

  // hsb
  set hsb(hsb: ColorHSB) {
    this._updateHSB(hsb);
    this._updateRGB();
  }

  get hsb(): ColorHSB {
    return { h: this._hue, s: this._saturation, b: this._brightness };
  }

  // rgb
  set rgb(rgb: ColorRGB) {
    this._updateRGB(rgb);
    this._updateHSB();
  }

  get rgb(): ColorRGB {
    return { r: this._red, g: this._green, b: this._blue };
  }

  // rgba
  set rgba(rgba: ColorRGBA) {
    this._opacity = rgba.a;
    this.rgb = rgba;
  }

  get rgba(): ColorRGBA {
    return { ...this.rgb, a: this._opacity };
  }

  // 透明度
  set opacity(val: number) {
    this._opacity = val;
  }
  get opacity() {
    return this._opacity;
  }

  // 红色
  set red(val: number) {
    this._red = val;
    this._updateHSB();
  }
  get red() {
    return this._red;
  }

  // 绿色
  set green(val: number) {
    this._green = val;
    this._updateHSB();
  }
  get green() {
    return this._green;
  }

  // 蓝色
  set blue(val: number) {
    this._blue = val;
    this._updateHSB();
  }
  get blue() {
    return this._blue;
  }

  // 色调
  set hue(val: number) {
    this._hue = val;
    this._updateRGB();
  }
  get hue() {
    return this._hue;
  }

  // 饱和度
  set saturation(val: number) {
    this._saturation = val;
    this._updateRGB();
  }
  get saturation() {
    return this._saturation;
  }

  // 亮度
  set brightness(val: number) {
    this._brightness = val;
    this._updateRGB();
  }
  get brightness() {
    return this._brightness;
  }

  /**
   * 是否是暗色
   * @param m 阀值
   */
  isDark(m = 128) {
    return this._bright() < m;
  }

  /**
   * 是否是亮色
   * @param m 阀值
   */
  isLight(m = 128) {
    return !this.isDark(m);
  }

  /**
   * @param type 颜色类型
   * @param decimal true 显示数字, false 百分比
   */
  toString(type?: ColorType): string;
  toString(type: 'hsb', decimal?: boolean): string;
  toString(type = 'hex', decimal: boolean = false): string {
    switch (type) {
      case 'hex':
        if (this._opacity >= 0 && this._opacity < 1) {
          return RGBAToHEX(this.rgba);
        }
        return RGBToHEX(this.rgb);
      case 'rgb':
        return `rgb(${this._red}, ${this._green}, ${this._blue})`;
      case 'rgba':
        return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._opacity})`;
      case 'hsb':
        const saturate = decimal ? formatDecimal(this._saturation) : this._saturation;
        const brightness = decimal ? formatDecimal(this._brightness) : this._brightness;
        return `hsb(${this._hue}, ${saturate}, ${brightness})`;
      default:
        throw new Error(`type:${type} not support`);
    }
  }

  private _bright() {
    return (this._red * 299 + this._green * 587 + this._blue * 114) / 1000;
  }

  private _updateRGB(rgb: ColorRGB = HSBToRGB(this.hsb)) {
    const { r, g, b } = rgb;
    this._red = r;
    this._green = g;
    this._blue = b;
  }

  private _updateHSB(hsb: ColorHSB = RGBToHSB(this.rgb)) {
    const { h, s, b } = hsb;
    this._hue = h;
    this._saturation = s;
    this._brightness = b;
  }
}
