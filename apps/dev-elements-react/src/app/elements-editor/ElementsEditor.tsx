import './ElementsEditor.scss';

import React from 'react';

import { AiaoElementsEditor } from '@aiao/elements-react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const ELementsEditorPage: React.FC = () => {
  const config = [
    {
      tag: 'h1',
      innerText: true,
      defaultOptions: {
        innerText: 'h1h1h1h1'
      }
    }
  ];

  const data = [
    {
      tag: 'ion-button',
      innerText: 'button',
      class: {
        a: true
      },
      attributes: {
        mode: 'ios'
      },
      style: {
        minWidth: '200px'
      }
    },
    {
      tag: 'h1'
    },
    {
      tag: 'div',
      children: [
        {
          tag: 'h1',
          innerText: 'true'
        }
      ]
    },
    {
      tag: 'aiao-img',
      attributes: {
        src: 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
      }
    }
  ];
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
        <form>
          <AiaoElementsEditor config={config} value={data}></AiaoElementsEditor>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ELementsEditorPage;
