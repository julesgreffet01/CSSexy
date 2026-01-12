import {Routes} from '@angular/router';
import {Layout} from '../layout/layout';
import { Tab } from '../components/tabs/tab/tab';
import { ListProjectPage } from '../pages/list-project-page/list-project-page';
import { ListUsersPage } from '../pages/list-users-page/list-users-page';
import { LoginPage } from '../pages/login-page/login-page';

export const routes: Routes = [
  {path: 'max', component: Tab,},
  {path: '', component: Layout, children: [
    {
      path: '', redirectTo: '/projects', pathMatch: 'full'
    },
    {
      path: 'projects', component: ListProjectPage
    },
    {
      path: 'users', component: ListUsersPage
    }
  ]},
  {path: 'login', component: LoginPage},
  {path: '**', loadComponent: () => import('../pages/errors/error-404/error-404').then(m => m.Error404)},
];
