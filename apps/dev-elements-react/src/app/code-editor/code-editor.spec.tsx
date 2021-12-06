import React from 'react';

import { render } from '@testing-library/react';

import CodeEditor from './code-editor';

describe(' CodeEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CodeEditor />);
    expect(baseElement).toBeTruthy();
  });
});
