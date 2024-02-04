import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormComponentComponent } from './form/form-component/form-component.component';
import { ModalFormComponent } from './modals/modal-form/modal-form.component';
import { ButtonModule } from '../button/button.module';
import { SelectModule } from '../select/select.module';
import { FormComponent } from './form/form.component';
import { InputModule } from '../input/input.module';
import { ModalFormButtonComponent } from './modals/modal-form/modal-form-button/modal-form-button.component';
import { ModalUniqueComponent } from './modals/modal-unique/modal-unique.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputModule,
		ButtonModule,
		SelectModule
	],
	declarations: [
		FormComponentComponent,
		ModalFormComponent,
		FormComponent,
		ModalFormButtonComponent,
  ModalUniqueComponent
	],
	exports: [FormComponent]
})
export class FormModule {}
