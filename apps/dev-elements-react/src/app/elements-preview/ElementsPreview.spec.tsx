import React from 'react';

import { render } from '@testing-library/react';

import ELementsPreviewPage from './ELementsPreview';

describe('ELementsPreviewPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ELementsPreviewPage />);
    expect(baseElement).toBeTruthy();
  });
});
