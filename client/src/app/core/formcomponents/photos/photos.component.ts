import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
	selector: 'photos-formcomponents',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
	field: any = {};
	config: any = {};
	component: any = {};
	control: FormControl;
	form: FormGroup;
	value: string;
}