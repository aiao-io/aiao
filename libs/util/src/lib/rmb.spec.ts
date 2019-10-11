import { rmbUppercase } from './rmb';

describe('rmb', () => {
  it('rmbUppercase', () => {
    const rmb = rmbUppercase(20);
    expect(rmb).toEqual('贰拾元整');
  });
  it('rmbUppercase', () => {
    const rmb = rmbUppercase(20.1);
    expect(rmb).toEqual('贰拾元壹角');
  });
  it('rmbUppercase', () => {
    const rmb = rmbUppercase(20.01);
    expect(rmb).toEqual('贰拾元壹分');
  });
  it('rmbUppercase', () => {
    const rmb = rmbUppercase(20.11);
    expect(rmb).toEqual('贰拾元壹角壹分');
  });
  it('rmbUppercase', () => {
    const rmb = rmbUppercase(-20.11);
    expect(rmb).toEqual('欠贰拾元壹角壹分');
  });
  it('rmbUppercase', () => {
    const rmb = rmbUppercase(0);
    expect(rmb).toEqual('零元整');
  });

  it('rmbUppercase', () => {
    const rmb = rmbUppercase(99254740991);
    expect(rmb).toEqual('玖佰玖拾贰亿伍仟肆佰柒拾肆万零玖佰玖拾壹元整');
  });

  it('90080070080', () => {
    expect(rmbUppercase(90080070080)).toEqual('玖佰亿捌仟零柒万零捌拾元整');
  });
  it('90000000000', () => {
    expect(rmbUppercase(90000000000)).toEqual('玖佰亿元整');
  });

  it('rmbUppercase', () => {
    const rmb = rmbUppercase(Number.MAX_SAFE_INTEGER);
    // 9007199254740991
    expect(rmb).toEqual('玖仟零柒兆壹仟玖佰玖拾贰亿伍仟肆佰柒拾肆万零玖佰玖拾壹元整');
  });

  it('rmbUppercase', done => {
    try {
      const rmb = rmbUppercase(Number.MAX_VALUE);
      done(rmb);
    } catch (error) {
      done();
    }
  });
});

// 90071 99254740991
