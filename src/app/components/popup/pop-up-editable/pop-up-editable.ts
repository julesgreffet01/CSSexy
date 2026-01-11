import {Component, input} from '@angular/core';
import {Inputs} from '../../inputs/inputs';
import {Buttons} from '../../buttons/buttons';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-pop-up-editable',
  imports: [
    Inputs,
    Buttons,
    ReactiveFormsModule
  ],
  templateUrl: './pop-up-editable.html',
  styleUrl: './pop-up-editable.css',
})
export class PopUpEditable {
  name: string = '';
  image: string = '';

  //type = input<'Projet' | 'Service'>();
  //action = input<'Modification' | 'Ajout'>();
  callback = input<((arg?: string) => void)>()

  formService = new FormGroup({
    name: new FormControl(this.name, {nonNullable: true, validators: [Validators.required]}),
    image: new FormControl(this.image, {nonNullable: true, validators: [Validators.required]})
  });

  formProjet = new FormGroup({
    name: new FormControl(this.name, {nonNullable: true, validators: [Validators.required]}),
  });


  type = 'Projet';
  action = 'Ajout';

  public getType() {
    return this.type;
  }

  public getAction() {
    return this.action;
  }

  public getcallback() {
    this.callback();
  }

  public getButtonName() {
    if (this.action == 'Modification') {
      return 'Modifier';
    } else {
      return 'Ajouter';
    }
  }

  public test() {
    console.log(this.formProjet.value.name);
  }

}
