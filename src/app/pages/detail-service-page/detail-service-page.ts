import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ServiceModel } from '../../models/service-model';
import { serviceServices } from '../../core/services/service-services';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpEditable } from '../../components/popup/pop-up-editable/pop-up-editable';
import { Location } from '@angular/common';
import { PopUpValidation } from "../../components/popup/pop-up-validation/pop-up-validation";
import { ProjetModel } from '../../models/projet-model';
import { PopUpError } from '../../components/popup/pop-up-error/pop-up-error';
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
    AsyncPipe,
  ],
  templateUrl: './detail-service-page.html',
  styleUrl: './detail-service-page.css',
})
export class DetailServicePage {
  private cpuChartRef?: ElementRef<HTMLCanvasElement>;
  private ramChartRef?: ElementRef<HTMLCanvasElement>;


  private cpuChartInstance: Chart | null = null;
  private ramChartInstance: Chart | null = null;


  @ViewChild('cpuChart')
  set cpuChart(el: ElementRef<HTMLCanvasElement> | undefined) {
    if (!el) return;
    this.cpuChartRef = el;
    this.RenderCharts();
  }

  @ViewChild('ramChart')
  set ramChart(el: ElementRef<HTMLCanvasElement> | undefined) {
    if (!el) return;
    this.ramChartRef = el;
    this.RenderCharts();
  }


  serviceService = inject(serviceServices);
  route = inject(ActivatedRoute);
  currentService = signal<ServiceModel | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);
  modalUpdate = signal<boolean>(false);

  private idService = signal<string | null>(null);

  private location = inject(Location);

  validateModal = signal(false);
  modalDelete = signal(false);
  newService = signal<ServiceModel | null>(null);

  user$: Observable<UtilisateurModel>;
  authService = inject(ServiceAuth);

  errorForms = signal<string[] | null>(null);
  errorFormModal = signal<boolean>(false);

  dataArray: any[] = [];

  private router = inject(Router);

  service = signal<ServiceModel | null>(null);

  constructor() {
    this.user$ = this.authService.getUser();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const uuid = params.get('id');
      if (!uuid) return;

      this.serviceService.getServices(uuid).subscribe({
        next: (service) => {
          this.currentService.set(service.Data);
          this.idService.set(service.Data.Uuid);
          this.serviceService.serviceMonitoring(this.idService()!).subscribe({
            next: (monitoring) => {
              console.log(monitoring);
              this.dataArray = monitoring.Data ?? [];

              console.log(this.dataArray);

              this.RenderCharts();
              this.loading.set(false);
            },
            error: (err) => {
              this.errorProject.set(true);
              this.loading.set(false);
            }
          });

          if (service) {
            this.service.set(service);
          } else {
            throw Error('Service not found');
          }
        },
        error: (err) => {
          this.errorProject.set(true);
          this.loading.set(false);
        },
      });
    });
  }

  private RenderCharts(): void {
    if (!this.dataArray.length) return;

    const cpuData = this.getMonitoringByLabel('CPU');
    const ramData = this.getMonitoringByLabel('RAM');
 

    if (this.cpuChartRef) {
      this.cpuChartInstance = this.createChart(this.cpuChartRef, this.cpuChartInstance, 'CPU', cpuData);
    }

    if (this.ramChartRef) {
      this.ramChartInstance = this.createChart(this.ramChartRef, this.ramChartInstance, 'RAM', ramData);
    }

  }

  private getMonitoringByLabel(label: string): any[] {
    return this.dataArray
      .filter(item => item?.monitoringId?.monitoringId?.libelle === label)
      .sort((a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime());
  }

  goBack() {
    this.location.back();
  }

  onUpdateService() {
    this.modalUpdate.set(true);
  }

  closeModalUpdate() {
    this.modalUpdate.set(false);
  }

  initNewService(newService: ServiceModel | ProjetModel) {
    this.newService.set(newService as ServiceModel);
    this.modalUpdate.set(false);
    this.validateModal.set(true);
  }

  onDeleteService() {
    this.serviceService.deleteService(this.currentService()!.Uuid).subscribe({
      next: value => {
        this.router.navigate(['/projects']);
      }
    });
  }

  closePopupValidate() {
    this.validateModal.set(false);
  }

  updateService() {
    this.serviceService.updateService(this.newService()!).subscribe({
      next: service => {
        this.currentService.set(this.newService()!);
        this.newService.set(null);
        this.validateModal.set(false);
      },
      error: err => {

      }
    });
  }

  closeModalDelete() {
    this.modalDelete.set(false);
  }

  showModalDelete() {
    this.modalDelete.set(true);
  }

  formErrorsShow(errors: string[]) {
    this.errorForms.set(errors);
    this.errorFormModal.set(true);
  }

  closeFormError() {
    this.errorForms.set(null);
    this.errorForms.set(null);
    this.errorFormModal.set(false);
  }

  private createChart(
    chartRef: ElementRef<HTMLCanvasElement>,
    existing: Chart | null,
    label: string,
    monitoringData: any[]
  ): Chart {
    existing?.destroy();

    const labels = monitoringData.map(item =>
      new Date(item.measured_at).toLocaleTimeString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    );

    const dataValues = monitoringData.map(item => item.value);

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
          borderColor: 'rgba(146, 84, 156 ,1)',
          backgroundColor: 'rgba(146, 84, 156, 0.2)',
          tension: 0.3
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
              color: 'rgba(0, 0, 0, 0)',
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
              color: 'rgba(249, 250, 251, 0.2)',
            }
          }
        }
      }
    });
  }
}