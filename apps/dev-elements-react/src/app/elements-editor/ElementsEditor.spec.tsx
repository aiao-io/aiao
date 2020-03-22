import React from 'react';

import { render } from '@testing-library/react';

import ELementsEditorPage from './ELementsEditor';

describe('ELementsEditorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ELementsEditorPage />);
    expect(baseElement).toBeTruthy();
  });
});
