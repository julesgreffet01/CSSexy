import {Routes} from '@angular/router';
import {PopUpError} from '../components/popup/pop-up-error/pop-up-error';
import {PopUpEditable} from '../components/popup/pop-up-editable/pop-up-editable';
import {Layout} from '../layout/layout';
import {HomePage} from '../pages/home-page/home-page';
import {LoginPage} from '../pages/login-page/login-page';
import { Tab } from '../components/tabs/tab/tab';
import {DetailServicePage} from '../pages/detail-service-page/detail-service-page';

export const routes: Routes = [
  {path: 'max', component: PopUpEditable},
  {path: 'home', component: Tab},


];
