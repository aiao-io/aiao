import './app.scss';

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import CodeEditorPage from './code-editor/code-editor';
import ElementsEditorPage from './elements-editor/ElementsEditor';
import ElementsPreviewPage from './elements-preview/ElementsPreview';
import Menu from './menu/Menu';
import TextEditorPage from './text-editor/TextEditor';

export const App: React.FunctionComponent = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" ref={e => console.log(e)}>
            <Route path="/code-editor" exact component={CodeEditorPage} />
            <Route path="/elements-editor" exact component={ElementsEditorPage} />
            <Route path="/elements-preview" exact component={ElementsPreviewPage} />
            <Route path="/text-editor" exact component={TextEditorPage} />
            <Route exact path="/" render={() => <Redirect to="/code-editor" />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
