import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {ServiceModel} from '../../models/service-model';
import {serviceServices} from '../../core/services/service-services';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {PopUpEditable} from '../../components/popup/pop-up-editable/pop-up-editable';
import {Location} from '@angular/common'
import { PopUpValidation } from "../../components/popup/pop-up-validation/pop-up-validation";
import { ProjetModel } from '../../models/projet-model';
import { PopUpError } from '../../components/popup/pop-up-error/pop-up-error'
import { UtilisateurModel } from '../../models/utilisateur-model';
import { ServiceAuth } from '../../core/services/service-auth';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-detail-service-page',
  standalone: true,
  imports: [
    CommonModule,
    PopUpEditable,
    PopUpValidation,
    PopUpError,
    AsyncPipe
  ],
  templateUrl: './detail-service-page.html',
  styleUrl: './detail-service-page.css',
})
export class DetailServicePage {
  private cpuChartRef?: ElementRef<HTMLCanvasElement>;
  private ramChartRef?: ElementRef<HTMLCanvasElement>;
  private diskChartRef?: ElementRef<HTMLCanvasElement>;

  private cpuChartInstance: Chart | null = null;
  private ramChartInstance: Chart | null = null;
  private diskChartInstance: Chart | null = null;


  @ViewChild('cpuChart')
  set cpuChart(el: ElementRef<HTMLCanvasElement> | undefined) {
    if (!el) return;

    queueMicrotask(() => {
      this.cpuChartInstance = this.createChart(el, this.cpuChartInstance, 'CPU');
    });
  }

  @ViewChild('ramChart')
  set ramChart(el: ElementRef<HTMLCanvasElement> | undefined) {
    if (!el) return;
    queueMicrotask(() => {
      this.ramChartInstance = this.createChart(el, this.ramChartInstance, 'RAM');
    });
  }

  @ViewChild('diskChart')
  set diskChart(el: ElementRef<HTMLCanvasElement> | undefined) {
    if (!el) return;
    queueMicrotask(() => {
      this.diskChartInstance = this.createChart(el, this.diskChartInstance, 'DISK');
    });
  }

  serviceService = inject(serviceServices);
  route = inject(ActivatedRoute);
  currentService = signal<ServiceModel | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);
  modalUpdate = signal<boolean>(false);

  private idService = signal<string | null>(null)

  private location = inject(Location);

  validateModal = signal(false)
  modalDelete = signal(false)
  newService = signal<ServiceModel | null>(null)

  user$: Observable<UtilisateurModel>
  authService = inject(ServiceAuth)

  errorForms = signal<string[] | null>(null);
  errorFormModal = signal<boolean>(false);


  private router = inject(Router)

  service = signal<ServiceModel | null>(null)

  constructor(){
    this.user$ = this.authService.getUser()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.serviceService.getServices(id).subscribe({
          next: (service) => {
            this.currentService.set(service);
            this.idService.set(service?.id ?? null)
            this.loading.set(false);
            if(service){
              this.service.set(service)
            } else {
              throw Error('Service not found');
            }
          },
          error: (err) => {
            this.errorProject.set(true);
            this.loading.set(false);
          },
        });
      }

    });
  }
  goBack(){
    this.location.back();
  }

  onUpdateService() {
    this.modalUpdate.set(true);
  }

  closeModalUpdate() {
    this.modalUpdate.set(false);
  }

  initNewService(newService: ServiceModel | ProjetModel){
    this.newService.set(newService as ServiceModel)
    this.modalUpdate.set(false);
    this.validateModal.set(true);
  }

  onDeleteService() {
    this.serviceService.deleteService(this.currentService()!.id).subscribe({
      next: value => {
        this.router.navigate(['/projects']) //todo a changer pour la prod car on aura l id du projet
      }
    })

  }

  closePopupValidate(){
    this.validateModal.set(false)
  }

  updateService(){
    this.serviceService.updateService(this.newService()!).subscribe({
      next: service => {
        this.currentService.set(this.newService()!)
        this.newService.set(null)
        this.validateModal.set(false)
      },
      error: err => {

      }
    })
  }

  closeModalDelete(){
    this.modalDelete.set(false)
  }

    showModalDelete(){
    this.modalDelete.set(true)
  }

  formErrorsShow(errors: string[]){
    this.errorForms.set(errors)
    this.errorFormModal.set(true);
  }

  closeFormError(){
    this.errorForms.set(null)
    this.errorForms.set(null);
    this.errorFormModal.set(false);
  }

  private createChart(chartRef: ElementRef<HTMLCanvasElement>, existing: Chart | null, label: string): Chart {

    existing?.destroy();
      const labels = this.getLastHours(8);
      const dataValues = this.getRandomData(8, 1, 100);

      const ctx = chartRef.nativeElement.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      return new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label,
            data: dataValues,
            fill: true,
            pointRadius: 2,
            borderColor: 'rgba(146, 84, 156 ,1)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#f9fafb',
                font: {
                  size: 14,
                  weight: 'bold',
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#f9fafb',
                font: {
                  size: 12,
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0)', // VERTI
              }
            },
            y: {
              ticks: {
                color: '#f9fafb',
                font: {
                  size: 12,
                }
              },
              grid: {
                color: 'rgba(249, 250, 251, 0.2)', // HORIZ
              }
            }
          }
        }
      });
    }
  private getLastHours(count: number): string[] {
    const result: string[] = [];
    const now = new Date();

    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      result.push(`${d.getHours()}h`);
    }

    return result;
  }

  private getRandomData(count: number, min = 1, max = 100): number[] {
    return Array.from({ length: count }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  }
}


