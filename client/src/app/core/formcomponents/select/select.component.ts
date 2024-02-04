import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'select-formcomponents',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent {
	field: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: { name: string } = { name: '' };
	get select(): string {
		return this.value?.name || (this.value as unknown as string) || ''
	}
}
