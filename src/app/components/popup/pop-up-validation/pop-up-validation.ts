import {Component, input, output, signal} from '@angular/core';
import {Buttons} from '../../buttons/buttons';
import {type ServiceModel, isService} from '../../../models/service-model';
import {type ProjetModel, isProjet} from '../../../models/projet-model';

@Component({
  selector: 'app-pop-up-validation',
  imports: [
    Buttons,
  ],
  templateUrl: './pop-up-validation.html',
  styleUrl: './pop-up-validation.css',
})
export class PopUpValidation {

  type = input.required<"Service" | "Projet">()
  oldObject = input.required<ServiceModel | ProjetModel>()
  newObject = input.required<ServiceModel | ProjetModel>()

  oldPorts = signal<string[]>([])
  newPorts = signal<string[]>([])
  loading = signal<boolean>(false);
  closePopup = output<void>()
  validPopup = output<void>()

  forceServiceType(obj: ServiceModel | ProjetModel): ServiceModel {
    return obj as ServiceModel
  }

  ngOnInit() {
    if(this.type() === "Projet" && !(isProjet(this.oldObject()) || isProjet(this.newObject()) )) {
      throw new Error('Invalid projet type');
    } else if(this.type() === "Service" && !(isService(this.oldObject()) || isService(this.newObject()) )) {
      throw new Error('Invalid service type');
    } else if(this.type() === "Service") {
      (this.oldObject() as ServiceModel).Ports.forEach((port) => {
        if(!(this.newObject() as ServiceModel).Ports.includes(port)) {
          this.oldPorts.update(ports => [...ports, port])
        }
      });
      (this.newObject() as ServiceModel).Ports.forEach((port) => {
        if(!(this.oldObject() as ServiceModel).Ports.includes(port)) {
          this.newPorts.update(ports => [...ports, port])
        }
      });
    }
  }

  onClosePopup(){
    this.loading.set(true)
    this.closePopup.emit()
    this.loading.set(false)
  }

  onValidPopup(){
    this.loading.set(true)
    this.validPopup.emit()
    this.loading.set(false)
  }

}
