import { Color } from './color';

describe('color', () => {
  it('#ffffff', () => {
    const color = new Color();
    expect(color.toString()).toEqual('#ffffff');
  });

  it('hsb(120, 1, 1)', () => {
    const color = new Color('hsb(120, 1, 1)');
    expect(color.toString()).toEqual('#00ff00');
  });

  it('hsb(120, 100%, 100%)', () => {
    const color = new Color('hsb(120, 100%, 100%)');
    expect(color.toString()).toEqual('#00ff00');
  });

  it('hsb(120) error', done => {
    try {
      const color = new Color('hsb(120, 10%)');
      done(color);
    } catch (error) {
      done();
    }
  });

  it('catch a error', done => {
    try {
      const color = new Color({} as any);
      done(color);
    } catch (error) {
      done();
    }
  });

  it('catch a error', done => {
    try {
      const color = new Color('#1');
      done(color);
    } catch (error) {
      done();
    }
  });

  it('isDark', () => {
    const color = new Color('#000');
    expect(color.isDark()).toBeTruthy();
    expect(color.isDark(128)).toBeTruthy();
  });

  it('isLight', () => {
    const color = new Color('#fff');
    expect(color.isLight()).toBeTruthy();
    expect(color.isLight(128)).toBeTruthy();
  });

  it('color.toString', () => {
    const color = new Color('rgb(0, 255, 0)');
    expect(color.toString()).toEqual('#00ff00');
    expect(color.toString('rgb')).toEqual('rgb(0, 255, 0)');
    expect(color.toString('rgba')).toEqual('rgba(0, 255, 0, 1)');
    expect(color.toString('hsb')).toEqual('hsb(120, 1, 1)');
  });

  it('color.toString error', done => {
    const color = new Color();
    try {
      color.toString('111' as any);
      done(color);
    } catch (error) {
      done();
    }
  });

  describe('hex', () => {
    it('8位', () => {
      const color = new Color('#00ff00FF');
      expect(color.toString()).toEqual('#00ff00');
    });
    it('6位', () => {
      const color = new Color('#00ff00');
      expect(color.toString()).toEqual('#00ff00');
    });
    it('3位', () => {
      const color = new Color('#0f0');
      expect(color.toString()).toEqual('#00ff00');
    });
  });

  describe('hsb', () => {
    it('hsb', () => {
      const color = new Color();
      color.hsb = { h: 120, s: 1, b: 1 };
      expect(color.toString('hsb')).toEqual('hsb(120, 1, 1)');
      expect(color.hsb).toEqual({ h: 120, s: 1, b: 1 });
    });
  });

  describe('rgb', () => {
    it('new', () => {
      const color = new Color('rgb(0, 255, 0)');
      expect(color.toString()).toEqual('#00ff00');
      expect(color.rgb).toEqual({ r: 0, g: 255, b: 0 });
      expect(color.toString('rgb')).toEqual('rgb(0, 255, 0)');
      expect(color.toString('rgba')).toEqual('rgba(0, 255, 0, 1)');
    });

    it('set red green blue', () => {
      const color = new Color();
      color.red = 255;
      color.green = 255;
      color.blue = 255;
      expect(color.toString()).toEqual('#ffffff');
      expect(color.red).toEqual(255);
      expect(color.green).toEqual(255);
      expect(color.blue).toEqual(255);
      expect(color.hue).toEqual(0);
      expect(color.saturation).toEqual(0);
      expect(color.brightness).toEqual(1);
    });

    it('set hue saturation brightness', () => {
      const color = new Color();
      color.hue = 234;
      color.saturation = 0.5;
      color.brightness = 0.5;
      expect(color.toString()).toEqual('#404680');
    });

    it('set/get rgb', () => {
      const color = new Color();
      color.rgb = { r: 200, g: 200, b: 200 };
      expect(color.toString()).toEqual('#c8c8c8');
      expect(color.rgb).toEqual({ r: 200, g: 200, b: 200 });
      expect(color.rgba).toEqual({ r: 200, g: 200, b: 200, a: 1 });
      expect(color.toString('rgb')).toEqual('rgb(200, 200, 200)');
      expect(color.toString('rgba')).toEqual('rgba(200, 200, 200, 1)');
      expect(color.toString('hsb')).toEqual('hsb(0, 0, 0.7843137254901961)');
    });
  });

  describe('rgba', () => {
    it('new', () => {
      const color = new Color('rgba(0, 255,0, 0.5)');
      color.opacity = 0.6;
      expect(color.toString()).toEqual('#00ff0099');
      expect(color.opacity).toEqual(0.6);
      expect(color.toString('rgb')).toEqual('rgb(0, 255, 0)');
      expect(color.toString('rgba')).toEqual('rgba(0, 255, 0, 0.6)');
      expect(color.toString('hsb')).toEqual('hsb(120, 1, 1)');
    });

    it('set/get rgba', () => {
      const color = new Color();
      color.rgba = { r: 200, g: 200, b: 200, a: 0.5 };
      expect(color.toString()).toEqual('#c8c8c880');
      expect(color.rgb).toEqual({ r: 200, g: 200, b: 200 });
      expect(color.rgba).toEqual({ r: 200, g: 200, b: 200, a: 0.5 });
      expect(color.toString('rgb')).toEqual('rgb(200, 200, 200)');
      expect(color.toString('rgba')).toEqual('rgba(200, 200, 200, 0.5)');
      expect(color.toString('hsb')).toEqual('hsb(0, 0, 0.7843137254901961)');
      expect(color.toString('hsb', true)).toEqual('hsb(0, 0%, 78.43137254901961%)');
    });
  });
});
