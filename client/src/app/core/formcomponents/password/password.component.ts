import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiService } from 'wacom';
@Component({
	selector: 'password-formcomponents',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
	field: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: unknown;
	constructor(public ui: UiService) {}
}