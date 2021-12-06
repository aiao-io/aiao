import React from 'react';

import { render } from '@testing-library/react';

import ElementsEditorPage from './ElementsEditor';

describe('ELementsEditorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ElementsEditorPage />);
    expect(baseElement).toBeTruthy();
  });
});
