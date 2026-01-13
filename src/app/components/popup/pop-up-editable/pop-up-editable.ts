import {Component, input, output} from '@angular/core';
import {Inputs} from '../../inputs/inputs';
import {Buttons} from '../../buttons/buttons';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {isProjet, ProjetModel} from '../../../models/projet-model';
import type {ServiceModel} from '../../../models/service-model';

@Component({
  selector: 'app-pop-up-editable',
  standalone: true,
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



  oldProjet = input<ProjetModel>()
  oldService = input<ServiceModel>()


  formProjet!: FormGroup;
  formService!: FormGroup;

  ngOnInit() {
    console.log(this.oldProjet())
    console.log(this.oldService())
    if (this.oldProjet() != undefined) {
      this.formProjet = new FormGroup({
        name: new FormControl(this.oldProjet()!.name, {nonNullable: true, validators: [Validators.required]}),
      });
    } else if (this.oldService() !== undefined) {
      this.formService = new FormGroup({
        name: new FormControl(this.oldService()!.name, {nonNullable: true, validators: [Validators.required]}),
        image: new FormControl(this.oldService()!.image, {nonNullable: true}),
        ports: new FormArray<FormControl<string>>(
          this.oldService()!.ports.map(port => new FormControl(port, {nonNullable: true, validators: [Validators.required]})))
      });
    }
  }

  get portsArray(): FormArray<FormControl<string>> {
    return this.formService.controls['ports'] as FormArray<FormControl<string>>;
  }


  public getType(): string {
    if (this.oldProjet() !== undefined) {
      return "Projet";
    } else {
      return "Service";
    }
  }

  public getAction():string {
    const projet = this.oldProjet();
    const service = this.oldService();
    if (projet) {
      return projet.name ? 'Modification' : 'Ajout';
    }
    if (service) {
      return service.name ? 'Modification' : 'Ajout';
    }
    return 'Ajout';
  }

  public getButtonName() {
    if (this.getAction() == 'Modification') {
      return 'Modifier';
    } else {
      return 'Ajouter';
    }
  }

  addPort = () => {
    this.portsArray.push(new FormControl('', {nonNullable: true}));
  }


  public Submit() {
    let obj: ProjetModel | ServiceModel;

    if (this.getType() === 'Projet') {
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
    if(this.oldService()){
      obj.id = this.oldService()!.id
    }if(this.oldProjet()){
      obj.id = this.oldProjet()!.id
    }
    this.myObj.emit(obj);
  }

  public closePopupSubmit() {
    this.closePopup.emit()
  }
}
