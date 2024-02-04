import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
	selector: 'time-formcomponents',
	templateUrl: './time.component.html',
	styleUrls: ['./time.component.scss']
})
export class TimeComponent {
	field: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: unknown;
}