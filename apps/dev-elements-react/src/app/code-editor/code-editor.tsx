import './code-editor.scss';

import React from 'react';

import { AiaoCodeEditor } from '@aiao/elements-react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export const CodeEditor: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Code Editor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AiaoCodeEditor baseUrl="assets/monaco" language="typescript" value="const a = 'react';"></AiaoCodeEditor>
      </IonContent>
    </IonPage>
  );
};

export default CodeEditor;
