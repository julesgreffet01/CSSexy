import {Component, input} from '@angular/core';
import {Inputs} from '../../inputs/inputs';
import {Buttons} from '../../buttons/buttons';

@Component({
  selector: 'app-pop-up-editable',
  imports: [
    Inputs,
    Buttons
  ],
  templateUrl: './pop-up-editable.html',
  styleUrl: './pop-up-editable.css',
})
export class PopUpEditable {

  //type = input<'Projet' | 'Service'>();
  //action = input<'Modification' | 'Ajout'>();
  callback = input< ((arg?: string) => void)>()


  type = 'Service';
  action = 'Ajout';

  public getType(){
    return this.type;
  }

  public getAction(){
    return this.action;
  }

  public getcallback(){
    this.callback();
  }

  public getButtonName(){
    if(this.action == 'Modification'){
      return 'Modifier';
    }else{
      return 'Ajouter';
    }
  }


}
