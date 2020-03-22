import './TextEditor.scss';

import React, { useState } from 'react';

import { AiaoTextEditor } from '@aiao/elements-react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const TextEditorPage: React.FC = () => {
  const [hello, setHello] = useState('hello world');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>elements editor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AiaoTextEditor value={hello}></AiaoTextEditor>
      </IonContent>
    </IonPage>
  );
};

export default TextEditorPage;
