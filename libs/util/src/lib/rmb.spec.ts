import { rmbUppercase } from './rmb';

describe('rmb', () => {
  it('0', () => {
    expect(rmbUppercase(0)).toEqual('零元整');
  });
  it('1', () => {
    expect(rmbUppercase(1)).toEqual('壹元整');
  });
  it('10', () => {
    expect(rmbUppercase(10)).toEqual('壹拾元整');
  });
  it('20', () => {
    const rmb = rmbUppercase(20);
    expect(rmb).toEqual('贰拾元整');
  });

  it('101000', () => {
    const rmb = rmbUppercase(101000);
    expect(rmb).toEqual('壹拾万壹仟元整');
  });

  it('1010001000', () => {
    const rmb = rmbUppercase(1010001000);
    expect(rmb).toEqual('壹拾亿壹仟万壹仟元整');
  });

  it('1000001000', () => {
    const rmb = rmbUppercase(1000001000);
    expect(rmb).toEqual('壹拾亿零壹仟元整');
  });

  it('99254740991', () => {
    const rmb = rmbUppercase(99254740991);
    expect(rmb).toEqual('玖佰玖拾贰亿伍仟肆佰柒拾肆万零玖佰玖拾壹元整');
  });

  it('90080070080', () => {
    expect(rmbUppercase(90080070080)).toEqual('玖佰亿捌仟零柒万零捌拾元整');
  });

  it('90000000000', () => {
    expect(rmbUppercase(90000000000)).toEqual('玖佰亿元整');
  });

  it('壹京元整', () => {
    expect(rmbUppercase(10000000000000000)).toEqual('壹京元整');
  });

  it('壹京元整', () => {
    expect(rmbUppercase(10000000000000000)).toEqual('壹京元整');
  });

  it('MAX_SAFE_INTEGER', () => {
    // 9007199254740991
    expect(rmbUppercase(Number.MAX_SAFE_INTEGER)).toEqual('玖仟零柒兆壹仟玖佰玖拾贰亿伍仟肆佰柒拾肆万零玖佰玖拾壹元整');
  });

  it('万', () => {
    expect(rmbUppercase(Math.pow(10, 4))).toEqual('壹万元整');
  });

  it('亿', () => {
    expect(rmbUppercase(Math.pow(10, 8))).toEqual('壹亿元整');
  });

  it('兆', () => {
    expect(rmbUppercase(Math.pow(10, 12))).toEqual('壹兆元整');
  });

  it('京', () => {
    expect(rmbUppercase(Math.pow(10, 16))).toEqual('壹京元整');
  });

  it('垓', () => {
    expect(rmbUppercase(Math.pow(10, 20))).toEqual('壹垓元整');
  });

  it('垓', () => {
    expect(rmbUppercase(Math.pow(10, 22))).toEqual('壹佰垓元整');
  });

  it('max error', done => {
    try {
      const rmb = rmbUppercase(Math.pow(10, 27) + 1);
      console.log(rmb);
      done(rmb);
    } catch (error) {
      done();
    }
  });

  it('0.1', () => {
    const rmb = rmbUppercase(0.1);
    expect(rmb).toEqual('壹角');
  });

  it('0.01', () => {
    const rmb = rmbUppercase(0.01);
    expect(rmb).toEqual('壹分');
  });

  it('0.001', () => {
    const rmb = rmbUppercase(0.001);
    expect(rmb).toEqual('壹厘');
  });

  it('20.1', () => {
    const rmb = rmbUppercase(20.1);
    expect(rmb).toEqual('贰拾元壹角');
  });

  it('20.01', () => {
    const rmb = rmbUppercase(20.01);
    expect(rmb).toEqual('贰拾元壹分');
  });

  it('20.11', () => {
    const rmb = rmbUppercase(20.11);
    expect(rmb).toEqual('贰拾元壹角壹分');
  });

  it('-20.11', () => {
    const rmb = rmbUppercase(-20.11);
    expect(rmb).toEqual('欠贰拾元壹角壹分');
  });
});
