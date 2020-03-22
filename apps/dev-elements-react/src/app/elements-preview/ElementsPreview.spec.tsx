import React from 'react';

import { render } from '@testing-library/react';

import ElementsPreviewPage from './ElementsPreview';

describe('ElementsPreviewPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ElementsPreviewPage />);
    expect(baseElement).toBeTruthy();
  });
});
