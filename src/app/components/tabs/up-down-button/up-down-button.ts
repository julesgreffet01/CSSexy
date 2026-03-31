import { Component, effect, inject, input, output, signal } from '@angular/core';
import { serviceServices } from '../../../core/services/service-services';

@Component({
  selector: 'app-up-down-button',
  imports: [],
  
  templateUrl: './up-down-button.html',
  styleUrl: './up-down-button.css',
})

export class UpDownButton {
  Service = inject(serviceServices);

  InitStat = input<boolean>(true);
  uuid = input<string>("");
  toggle = output<boolean>();
  
  protected UpDownStat = signal<boolean>(true);
  

  constructor() {
    effect(() => {
      this.UpDownStat.set(this.InitStat());
    });
  }

  SwitchState() {
  this.UpDownStat.update(v => {
    const next = !v;
    if (next) {
      this.Service.startService(this.uuid()).subscribe({
        next: () => {
          console.log('Service started successfully.');
        },
        error: (err) => {
          console.error('Failed to start service:', err);
        }
      });
    } else {
      this.Service.stopService(this.uuid()).subscribe({
        next: () => {
          console.log('Service stopped successfully.');
        },
        error: (err) => {
          console.error('Failed to stop service:', err);
        }
      });
    }
    this.toggle.emit(next);
    return next;
  });
}
}
