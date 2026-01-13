import {Component, input, output, signal} from '@angular/core';
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

  formErrors: string[] = []
  formErrorsOutput = output<string[]>()

  ngOnInit() {
    if (this.oldProjet() != undefined) {
      this.formProjet = new FormGroup({
        name: new FormControl(this.oldProjet()!.name, {nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
      });
    } else if (this.oldService() !== undefined) {
      this.formService = new FormGroup({
        name: new FormControl(this.oldService()!.name, {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
        image: new FormControl(this.oldService()!.image, {nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.pattern('^[^:]+:[^:]+$')]}),
        ports: new FormArray<FormControl<string | null>>(
          this.oldService()!.ports.map(port => new FormControl(port, {nonNullable: false, validators: [Validators.pattern('^[1-9]\\d*:[1-9]\\d*$')]})))
      });
    }
  }

  get portsArray(): FormArray<FormControl<string>> {
    return this.formService.controls['ports'] as FormArray<FormControl<string>>;
  }


  public getType(): 'Projet' | 'Service' {
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
      this.formProjet.markAllAsTouched();
      if(this.formProjet.valid) {
        obj = {
          id: this.oldProjet()?.id ?? 0,
          name: this.formProjet.value.name,
          services: [],
          createdAt: new Date()
        };
      } else {
        console.log('error sur le form projet')
        if(this.formProjet.get('name')?.hasError('required')){
          this.formErrors.push("le nom est requis");
        }
        if(this.formProjet.get('name')?.hasError('maxlength')){
          this.formErrors.push("le nombre de caractères max est de 200");
        }
        const errors = this.formErrors
        this.formErrors = []
        this.formErrorsOutput.emit(errors);
        return
      }
    } else if(this.getType() === 'Service') {
      this.formService.markAllAsTouched();
      if(this.formService.valid) {
        const realport: string[] = [];
        for (const element of this.formService.value.ports) {
          if (element.trim() !== "") {
            if (!realport.includes(element)) {
              realport.push(element);
            } else {
              this.formErrors.push(`le port ${element} est deja dans ce service`);

              const errors = this.formErrors;
              this.formErrors = [];
              this.formErrorsOutput.emit(errors);
              return; // ✅ sort bien de Submit()
            }
          }
        }
        obj = {
          id: this.oldService()?.id ?? '0',
          name: this.formService.value.name,
          image: this.formService.value.image,
          status: "STARTING",
          startedSince: new Date(),
          ports: realport
        };
      } else {
        const portsArray = this.formService.controls['ports'] as FormArray<FormControl<string>>;

        portsArray.controls.forEach((control, index) => {
          if (control.hasError('pattern')) {
            this.formErrors.push(
              `Port ${index + 1} invalide : "${control.value}". Le format attendu est number:number`
            );
          }
        });
        if(this.formService.get('name')?.hasError('required')){
          this.formErrors.push("le nom est requis");
        }
        if(this.formService.get('name')?.hasError('maxlength')){
          this.formErrors.push("le nombre de caractères max sur le nom est de 100");
        }
        if(this.formService.get('image')?.hasError('required')){
          this.formErrors.push("l'image est requis");
        }
        if(this.formService.get('image')?.hasError('maxLength')){
          this.formErrors.push("le nombre sur de caractères max l'image est de 100");
        }
        if(this.formService.get('image')?.hasError('pattern')){
          this.formErrors.push("le pattern de l'image n est pas bon i doit etre de a forme image:tag");
        }
        const errors = this.formErrors
        this.formErrors = []
        this.formErrorsOutput.emit(errors);
        return
      }
    } else {
      console.error("erreur d envoie a la popup")
      return
    }
    console.log('final')
    this.myObj.emit(obj);
  }

  public closePopupSubmit() {
    this.closePopup.emit()
  }
}
