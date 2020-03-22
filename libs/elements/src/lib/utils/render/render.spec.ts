import { IElementConfig, IElementData } from '@aiao/elements-cdk';

import { elementsFormRender, elementsPreviewHtmlRender, elementsPreviewRender, elementsViewRender } from './render';

describe('render', () => {
  const config: IElementConfig[] = [
    {
      tag: 'tag',
      innerHTML: true,
      defaultOptions: {
        innerHTML: '123'
      }
    },
    {
      tag: 'tag2',
      innerText: true,
      hasChildren: true,
      defaultOptions: {
        innerText: '123'
      }
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
  it('elementsFormRender', () => {
    const newData = elementsFormRender(config, data);
    expect(newData).toEqual(
      '<tag class="elements-form_item"></tag><tag2 class="elements-form_item"><tag2><tag2>123</tag2></tag2></tag2><tag-none class="elements-form_item"></tag-none>'
    );
  });
  it('elementsPreviewHtmlRender', () => {
    const newData = elementsPreviewHtmlRender(config, data, { editMode: 'edit' });
    expect(newData).toEqual(
      '<tag class="elements-edit_item" contentEditable="true"></tag><tag2 class="elements-edit_item" contentEditable="true"><tag2><tag2>123</tag2></tag2></tag2><tag-none></tag-none>'
    );
  });

  it('elementsPreviewRender', () => {
    const newData = elementsPreviewRender(config, data as any, { editMode: 'edit' });
    expect(newData.length).toEqual(3);
  });

  it('elementsViewRender', () => {
    const newData = elementsViewRender(config, data);
    expect(newData).toEqual(`<tag></tag><tag2><tag2><tag2>123</tag2></tag2></tag2><tag-none></tag-none>`);
  });
});
