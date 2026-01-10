import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-tab',
  imports: [],
  templateUrl: './status-tab.html',
  styleUrl: './status-tab.css',
})
export class StatusTab {
  

   status = input.required<"UP" | "DOWN" | "STARTING" | "STOP">();

  
}
