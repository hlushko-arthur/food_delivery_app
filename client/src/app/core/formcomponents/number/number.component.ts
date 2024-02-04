import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
	selector: 'number-formcomponents',
	templateUrl: './number.component.html',
	styleUrls: ['./number.component.scss']
})
export class NumberComponent {
	field: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: unknown;
}