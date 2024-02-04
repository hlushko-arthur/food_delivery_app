import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
	selector: 'photo-formcomponents',
	templateUrl: './photo.component.html',
	styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
	field: any = {};
	config: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: string;
}