import {Component, input, output} from '@angular/core';
import {Inputs} from '../../inputs/inputs';
import {Buttons} from '../../buttons/buttons';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import type {ProjetModel} from '../../../models/projet-model';
import type {ServiceModel} from '../../../models/service-model';

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

  myObj = output<ProjetModel | ServiceModel>()
  closePopup = output<void>()

  name: string = '';
  image: string = '';
  ports: string[] = [""];


  type = input<'Projet' | 'Service'>();
  action = input<'Modification' | 'Ajout'>();

  formService = new FormGroup({
    name: new FormControl(this.name, {nonNullable: true, validators: [Validators.required]}),
    image: new FormControl(this.image, {nonNullable: true, validators: [Validators.required]}),
    ports: new FormArray<FormControl<string>>([new FormControl("", { nonNullable: true, validators: [Validators.required] })])
  });

  formProjet = new FormGroup({
    name: new FormControl(this.name, {nonNullable: true, validators: [Validators.required]}),
  });

  get portsArray(): FormArray<FormControl<string>> {
    return this.formService.controls.ports;
  }

  public getType() {
    return this.type();
  }

  public getAction() {
    return this.action();
  }

  public getButtonName() {
    if (this.action() == 'Modification') {
      return 'Modifier';
    } else {
      return 'Ajouter';
    }
  }

  addPort = () => {
    this.portsArray.push(new FormControl('', { nonNullable: true }));
  }


  public Submit() {
    let obj: ProjetModel | ServiceModel;

    if (this.type() === 'Projet') {
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
    this.myObj.emit(obj);
  }

  public closePopupSubmit(){
    this.closePopup.emit()
  }
}
