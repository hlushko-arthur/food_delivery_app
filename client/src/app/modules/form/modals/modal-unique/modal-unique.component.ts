import { Component } from '@angular/core';
import { FormInterface } from '../../interfaces/form.interface';
import { MongoService } from 'wacom';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-unique',
  templateUrl: './modal-unique.component.html',
  styleUrls: ['./modal-unique.component.scss']
})
export class ModalUniqueComponent {
	constructor(private _mongo: MongoService) {}
	form: FormInterface;
	module: string;
	field: string;
	doc: any;
	change(form: FormGroup) {
		this._mongo.unique(this.module, this.doc, {
			name: this.field
		}, (resp: string) => {
			if (this.doc[this.field] !== resp) {
				form.get(this.field)?.setValue(resp);

				this.doc[this.field] = resp;
			}
		});
	}
}
