import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoreService } from 'wacom';
import { FormComponentInterface } from '../interfaces/component.interface';
import { FormInterface } from '../interfaces/form.interface';

interface Submission {
	data: Record<string, unknown>;
	[key: string]: unknown;
}

@Component({
	selector: 'wform',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
	@Input() config: FormInterface;

	@Input() submition: Record<string, unknown> = {};

	@Input() form = this._fb.group({});

	@Output() wChange = new EventEmitter();

	@Output() wSubmit = new EventEmitter();

	constructor(private _core: CoreService, private _fb: FormBuilder) {}

	component(
		key: string,
		components = this.config.components
	): FormComponentInterface | false {
		for (const component of components) {
			if (component.key === key) {
				return component;
			}

			if (component.components?.length) {
				const deepComponent = this.component(key, component.components);

				if (deepComponent) {
					return deepComponent;
				}
			}
		}

		return false;
	}

	fill(key: string, submition: Record<string, unknown>, value: unknown): void {
		if (key.indexOf('.') > -1) {
			const local_key: string = key.slice(0, key.indexOf('.'));

			if (!submition[local_key]) {
				submition[local_key] = {};
			}

			return this.fill(
				key.slice(key.indexOf('.') + 1),
				submition[local_key] as Record<string, unknown>,
				value
			);
		} else {
			submition[key] = value;
		}
	}

	_values() {
		const submition: Submission = {
			data: {}
		};

		for (const field in this.form.controls) {
			const component = this.component(field);

			const value = (this.form.value as Record<string, unknown>)[field];

			if (component && component.root) {
				this.fill(field, submition, value);
			} else {
				if (!submition.data) {
					submition.data = {};
				}

				this.fill(field, submition.data, value);
			}

		}

		return submition;
	}

	onSubmit(): void {
		this._core.afterWhile(this, () => {
			this.wSubmit.emit(this._values());
		});
	}

	onChange(): void {
		this._core.afterWhile(this, () => {
			this.wChange.emit(this._values());
		});
	}

	onClick(/* component: FormComponentInterface */): void {
		// if (typeof component.click === 'function') {
		// 	component.click(this._values());
		// }
	}
}
