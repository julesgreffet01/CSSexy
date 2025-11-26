import { Routes } from '@angular/router';
import {PopUpError} from '../components/popup/pop-up-error/pop-up-error';
import {PopUpEditable} from '../components/popup/pop-up-editable/pop-up-editable';

export const routes: Routes = [
  {    path: 'max',    component: PopUpEditable,  },
];
