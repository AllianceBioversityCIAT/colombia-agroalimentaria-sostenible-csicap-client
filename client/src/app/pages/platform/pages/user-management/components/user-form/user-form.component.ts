import {
  Component,
  signal,
  computed,
  ViewChild,
  inject,
  Output,
  EventEmitter
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputComponent } from '../../../../../../shared/components/custom-fields/input/input.component';
import { SelectComponent } from '../../../../../../shared/components/custom-fields/select/select.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../../../../../shared/services/api.service';

export interface UserFormData {
  is_cgiar: boolean | null;
  first_name: string | null;
  last_name: string | null;
  organizacion_id: number | null;
  email: string | null;
  role_id: number | null;
  eje_id?: number | null;
}

@Component({
  selector: 'app-user-form',
  imports: [
    DrawerModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    InputComponent,
    SelectComponent,
    ToastModule,
    InputTextModule
  ],
  providers: [MessageService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @ViewChild('roleSelect') roleSelect?: SelectComponent;
  @ViewChild('ejeSelect') ejeSelect?: SelectComponent;
  @ViewChild('emailInput') emailInput?: InputComponent;
  @Output() userCreated = new EventEmitter<void>();

  visible = signal(false);
  isLoading = signal(false);
  isEditing = signal(false);
  loaded = signal(true);
  body = signal<UserFormData>({
    is_cgiar: null,
    first_name: null,
    last_name: null,
    organizacion_id: null,
    email: null,
    role_id: null,
    eje_id: null
  });

  formTitle = computed(() => (this.isEditing() ? 'Editar usuario' : 'Crear usuario'));
  submitButtonLabel = computed(() => (this.isEditing() ? 'Actualizar' : 'Crear'));

  isFormValid = computed(() => {
    const data = this.body();
    const hasEjeOptions = (this.ejeSelect?.listInstance() ?? []).length > 0;
    const needsEje = data.role_id && data.role_id > 0 && hasEjeOptions;

    return (
      data.is_cgiar !== null &&
      data.first_name &&
      data.last_name &&
      data.organizacion_id &&
      data.email &&
      data.role_id &&
      data.role_id > 0 &&
      (!needsEje || data.eje_id !== null)
    );
  });

  api = inject(ApiService);

  constructor(private messageService: MessageService) {}

  openDrawer(userData?: UserFormData) {
    if (userData) {
      this.isEditing.set(true);
      this.body.set(userData);
    } else {
      this.isEditing.set(false);
      this.resetForm();
    }
    this.visible.set(true);
  }

  closeDrawer() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.loaded.set(false);

    setTimeout(() => {
      this.loaded.set(true);
    }, 0);

    this.body.set({
      is_cgiar: null,
      first_name: null,
      last_name: null,
      organizacion_id: null,
      email: null,
      role_id: null,
      eje_id: null
    });
  }

  async submitForm() {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos',
        key: 'br'
      });
      return;
    }

    if (this.emailInput && !this.emailInput.inputValid().valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formato de correo inconrrecto',
        detail:
          this.emailInput.inputValid().message ||
          'El correo electrónico ingresado no tiene un formato válido. ',
        key: 'br'
      });
      return;
    }

    this.isLoading.set(true);

    const sendData = {
      ...this.body(),
      role_id: this.body().role_id
    };

    const res = await this.api.createUser(sendData);

    if (res?.status !== 200) {
      console.error('Error creating/updating user:', res.error?.description);
      this.messageService.add({
        severity: 'error',
        summary: 'Error de creación',
        detail: res.error?.errors,
        key: 'br'
      });
      this.isLoading.set(false);
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Usuario creado éxitosamente',
      detail: this.isEditing()
        ? 'Usuario actualizado correctamente'
        : 'El usuario ha sido creado exitosamente en el sistema',
      key: 'br'
    });

    this.isLoading.set(false);
    this.userCreated.emit();
    this.closeDrawer();
  }

  clearDynamicFields(value: boolean) {
    if (value !== this.body().is_cgiar) return;

    this.body.update(data => ({ ...data, organizacion_id: null, role_id: null, eje_id: null }));

    setTimeout(() => {
      if (this.roleSelect) {
        this.roleSelect.body.set({ value: null });
      }

      if (this.ejeSelect) {
        this.ejeSelect.body.set({ value: null });
      }
    }, 0);
  }

  clearRolesField() {
    this.body.update(data => ({ ...data, role_id: null, eje_id: null }));

    setTimeout(() => {
      if (this.roleSelect) {
        this.roleSelect.body.set({ value: null });
      }
      if (this.ejeSelect) {
        console.log(this.ejeSelect.body());
      }
    }, 0);
  }

  clearEjeField() {
    this.body.update(data => ({ ...data, eje_id: null }));

    setTimeout(() => {
      if (this.ejeSelect) {
        this.ejeSelect.body.set({ value: null });
      }
    }, 0);
  }
}
