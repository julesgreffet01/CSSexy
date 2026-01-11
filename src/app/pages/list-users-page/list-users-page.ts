import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { SwapTab } from '../../components/swap-tab/swap-tab';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { UtilisateurModel } from '../../models/utilisateur-model';

@Component({
  selector: 'app-list-users-page',
  imports: [    
    Header,
    SwapTab,
    Tab,
    Buttons],
  templateUrl: './list-users-page.html',
  styleUrl: './list-users-page.css',
})
export class ListUsersPage {
  UserExample: UtilisateurModel = {
    id: 1,
    username: 'user1',
    name: 'User Test',
    role: 'ADMIN'
  };
  
}
