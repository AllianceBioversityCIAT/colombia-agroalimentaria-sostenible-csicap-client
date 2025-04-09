import { Component, inject, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ApiService } from '../../../../../../shared/services/api.service';
import { TableFichaBpinComponent } from '../../../../../../shared/components/custom-fields/table-ficha-bpin/table-ficha-bpin.component';

interface Activity {
  activityCode: string;
  activity: string;
  subActivityCode: string;
  subActivity: string;
}

interface Tabs {
  title: string;
  value: number;
  activities: Activity[];
}

@Component({
  selector: 'app-bpin-form',
  standalone: true,
  imports: [SectionHeaderComponent, TabViewModule, TableModule, TableFichaBpinComponent],
  templateUrl: './bpin-form.component.html',
  styleUrls: []
})
export default class BpinFormComponent implements OnInit {
  api = inject(ApiService);
  tabs: Tabs[] = [];
  activeIndex = 0;

  tableColumns = [
    { field: 'activityCode', header: 'Codigo Actividad' },
    { field: 'activity', header: 'Actividad' },
    { field: 'subActivityCode', header: 'Codigo de subactividad' },
    { field: 'subActivity', header: 'Subactividad' }
  ];

  ngOnInit() {
    this.getFichaBpin();
    this.tabs = [
      {
        title: 'Objetivo 1',
        value: 0,
        activities: [
          {
            activityCode: '1.1',
            activity: 'Implementación de medidas de bajo consumo de agua como estrategia de adaptación.',
            subActivityCode: '1.1.1',
            subActivity:
              'Priorización de prácticas de uso eficiente de agua urbana, adquisición de materiales, e implementación de parcelas de monitoreo de agua en sistemas convencionales y sostenibles.'
          },
          {
            activityCode: '1.3',
            activity: 'Medición y reducción de GEI para avanzar en la implementación de la NDC.',
            subActivityCode: '1.3.1',
            subActivity:
              'Priorización de prácticas de mitigación al cambio climático, adquisición de materiales, e implementación de parcelas de monitoreo de emisiones de GEI en sistemas convencionales y sostenibles.'
          },
          {
            activityCode: '1.4',
            activity: 'Generar información sobre servicios climáticos para reducir el riesgo agropecuario.',
            subActivityCode: '1.4.1',
            subActivity:
              'Fortalecer el proceso de generación y análisis de información agroclimática para la toma de decisiones en los sistemas agroalimentarios.'
          },
          {
            activityCode: '',
            activity: '',
            subActivityCode: '1.4.2',
            subActivity:
              'Mejorar el desempeño de los modelos de simulación para cultivos, plagas y enfermedades mediante el uso de información experimental obtenida en campo, con el objetivo de lograr predicciones más precisas y confiables.'
          },
          {
            activityCode: '1.5',
            activity: 'Implementar sistemas de agricultura digital.',
            subActivityCode: '1.5.1',
            subActivity: 'Diseñar o fortalecer los servicios de información agroclimática.'
          },
          {
            activityCode: '',
            activity: '',
            subActivityCode: '1.5.2',
            subActivity:
              'Implementar estrategias de captura, monitoreo y análisis de información agroclimática a través de sensores remotos y/o remotos.'
          },
          {
            activityCode: '',
            activity: '',
            subActivityCode: '1.5.3',
            subActivity:
              'Implementar modelos de inteligencia artificial usando información agro-climática para mejorar la toma de decisiones en los sistemas agroalimentarios.'
          },
          {
            activityCode: '1.6',
            activity: 'Realizar monitoreo, evaluación y seguimiento.',
            subActivityCode: '1.6.1',
            subActivity:
              'Realizar monitoreo, evaluación y seguimiento a la generación de oferta tecnológica y conocimiento por parte de los productores para la adaptación y mitigación del cambio climático.'
          }
        ]
      }
    ];
  }

  async getFichaBpin() {
    const res = await this.api.getFichaBpin();
    console.log(res);
  }
}
