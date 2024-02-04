import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
	selector: 'date-formcomponents',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss']
})
export class DateComponent {
	field: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: unknown;
}
