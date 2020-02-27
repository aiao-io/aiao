import './Menu.scss';

import { link } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  icon?: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Code Editor',
    url: '/code-editor',
    icon: link
  }
];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Elements React</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={selectedPage === appPage.title ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  detail={false}
                >
                  {appPage.icon && <IonIcon slot="start" icon={appPage.icon} />}
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
