import { IElementData } from '@aiao/elements-cdk';

import { elementsDataStringify } from './render-view';

describe('render-view', () => {
  const data: IElementData[] = [
    {
      tag: 'tag',
      innerHTML: ''
    },
    {
      tag: 'tag2',
      children: [
        {
          tag: 'tag2',
          children: [
            {
              tag: 'tag2'
            }
          ]
        }
      ]
    },
    {
      tag: 'tag-none'
    }
  ];
  it('elementsDataStringify', () => {
    const newData = elementsDataStringify(data);
    expect(newData).toEqual(`<tag></tag><tag2><tag2><tag2></tag2></tag2></tag2><tag-none></tag-none>`);
  });
});
