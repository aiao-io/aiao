import './app.scss';

import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import CodeEditorPage from './code-editor/code-editor';
import ElementsEditorPage from './elements-editor/ElementsEditor';
import Menu from './menu/Menu';

export const App: React.FunctionComponent = () => {
  const [selectedPage, setSelectedPage] = useState('');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu selectedPage={selectedPage} />
          <IonRouterOutlet id="main">
            <Route path="/code-editor" exact component={CodeEditorPage} />
            <Route path="/elements-editor" exact component={ElementsEditorPage} />
            <Route exact path="/" render={() => <Redirect to="/code-editor" />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
