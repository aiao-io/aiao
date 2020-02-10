import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { elementsViewDefaultOptions } from './default-options';

describe('getDefaultValue', () => {
  it('needArray', () => {
    const config: IElementConfig[] = [
      {
        tag: 'tag',
        defaultOptions: {
          innerHTML: '123'
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
        attributes: {},
        children: undefined,
        class: {},
        innerHTML: undefined,
        innerText: undefined,
        slot: undefined,
        style: {},
        tag: 'tag'
      }
    ]);
  });
});
