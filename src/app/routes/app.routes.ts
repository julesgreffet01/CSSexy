import {Routes} from '@angular/router';
import {PopUpError} from '../components/popup/pop-up-error/pop-up-error';
import {PopUpEditable} from '../components/popup/pop-up-editable/pop-up-editable';
import {Layout} from '../layout/layout';
import {HomePage} from '../pages/home-page/home-page';
import {LoginPage} from '../pages/login-page/login-page';
import { Tab } from '../components/tabs/tab/tab';
import { SwapTab } from '../components/swap-tab/swap-tab';
import { Header } from '../components/header/header';
import { ListProjectPage } from '../pages/list-project-page/list-project-page';
import { ListUsersPage } from '../pages/list-users-page/list-users-page';

export const routes: Routes = [
  {path: 'max', component: Tab,},
  {path: 'Projects', component: ListProjectPage},
  {path: 'Users', component: ListUsersPage},

];
