import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import { ModalService } from 'wacom';
import { FormInterface } from '../../interfaces/form.interface';
import { MutateFormComponent } from './mutate-form/mutate-form.component';

@Component({
	templateUrl: './forms.component.html',
	styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
	columns = ['title', 'components', 'formId', 'active'];

	config = {
		create: () => {
			this._modal.show({
				component: MutateFormComponent
			});
		},
		update: (form: FormInterface) => {
			this._modal.show({
				component: MutateFormComponent,
				form
			});
		},
		delete: (form: FormInterface) => {
			this._fs.delete(form);
		}
	};

	get rows(): FormInterface[] {
		return this._fs.customForms;
	}

	changeStatus(form: FormInterface) {
		setTimeout(() => {
			if (form.active) {
				for (const _form of this._fs.customForms) {
					if (_form._id === form._id || _form.formId !== form.formId)
						continue;

					if (_form.active) {
						_form.active = false;

						this._fs.save(_form);
					}
				}
			}

			this._fs.save(form);
		});
	}

	constructor(private _fs: FormService, private _modal: ModalService) {}
}
