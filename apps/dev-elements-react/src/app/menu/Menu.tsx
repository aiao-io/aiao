import './Menu.scss';

import { link } from 'ionicons/icons';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  IonButtons,
  IonContent,
  IonHeader,
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

// tslint:disable-next-line: no-empty-interface
interface MenuProps extends RouteComponentProps {}

interface IMenu {
  url: string;
  icon?: string;
  title: string;
}

const appPages: IMenu[] = [
  {
    title: 'Code Editor',
    url: '/code-editor',
    icon: link
  },
  {
    title: 'Elements Editor',
    url: '/elements-editor',
    icon: link
  },
  {
    title: 'Elements Preview',
    url: '/elements-preview',
    icon: link
  },
  {
    title: 'Text Editor',
    url: '/text-editor',
    icon: link
  }
];

const Menu: React.FunctionComponent<MenuProps> = ({ history }) => {
  const [selectedPage, setSelectedPage] = useState('');

  history.listen(d => {
    setSelectedPage(d.pathname);
  });

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Elements React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {appPages.map((appPage, index) => {
            const selectClass = selectedPage === appPage.url ? 'selected' : '';
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={selectClass} routerLink={appPage.url} routerDirection="none" detail={false}>
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
