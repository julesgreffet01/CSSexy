import type {Routes} from '@angular/router';
import {Layout} from '../layout/layout';
import { LoginPage } from '../pages/login-page/login-page';
import { authGuard } from '../core/guards/guard-auth';
import { guardRoleGuard } from '../core/guards/guard-role-guard';
import {ProfilPage} from '../pages/profil-page/profil-page';
//import {PopUpEditable} from '../components/popup/pop-up-editable/pop-up-editable';

export const routes: Routes = [
  {path: 'maxime', component: ProfilPage,},
  {path: '', component: Layout, canActivate:[authGuard], children: [
    {
      path: '', redirectTo: '/projects', pathMatch: 'full'
    },
    {
      path: 'projects', loadComponent: () => import('../pages/list-project-page/list-project-page').then(m => m.ListProjectPage)
    },
    {
      path: 'users', loadComponent:() => import('../pages/list-users-page/list-users-page').then(m => m.ListUsersPage) , canActivate: [guardRoleGuard], data:{ roles: ['ADMIN'] }
    },
    {
      path: 'project/:id', loadComponent: () => import('../pages/detail-project-page/detail-project-page').then(m => m.DetailProjectPage)
    },
    {
      path: 'service/:id', loadComponent: () => import('../pages/detail-service-page/detail-service-page').then(m => m.DetailServicePage)
    }
  ]},
  {path: 'login', component: LoginPage},
  {path: 'error-403', loadComponent: () => import('../pages/errors/error-403/error-403').then(m => m.Error403)},
  {path: 'error-500', loadComponent: () => import('../pages/errors/error-500/error-500').then(m => m.Error500)},
  {path: '**', loadComponent: () => import('../pages/errors/error-404/error-404').then(m => m.Error404)},
];
