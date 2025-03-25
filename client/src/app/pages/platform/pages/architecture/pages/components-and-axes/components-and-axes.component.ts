import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';

interface ComponentAxis {
  component: string;
  componentDescription: string;
  axis: string;
  axisDescription: string;
}

@Component({
  selector: 'app-components-and-axes',
  standalone: true,
  imports: [TableModule, ButtonModule, SectionHeaderComponent],
  templateUrl: './components-and-axes.component.html',
  styleUrls: ['./components-and-axes.component.scss']
})
export default class ComponentsAndAxesComponent implements OnInit {
  components: ComponentAxis[] = [];

  ngOnInit() {
    this.components = [
      {
        component: 'Componente 1',
        componentDescription:
          'Agricultura digital y servicios climáticos para la modernización de servicios de extensión agropecuaria con énfasis en adaptación y mitigación.',
        axis: 'Eje 1',
        axisDescription: 'Fortalecimiento y modernización sistema de extensión agropecuaria dirigido a la adaptación y mitigación.'
      },
      {
        component: 'Componente 1',
        componentDescription:
          'Agricultura digital y servicios climáticos para la modernización de servicios de extensión agropecuaria con énfasis en adaptación y mitigación.',
        axis: 'Eje 2',
        axisDescription:
          'Brindar apoyo a la toma de decisiones a nivel de productores y evitar pérdidas en los sistemas productivos a través del diseño o fortalecimiento de servicios de información climática.'
      },
      {
        component: 'Componente 2',
        componentDescription:
          'Mejoramiento genético, técnicas de manejo de cultivos, opciones tecnológicas, escalamiento para aumentar resiliencia y propiciar un desarrollo agropecuario bajo en carbono.',
        axis: 'Eje 3',
        axisDescription:
          'Banco de semillas fortalecidas, nuevas variedades resistentes al clima desarrolladas y sus semillas distribuidas masivamente.'
      },
      {
        component: 'Componente 2',
        componentDescription:
          'Mejoramiento genético, técnicas de manejo de cultivos, opciones tecnológicas, escalamiento para aumentar resiliencia y propiciar un desarrollo agropecuario bajo en carbono.',
        axis: 'Eje 4',
        axisDescription:
          'Técnicas de manejo de cultivos específicas del sitio y opciones tecnológicas eficientes en el uso del agua y bajas en carbono validadas.'
      },
      {
        component: 'Componente 3',
        componentDescription:
          'Modelos de negocio innovadores e inclusivos mediante sistemas de innovación modernizados y un sector financiero más comprometido.',
        axis: 'Eje 5',
        axisDescription: 'Modelos de negocio novedosos e inclusivos para el sector privado agropecuario.'
      },
      {
        component: 'Componente 3',
        componentDescription:
          'Modelos de negocio innovadores e inclusivos mediante sistemas de innovación modernizados y un sector financiero más comprometido.',
        axis: 'Eje 6',
        axisDescription: 'Servicios de asistencia técnica y extensión agrícola modernizados.'
      },
      {
        component: 'Componente transversal',
        componentDescription:
          'Componente para la evaluación de impacto y el monitoreo de la ejecución. Además, incluye actividades orientadas a generar impacto social, ambiental y de género.',
        axis: 'Eje 7',
        axisDescription: 'Estará a cargo de recopilar información de diferentes fuentes y realizar análisis de seguimiento periódicos.'
      },
      {
        component: 'Componente transversal',
        componentDescription:
          'Componente para la evaluación de impacto y el monitoreo de la ejecución. Además, incluye actividades orientadas a generar impacto social, ambiental y de género.',
        axis: 'Eje 8',
        axisDescription:
          'Busca contribuir al cierre de las brechas de género en las cadenas productivas priorizadas y promover el acceso equitativo de hombres y mujeres productoras con diferentes condiciones socioeconómicas a los servicios bienes y actividades del Proyecto, incluyendo el acceso a información agroclimática, así como tecnologías y prácticas de producción sostenible y resiliente.'
      }
    ];
  }
}
