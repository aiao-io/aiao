import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { elementsViewDefaultOptions } from './default-options';

describe('default-options', () => {
  it('默认 innerHTML', () => {
    const config: IElementConfig[] = [
      {
        tag: 'tag',
        innerHTML: true,
        defaultOptions: {
          innerHTML: 'default'
        }
      }
    ];
    const data: IElementData[] = [
      {
        tag: 'tag'
      }
    ];
    const def = elementsViewDefaultOptions(config, data);
    expect(def).toEqual([
      {
        tag: 'tag',
        innerHTML: 'default',
        attributes: {},
        style: {},
        class: {},
        slot: undefined,
        children: undefined,
        innerText: undefined
      }
    ]);
  });

  it('空值是有意义的', () => {
    const config: IElementConfig[] = [
      {
        tag: 'tag',
        innerHTML: true,
        defaultOptions: {
          innerHTML: 'default'
        }
      }
    ];
    const data: IElementData[] = [
      {
        tag: 'tag',
        innerHTML: ''
      }
    ];
    const def = elementsViewDefaultOptions(config, data);
    expect(def).toEqual([
      {
        tag: 'tag',
        innerHTML: '',
        attributes: {},
        style: {},
        class: {},
        slot: undefined,
        children: undefined,
        innerText: undefined
      }
    ]);
  });
});
