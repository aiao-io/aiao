import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { elementsPreviewHtmlData } from './render-edit';

describe('render-editor', () => {
  it('elementsPreviewHtmlData', () => {
    const config: IElementConfig[] = [
      {
        tag: 'tag',
        innerHTML: true,
        defaultOptions: {}
      },
      {
        tag: 'tag2',
        innerText: true,
        hasChildren: true,
        defaultOptions: {}
      }
    ];
    const data: IElementData[] = [
      {
        tag: 'tag',
        innerHTML: ''
      },
      {
        tag: 'tag2',
        children: [
          {
            tag: 'tag2'
          }
        ]
      },
      {
        tag: 'tag-none'
      }
    ];
    const newData = elementsPreviewHtmlData(config, data, { editMode: 'edit' });
    const newData2 = elementsPreviewHtmlData(config, data);
    expect(newData.length).toEqual(3);
    expect(newData2.length).toEqual(3);
  });
});
