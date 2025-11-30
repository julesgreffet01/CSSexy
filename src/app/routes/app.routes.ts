import { Routes } from '@angular/router';
import {Layout} from '../layout/layout';
import {HomePage} from '../pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {path: 'home', component: HomePage},
      ]
  }
];
