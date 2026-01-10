import type {Routes} from '@angular/router';
import {Layout} from '../layout/layout';
import {LoginPage} from '../pages/login-page/login-page';

export const routes: Routes = [
  {path: 'login', component: LoginPage,},
  {path: '', component: Layout},
];
