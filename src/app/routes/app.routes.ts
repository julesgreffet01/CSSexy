import {Routes} from '@angular/router';
import {Layout} from '../layout/layout';
import { Tab } from '../components/tabs/tab/tab';
import { ListProjectPage } from '../pages/list-project-page/list-project-page';
import { ListUsersPage } from '../pages/list-users-page/list-users-page';
import {LoginPage} from '../pages/login-page/login-page';

export const routes: Routes = [
  {path: 'max', component: Tab,},
  {path: 'Projects', component: ListProjectPage},
  {path: 'Users', component: ListUsersPage},
  {path: '', component: Layout},
  {path: 'login', component: LoginPage}
];
