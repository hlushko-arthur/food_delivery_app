import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewContainerRef,
	ViewRef
} from '@angular/core';
import { FormComponentInterface } from '../../interfaces/component.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../form.service';
import { FormInterface } from '../../interfaces/form.interface';
import { DomService } from 'wacom';

interface Data {
	field: Record<string, unknown>;
	value: unknown;
}

@Component({
	selector: 'form-component',
	templateUrl: './form-component.component.html',
	styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {
	@Input() component: FormComponentInterface;

	@Input() config: FormInterface;

	@Input() form: FormGroup;

	@Input() control: FormControl;

	@Input() submition: Record<string, unknown> = {};

	@Output() wSubmit = new EventEmitter();

	@Output() wChange = new EventEmitter();

	@Output() wClick = new EventEmitter();

	get hasComponents(): boolean {
		return Array.isArray(this.component.components);
	}

	data: Data;

	constructor(
		private _viewContainerRef: ViewContainerRef,
		private _form: FormService,
		private _dom: DomService
	) {}

	value(key: string, doc: Record<string, unknown>): unknown {
		if(key.indexOf('.') > -1) {
			const local_key: string = key.slice(0, key.indexOf('.'));

			if (!doc[local_key]) {
				doc[local_key] = {};
			}

			return this.value(
				key.slice(key.indexOf('.') + 1),
				doc[local_key] as Record<string, unknown>
			);
		} else {
			return doc[key];
		}
	}

	ngOnInit(): void {
		const data: Data = {
			field: {}
		} as Data;

		if (Array.isArray(this.component.fields)) {
			for (const field of this.component.fields) {
				data.field[field.name] = field.value;
			}
		}

		if (this.component.key && this.submition !== undefined) {
			if (this.component.root) {
				data.value = this.value(this.component.key, this.submition);
			} else {
				if (!this.submition['data']) {
					this.submition['data'] = {};
				}
				data.value = this.value(this.component.key, this.submition['data'] as Record<string, unknown>);

			}
		}

		if (this.component.key && !this.control) {
			this.control = new FormControl(data.value);

			this.control.valueChanges.subscribe((value: unknown) => {
				this.submition[this.component.key as string] = value;

				this.wChange.emit();
			});

			this.form.addControl(this.component.key, this.control);
		}

		this.data = data;

		if (!this.component.component) {
			this._form.addRef(this.component);
		}

		this._viewContainerRef.insert(this._dom.getComponentRef(this.component.component, {
			component: this.component,
			config: this.config,
			field: this.data.field,
			value: this.data.value,
			control: this.control,
			form: this.form,
			wSubmit: this.wSubmit.emit,
			wChange: this.wChange.emit,
			wClick: this.wClick.emit
		}).hostView as unknown as ViewRef);
	}
}
