import { Component } from '@angular/core';
import { TranslateService } from '../../translate.service';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/modules/form/form.service';
import { CoreService, HttpService } from 'wacom';
import { AlertService } from 'src/app/modules/alert/alert.service';

interface Translate {
	translate: string;
	slug: string;
	lang: string;
}

@Component({
	templateUrl: './translates.component.html',
	styleUrls: ['./translates.component.scss']
})
export class TranslatesComponent {
	columns = ['word', 'translation'];

	form: FormInterface = this._form.getForm('translate', {
		formId: 'translate',
		title: 'Translate',
		components: [
			{
				name: 'Text',
				key: 'translate',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					}
				]
			}
		]
	});

	config = {
		buttons: [
			{
				icon: 'translate',
				click: (element: Translate) => {
					console.log(element);
				}
			}
		],
		update: (doc: Translate) => {
			this._form.modal<Translate>(this.form, [], doc).then((updated: Translate) => {
				this._http.post('/api/translate/create', { slug: doc.slug, lang: this.lang, translate: updated.translate });
			});
		}
	};

	page = '';

	lang: string = this.ts.language ? this.ts.language.code : 'en';

	constructor(
		public ts: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _http: HttpService
	) {}
}
