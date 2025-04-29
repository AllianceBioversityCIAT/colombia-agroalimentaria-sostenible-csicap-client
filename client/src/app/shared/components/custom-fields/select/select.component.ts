/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
  Output,
  EventEmitter
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlListServices } from '../../../interfaces/services.interface';
import { ServiceLocatorService } from '../../../services/service-locator.service';
import { CacheService } from '../../../services/cache/cache.service';
import { SkeletonModule } from 'primeng/skeleton';
import { UtilsService } from '../../../services/utils.service';
import { environment } from '../../../../../environments/environment';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { AllModalsService } from '../../../services/cache/all-modals.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, SkeletonModule, TooltipModule, SelectModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, OnChanges {
  currentResultIsLoading = inject(CacheService).currentResultIsLoading;
  utils = inject(UtilsService);
  @Input() signal: WritableSignal<any> = signal({});
  @Input() optionLabel = '';
  @Input() optionLabel2 = '';
  @Input() optionValue = { body: '', option: '' };
  @Input() serviceName: ControlListServices = '';
  @Input() label = '';
  @Input() description = '';
  @Input() showPartnerRequestDescription = false;
  @Input() disabled = false;
  @Input() isRequired = false;
  @Input() placeholder = '';
  @Input() flagAttributes: { isoAlpha2: string; institution_location_name: string } = {
    isoAlpha2: '',
    institution_location_name: ''
  };
  @Output() valueChange = new EventEmitter<any>();

  @Input() endpointParams: any = null;
  listInstance = signal<any[]>([]);
  loadingList = signal(false);
  allModalsService = inject(AllModalsService);

  service: any;
  body: WritableSignal<any> = signal({ value: null });
  environment = environment;

  isInvalid = computed(() => {
    return this.isRequired && !this.body()?.value;
  });

  constructor(private serviceLocator: ServiceLocatorService) {}

  onSectionLoad = effect(() => {
    if (!this.currentResultIsLoading())
      this.body.update(current => {
        this.utils.setNestedPropertyWithReduce(
          current,
          'value',
          this.utils.getNestedProperty(this.signal(), this.optionValue.body)
        );
        return { ...current };
      });
  });

  ngOnInit(): void {
    this.service = this.serviceLocator.getService(this.serviceName);

    // validate if endpointParams child is not null
    if (
      this.endpointParams &&
      Object.keys(this.endpointParams).length > 0 &&
      !Object.values(this.endpointParams).some(value => {
        if (Array.isArray(value)) {
          return value.length === 0;
        }
        return value === null;
      })
    ) {
      this.getListInstance();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['endpointParams'] &&
      !changes['endpointParams'].firstChange &&
      this.service &&
      !Object.values(this.endpointParams).some(value => {
        if (Array.isArray(value)) {
          return value.length === 0;
        }
        return value === null;
      })
    ) {
      this.getListInstance();
    }
  }

  getListInstance = async () => {
    this.loadingList.set(true);
    const signal = await this.service.getInstance(this.endpointParams);
    this.listInstance.set(signal());
    this.loadingList.set(false);
  };

  onFilter(event: any) {
    if (this.service?.isOpenSearch()) this.service.update(event.filter);
  }

  setValue(value: any) {
    this.body.set({ value: value });
    this.utils.setNestedPropertyWithReduceSignal(this.signal, this.optionValue.body, value);
    this.valueChange.emit(value);
  }
}
