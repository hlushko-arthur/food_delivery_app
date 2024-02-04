import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'text-formcomponents',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss']
})
export class TextComponent {
	field: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: unknown;
}