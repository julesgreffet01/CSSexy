import {Component, input} from '@angular/core';
import {Inputs} from '../../inputs/inputs';
import {Buttons} from '../../buttons/buttons';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProjetModel} from '../../../models/projet-model';
import {ServiceModel} from '../../../models/service-model';

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
  ports: string[] = [];

  //type = input<'Projet' | 'Service'>();
  //action = input<'Modification' | 'Ajout'>();
  callback = input<((arg?: string) => void)>()

  formService = new FormGroup({
    name: new FormControl(this.name, {nonNullable: true, validators: [Validators.required]}),
    image: new FormControl(this.image, {nonNullable: true, validators: [Validators.required]}),
    ports: new FormControl<string[]>(this.ports, { nonNullable: true, validators: [Validators.required]})
  });

  formProjet = new FormGroup({
    name: new FormControl(this.name, {nonNullable: true, validators: [Validators.required]}),
  });


  type = 'Service';
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

  public addPort(){
    
  }

  public Submit() {
    let obj: ProjetModel | ServiceModel;

    if (this.type === 'Projet') {
      obj = {
        id: 0,
        name: this.formProjet.value.name!,
        services: [],
        createdAt: new Date()
      };
    } else
      obj = {
        id: '0',
        name: this.formService.value.name!,
        image: this.formService.value.image!,
        status: "STARTING",
        startedSince: new Date(),
        ports: this.formService.value.ports!
      };
    console.log(obj);
  }

}
