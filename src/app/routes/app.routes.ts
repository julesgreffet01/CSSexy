import { Routes } from '@angular/router';
import { PopUpError } from '../components/popup/pop-up-error/pop-up-error';
import { PopUpEditable } from '../components/popup/pop-up-editable/pop-up-editable';
import { Layout } from '../layout/layout';
import { HomePage } from '../pages/home-page/home-page';
import { UserStatus } from '../components/user-status/user-status';
import { StatusTab } from '../components/tabs/status-tab/status-tab';
import { UpDownButton } from '../components/tabs/up-down-button/up-down-button';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {path: 'home', component: HomePage},
      ]
  },
  { path: 'userstatus', component: UserStatus },
  { path: 'statusTab', component: StatusTab},
  { path: 'updown', component: UpDownButton}
];
