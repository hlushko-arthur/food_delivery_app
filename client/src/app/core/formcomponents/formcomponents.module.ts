import { ButtonModule } from 'src/app/modules/button/button.module';
import { InputModule } from 'src/app/modules/input/input.module';
import { FileModule } from 'src/app/modules/file/file.module';
import { FormService } from 'src/app/modules/form/form.service';
import { SelectModule } from 'src/app/modules/select/select.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/* componnets */
import { EmailComponent } from './email/email.component';
import { NumberComponent } from './number/number.component';
import { TimeComponent } from './time/time.component';
import { PhotoComponent } from './photo/photo.components';
import { PhotosComponent } from './photos/photos.component';
import { DateComponent } from './date/date.component';
import { TextComponent } from './text/text.component';
import { ButtonComponent } from './button/button.component';
import { PasswordComponent } from './password/password.component';
import { SelectComponent } from './select/select.component';


@NgModule({
	imports: [
		InputModule,
		ButtonModule,
		CommonModule,
		FileModule,
		SelectModule
	],
	declarations: [
		/* declarations */
		EmailComponent,
		NumberComponent,
		TimeComponent,
		DateComponent,
		PhotoComponent,
		PhotosComponent,
		PasswordComponent,
		SelectComponent,
		TextComponent,
  		ButtonComponent
	]
})
export class FormcomponentsModule {
	constructor(private _form: FormService) {
		/* addComponents */
		this._form.addComponent({
			component: EmailComponent,
			name: 'Email',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: NumberComponent,
			name: 'Number',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: TimeComponent,
			name: 'Time',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: SelectComponent,
			name: 'Select',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: DateComponent,
			name: 'Date',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: TextComponent,
			name: 'Text',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: PasswordComponent,
			name: 'Password',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: ButtonComponent,
			name: 'Button',
			fields: ['Label']
		});
		this._form.addComponent({
			component: PhotoComponent,
			name: 'Photo',
			fields: ['Placeholder', 'Label']
		});
		this._form.addComponent({
			component: PhotosComponent,
			name: 'Photos',
			fields: ['Placeholder', 'Label']
		});
		this._form.inited = true;
	}
}
