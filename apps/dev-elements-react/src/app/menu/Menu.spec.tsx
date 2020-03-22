import React from 'react';

import { IonReactRouter } from '@ionic/react-router';
import { render } from '@testing-library/react';

import Menu from './Menu';

describe('Menu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <IonReactRouter>
        <Menu />
      </IonReactRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
