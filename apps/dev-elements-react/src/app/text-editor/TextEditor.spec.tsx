import React from 'react';

import { render } from '@testing-library/react';

import TextEditor from './TextEditor';

describe('ELementsEditorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextEditor />);
    expect(baseElement).toBeTruthy();
  });
});
