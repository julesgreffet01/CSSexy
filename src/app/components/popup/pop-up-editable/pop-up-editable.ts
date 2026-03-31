import {Component, inject, input, output, signal} from '@angular/core';
import {Inputs} from '../../inputs/inputs';
import {Buttons} from '../../buttons/buttons';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProjetModel} from '../../../models/projet-model';
import type {ServiceModel} from '../../../models/service-model';
import { ServiceAuth } from '../../../core/services/service-auth';
import { UtilisateurModel } from '../../../models/utilisateur-model';

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
  serviceAuth = inject(ServiceAuth);


  oldProjet = input<ProjetModel>()
  oldService = input<ServiceModel>()


  formProjet!: FormGroup;
  formService!: FormGroup;

  formErrors: string[] = []
  formErrorsOutput = output<string[]>()
  currentUser = signal<UtilisateurModel | undefined>(undefined);

  ngOnInit() {
    if (this.oldProjet() != undefined) {
      this.serviceAuth.getUser().subscribe({
        next: (user) => {
          this.currentUser.set(user);
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", err);
        },
      });
      this.formProjet = new FormGroup({
        Name: new FormControl(this.oldProjet()!.Name, {nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
      });
    } else if (this.oldService() !== undefined) {
      this.formService = new FormGroup({
        Name: new FormControl(this.oldService()!.Name, {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
        Image: new FormControl(this.oldService()!.Image, {nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.pattern('^[^:]+:[^:]+$')]}),
        Ports: new FormArray<FormControl<string | null>>(
          this.oldService()!.Ports.map(port => new FormControl(port, {nonNullable: false, validators: [Validators.pattern('^[1-9]\\d*:[1-9]\\d*$')]})))
      });
    }
  }

  get portsArray(): FormArray<FormControl<string | null>> {
    return this.formService.controls['Ports'] as FormArray<FormControl<string | null>>;
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
      return projet.Name ? 'Modification' : 'Ajout';
    }
    if (service) {
      return service.Name ? 'Modification' : 'Ajout';
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
    this.portsArray.push(new FormControl('', {nonNullable: false, validators: [Validators.pattern('^[1-9]\\d*:[1-9]\\d*$')]}));
  }


  public Submit() {
    let obj: ProjetModel | ServiceModel;

    if (this.getType() === 'Projet') {
      this.formProjet.markAllAsTouched();
      if(this.formProjet.valid) {
        obj = {
          Id: this.oldProjet()!.Id,
          Name: this.formProjet.value.Name,
          User: this.currentUser(),
          CreatedAt: new Date()
        };
      } else {
        if(this.formProjet.get('Name')?.hasError('required')){
          this.formErrors.push("le nom est requis");
        }
        if(this.formProjet.get('Name')?.hasError('maxlength')){
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
        for (const element of this.formService.value.Ports) {
          if (element.trim() !== "") {
            if (!realport.includes(element)) {
              realport.push(element);
            } else {
              this.formErrors.push(`le port ${element} est deja dans ce service`);

              const errors = this.formErrors;
              this.formErrors = [];
              this.formErrorsOutput.emit(errors);
              return;
            }
          }
        }
        obj = {
          Uuid: this.oldService()?.Uuid ?? '0',
          Name: this.formService.value.Name,
          Image: this.formService.value.Image,
          Status: "starting",
          StartedSince: new Date(),
          Ports: realport
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
        if(this.formService.get('Name')?.hasError('required')){
          this.formErrors.push("le nom est requis");
        }
        if(this.formService.get('Name')?.hasError('maxlength')){
          this.formErrors.push("le nombre de caractères max sur le nom est de 100");
        }
        if(this.formService.get('Image')?.hasError('required')){
          this.formErrors.push("l'image est requis");
        }
        if(this.formService.get('Image')?.hasError('maxLength')){
          this.formErrors.push("le nombre sur de caractères max l'image est de 100");
        }
        if(this.formService.get('Image')?.hasError('pattern')){
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
    this.myObj.emit(obj);
  }

  public closePopupSubmit() {
    this.closePopup.emit()
  }
}
