import { Component, signal, computed, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputComponent } from '../../../../../../shared/components/custom-fields/input/input.component';
import { SelectComponent } from '../../../../../../shared/components/custom-fields/select/select.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MultiselectInstanceComponent } from '../../../../../../shared/components/custom-fields/multiselect-instance/multiselect-instance.component';
import { InputTextModule } from 'primeng/inputtext';

interface UserFormData {
  is_cgiar: boolean | null;
  first_name: string | null;
  last_name: string | null;
  organizacion_id: number | null;
  email: string | null;
  role_id: Role[] | null;
  eje_id: number | null;
}

interface Role {
  id: number;
  name: string;
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
    MultiselectInstanceComponent,
    InputTextModule
  ],
  providers: [MessageService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @ViewChild('roleMultiselect') roleMultiselect?: MultiselectInstanceComponent;
  @ViewChild('ejeSelect') ejeSelect?: SelectComponent;
  @ViewChild('emailInput') emailInput?: InputComponent;

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
    role_id: [],
    eje_id: 1
  });

  formTitle = computed(() => (this.isEditing() ? 'Editar usuario' : 'Crear usuario'));
  submitButtonLabel = computed(() => (this.isEditing() ? 'Actualizar' : 'Crear'));

  isFormValid = computed(() => {
    const data = this.body();
    return (
      data.is_cgiar !== null &&
      data.first_name &&
      data.last_name &&
      data.organizacion_id &&
      data.email &&
      data.role_id &&
      data.eje_id
    );
  });

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

    this.body.set({
      is_cgiar: null,
      first_name: null,
      last_name: null,
      organizacion_id: null,
      email: null,
      role_id: [],
      eje_id: null
    });

    setTimeout(() => {
      this.loaded.set(true);
    }, 0);
  }

  async submitForm() {
    // Borrar
    this.body.update(data => ({
      ...data,
      eje_id: 1
    }));
    // Borrar

    // Check if all fields are filled
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
      return;
    }

    // Validate email first
    if (this.emailInput && !this.emailInput.inputValid().valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: this.emailInput.inputValid().message || 'El correo electrónico no es válido'
      });
      return;
    }

    try {
      this.isLoading.set(true);
      // Here you would call your service to create/update the user

      const sendData = {
        ...this.body(),
        role_id: this.body()
          .role_id?.map((role: Role) => role.id)
          .join(',')
      };

      console.log(sendData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: this.isEditing()
          ? 'Usuario actualizado correctamente'
          : 'Usuario creado correctamente. Se ha enviado una contraseña al correo proporcionado.'
      });

      this.closeDrawer();
    } catch (err) {
      console.error('Error creating/updating user:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ha ocurrido un error al procesar la solicitud'
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  clearDynamicFields(value: boolean) {
    if (value !== this.body().is_cgiar) return;

    this.body.update(data => ({ ...data, organizacion_id: null, role_id: [], eje_id: null }));

    setTimeout(() => {
      if (this.roleMultiselect) {
        this.roleMultiselect.body.set({ value: [] });
      }
      if (this.ejeSelect) {
        this.ejeSelect.body.set({ value: null });
        // Force refresh the instance list with empty roles
        this.ejeSelect.getListInstance();
      }
    }, 0);
  }

  clearRolesField() {
    // Clear role_id and eje_id when organization changes
    this.body.update(data => ({ ...data, role_id: [], eje_id: null }));

    // Update the multiselect component display
    setTimeout(() => {
      if (this.roleMultiselect) {
        this.roleMultiselect.body.set({ value: [] });
      }
      if (this.ejeSelect) {
        this.ejeSelect.body.set({ value: null });
        // Force refresh the instance list
        this.ejeSelect.getListInstance();
      }
    }, 0);
  }

  clearEjeField() {
    // Clear eje_id when roles change
    this.body.update(data => ({ ...data, eje_id: null }));

    // Force refresh the eje dropdown with the new roles
    setTimeout(() => {
      if (this.ejeSelect) {
        this.ejeSelect.body.set({ value: null });
        // Force refresh the instance list
        this.ejeSelect.getListInstance();
      }
    }, 0);
  }
}
