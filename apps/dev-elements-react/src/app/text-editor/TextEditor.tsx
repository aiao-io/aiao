import './TextEditor.scss';

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { AiaoTextEditor } from '@aiao/elements-react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const ELementsPreviewPage: React.FC = () => {
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

export default withRouter(ELementsPreviewPage);
