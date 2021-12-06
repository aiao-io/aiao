import './ElementsPreview.scss';

import React, { useState } from 'react';

import { AiaoCodeEditor, AiaoElementsPreview } from '@aiao/elements-react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const ElementsPreviewPage: React.FC = () => {
  const configObj = [
    {
      tag: 'h1',
      innerText: true,
      defaultOptions: {
        innerText: 'h1h1h1h1'
      }
    }
  ];

  const elementsObj = [
    {
      _id: 1,
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
      _id: 2,
      tag: 'h1'
    },
    {
      _id: 3,
      tag: 'div',
      children: [
        {
          tag: 'h1',
          innerText: 'true'
        }
      ]
    },
    {
      _id: 4,
      tag: 'aiao-img',
      attributes: {
        src: 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
      }
    }
  ];

  const [config, setConfig] = useState(configObj);
  const [elements, setElements] = useState(elementsObj);

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
        <div className="container">
          <form className="editor">
            <AiaoCodeEditor
              className="item"
              language="json"
              value={elements}
              onAiaoChange={e => setElements(e.detail.value)}
            ></AiaoCodeEditor>
            <AiaoCodeEditor
              className="item"
              language="json"
              value={config}
              onAiaoChange={e => setConfig(e.detail.value)}
            ></AiaoCodeEditor>
          </form>
          <AiaoElementsPreview id="preview" value={elements} config={config}></AiaoElementsPreview>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ElementsPreviewPage;
