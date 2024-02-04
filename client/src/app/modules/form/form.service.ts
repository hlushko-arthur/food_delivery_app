import { Injectable } from '@angular/core';
import { CoreService, MongoService, StoreService } from 'wacom';
import {
	FormComponentInterface,
	TemplateComponentInterface,
	TemplateFieldInterface
} from './interfaces/component.interface';
import { ModalService } from 'src/app/modules/modal/modal.service';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { FormInterface } from './interfaces/form.interface';
import { ModalFormComponent } from './modals/modal-form/modal-form.component';
import { TranslateService } from '../translate/translate.service';
import { ModalUniqueComponent } from './modals/modal-unique/modal-unique.component';

export interface FormModalButton {
	click: (submition: unknown, close: () => void) => void;
	label: string;
	class?: string;
}

@Injectable({
	providedIn: 'root'
})
export class FormService {
	constructor(
		private _translate: TranslateService,
		private _modal: ModalService,
		private _mongo: MongoService,
		private _store: StoreService,
		private _alert: AlertService,
		private _core: CoreService
	) {
		this.customForms = _mongo.get('form', {}, (arr: any, obj: any) => {
			this._forms = obj;

			for (const form of this.customForms) {
				for (const component of form.components) {
					this.addRef(component);
				}
			}
		});

		this._store.getJson('formIds', (formIds: string[]) => {
			this.formIds = formIds || [];
		});
	}

	translateForm(form: FormInterface) {
		if (form.title) {
			form.title = this._translate.translate(
				`Form_${form.formId}.${form.title}`,
				(title: string) => {
					form.title = title;
				}
			);

			for (const component of form.components) {
				for (const field of (component.fields as TemplateFieldInterface[])) {
					if (typeof field.value === 'string') {
						this.translateFormComponent(form, field);
					}
				}
			}
		}
	}

	translateFormComponent(form: FormInterface, field: TemplateFieldInterface) {
		field.name = this._translate.translate(
			`Form_${form.formId}.${field.name}`,
			(name: string) => {
				field.name = name;
			}
		);

		if (typeof field.value === 'string') {
			field.value = this._translate.translate(
				`Form_${form.formId}.${field.value}`,
				(value: string) => {
					field.value = value;
				}
			);
		}
	}

	components: TemplateComponentInterface[] = [];

	addComponent(component: TemplateComponentInterface) {
		if (
			this.components.map((c) => c.name).indexOf(component.name) ===
			-1
		) {
			this.components.push(component);
		}
	}

	getComponent(name: string) {
		const index = this.components.map((c) => c.name).indexOf(name);

		return index === -1 ? null : this.components[index];
	}

	getCustomComponent(name: string) {
		const index = this.components.map((c) => c.name).indexOf(name);

		return index === -1
			? null
			: {
				component: this.components[index].component,
				components: [],
				fields: [],
				name
			};
	}

	inited = false;

	addRef(component: FormComponentInterface): void {
		if (this.inited) {
			if (!Array.isArray(component.fields)) {
				component.fields = [];
			}

			if (component.name) {
				const index = this.components
					.map((c) => c.name)
					.indexOf(component.name);

				if (index === -1) {
					console.error(
						`Component ${component.name} is not configured`
					);

					return;
				}

				component.component = this.components[index].component;

				for (const field of this.components[index].fields) {
					if (
						component.fields.map((f) => f.name).indexOf(field) ===
						-1
					) {
						component.fields.push({
							name: field,
							value: ''
						});
					}
				}

				for (const field of component.fields) {
					if (
						this.components[index].fields.indexOf(field.name) === -1
					) {
						const i = component.fields
							.map((f) => f.name)
							.indexOf(field.name);

						component.fields.splice(i, 1);
					}
				}
			}

			if (Array.isArray(component.components)) {
				for (const comp of component.components) {
					this.addRef(comp);
				}
			}
		} else {
			setTimeout(() => {
				this.addRef(component);
			}, 500);
		}
	}

	forms: FormInterface[] = [];

	addForm(form: FormInterface) {
		if (this.forms.map((c) => c.formId).indexOf(form.formId) === -1) {
			for (const component of form.components) {
				component.root = true;

				this.addRef(component);
			}

			this.forms.push(form);
		} else {
			throw 'Form id is unique';
		}
	}

	getDefaultForm(id: string, components = ['name', 'description']): FormInterface {
		const form = {
			id,
			components: components.map((key, index) => {
				const name = key.includes('.') ? key.split('.')[1] : 'Text';

				return {
					name,
					key,
					focused: !index,
					root: true,
					fields: [
						{
							name: 'Placeholder',
							value: 'Enter your ' + key.split('.')[0]
						},
						{
							name: 'Label',
							value: this._core.capitalizeFirstLetter(key.split('.')[0])
						}
					]
				};
			})
		};

		for (const component of form.components) {
			this.addRef(component);
		}

		return form;
	}

	formIds: string[] = [];

	getForm(formId: string, form?: FormInterface): FormInterface {
		if (
			form &&
			this.forms.map((c) => c.formId).indexOf(form?.formId) === -1
		) {
			this.forms.push(form as FormInterface);
		}

		if (this.formIds.indexOf(formId) === -1) {
			this.formIds.push(formId);

			this._store.setJson('formIds', this.formIds);
		}

		const devForm = this.forms.find((f) => f.formId === formId);

		const customForm = this.customForms.find(
			(f) => f.formId === formId && f.active
		);

		const defaultForm = this.getDefaultForm(formId);

		if (form) {
			for (const component of form.components) {
				component.root = true;
			}
		}

		if (!form) {
			form = devForm
				? { ...devForm }
				: customForm
					? { ...customForm }
					: defaultForm;
		}

		form.formId = formId;
		form.title = form.title || devForm?.title || customForm?.title;
		form.class = form.class || devForm?.class || customForm?.class;

		if ((form || devForm) && customForm) {
			for (const component of customForm.components) {
				form.components.push(component);
			}
		}

		this.translateForm(form);

		this._mongo.on('form', () => {
			const forms = this.customForms.filter(
				(c) => c.formId === (form as FormInterface).formId
			);

			for (const _form of forms) {
				for (const component of _form.components) {
					if (
						form?.components &&
						!form?.components.filter(
							(c) => !c.root && c.key === component.key
						).length
					) {
						form?.components.push(component);
					}
				}
			}
		});

		return form;
	}

	modal<T>(
		form: FormInterface | FormInterface[],
		buttons: FormModalButton | FormModalButton[] = [],
		submition: unknown = {},
		change = (doc: T) => { }
	): Promise<T> {
		return new Promise((resolve, reject) => {
			this._modal.show({
				component: ModalFormComponent,
				class: 'forms_modal',
				form,
				buttons: Array.isArray(buttons) ? buttons : [buttons],
				submition,
				onClose: function () {
					resolve(this.submition);
				},
				submit: (update: T) => {
					resolve(update);
				},
				change: (update: T) => {
					if (typeof change === 'function') {
						change(update);
					}
				}
			});
		});
	}

	modalUnique<T>(
		module: string,
		field: string,
		doc: T,
		component: string = '',
		onClose = ()=>{}
	): void {
		this._modal.show({
			component: ModalUniqueComponent,
			form: this.getDefaultForm('unique', [field + (component ? '.' + component : '')]),
			module,
			field,
			doc,
			class: 'forms_modal',
			onClose
		});
	}

	customForms: FormInterface[] = [];

	_forms: any = {};

	new(): FormInterface {
		return {
			_id: '',
			title: '',
			class: '',
			components: []
		};
	}

	create(
		form: FormInterface = this.new(),
		callback = (created: FormInterface) => { },
		text = 'form has been created.'
	) {
		if (form._id) {
			this.save(form);
		} else {
			this._mongo.create('form', form, (created: FormInterface) => {
				callback(created);

				this._alert.show({ text });
			});
		}
	}

	doc(formId: string): FormInterface {
		if (!this._forms[formId]) {
			this._forms[formId] = this._mongo.fetch('form', {
				query: {
					_id: formId
				}
			});
		}

		return this._forms[formId];
	}

	update(
		form: FormInterface,
		callback = () => { },
		text = 'form has been updated.'
	): void {
		this._mongo.afterWhile(form, () => {
			this.save(form, callback, text);
		});
	}

	save(
		form: FormInterface,
		callback = () => { },
		text = 'form has been updated.'
	): void {
		this._mongo.update(
			'form',
			{
				_id: form._id,
				title: form.title,
				formId: form.formId,
				active: form.active,
				components: form.components.map((c) => {
					return {
						name: c.name,
						key: c.key,
						root: c.root,
						fields: c.fields,
						components: c.components
					};
				})
			},
			() => {
				callback();

				if (text) this._alert.show({ text, unique: 'form' });
			}
		);
	}

	delete(
		form: FormInterface,
		callback = () => { },
		text = 'form has been deleted.'
	): void {
		this._mongo.delete('form', form, () => {
			callback();

			if (text) this._alert.show({ text });
		});
	}
}
