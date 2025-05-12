import { Component, inject, signal, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from 'src/app/shared/services/api.service';
import { GetCutOffDates } from 'src/app/shared/interfaces/get/get-cut-off-dates.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cut-off-dates',
  imports: [TableModule, DatePipe],
  templateUrl: './cut-off-dates.component.html',
  styleUrl: './cut-off-dates.component.scss'
})
export default class CutOffDatesComponent implements OnInit {
  api = inject(ApiService);
  dates = signal<GetCutOffDates[]>([]);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCutOffDates();
  }

  getCutOffDates(): void {
    this.api.getCutOffDates().then(res => {
      console.log(res.data);
      res.data.forEach(date => {
        date.stateClass = date.estado === 'ABIERTO' ? 'bg-green-500' : date.estado === 'CERRADO' ? 'bg-red-500' : 'bg-orange-500';
        date.estadoCase = date.estado.charAt(0).toUpperCase() + date.estado.slice(1).toLowerCase();
      });
      this.dates.set(res.data);
    });
  }
}
