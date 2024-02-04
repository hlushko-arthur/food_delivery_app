import { Component } from '@angular/core';
import { HashService, HttpService, UiService } from 'wacom';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { Router } from '@angular/router';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/modules/form/form.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { TranslateService } from 'src/app/modules/translate/translate.service';

interface RespStatus {
	email: string;
	pass: string;
}

interface Form {
	email: string;
	password: string;
	code: string;
}

@Component({
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	form: FormInterface = this._form.getForm('sign', {
		formId: 'sign',
		title: 'Sign In / Sign Up',
		components: [
			{
				// name: 'Email',
				name: 'Text',
				key: 'email',
				root: true,
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your email'
					},
					{
						name: 'Label',
						value: 'Email'
					}
				]
			},
			{
				name: 'Password',
				key: 'password',
				root: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your password'
					},
					{
						name: 'Label',
						value: 'Password'
					}
				]
			},
			{
				// name: 'Number',
				name: 'Text',
				key: 'code',
				root: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter code from email'
					},
					{
						name: 'Label',
						value: 'code'
					}
				],
				hidden: true
			},
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: "Let's go"
					}
				]
			}
		]
	});

	user = {
		email: 'ceo@webart.work',
		password: 'asdasdasdasd'
	};

	constructor(
		public us: UserService,
		public ui: UiService,
		private _alert: AlertService,
		private _http: HttpService,
		private _hash: HashService,
		private _router: Router,
		private _form: FormService,
		private _translate: TranslateService
	) {}

	submit(form: Form): void {
		if (!this.form.components[2].hidden && form.code) {
			this.save();
		} else if (!form.email) {
			this._alert.error({
				text: this._translate.translate('Sign.Enter your email')
			});
		}

		if (!this.ui.valid(form.email)) {
			this._alert.error({
				text: this._translate.translate('Sign.Enter proper email')
			});
		} else if (!form.password) {
			this._alert.error({
				text: this._translate.translate('Sign.Enter your password')
			});
		} else {
			this._hash.set('email', form.email);

			this._http.post('/api/user/status', form, (resp: RespStatus) => {
				if (resp.email && resp.pass) {
					this.login(form);
				} else if (resp.email) {
					this.reset(form);
				} else {
					this.sign(form);
				}
			});
		}
	}

	login(user: Form): void {
		this._http.post('/api/user/login', user, this._set.bind(this));
	}

	sign(user: Form): void {
		this._http.post('/api/user/sign', user, this._set.bind(this));
	}

	reset(user: Form): void {
		this._http.post('/api/user/request', user, () => {
			this.form.components[2].hidden = false;
		});

		this._alert.info({
			text: 'Mail will sent to your email'
		});
	}

	save(): void {
		// this._http.post('/api/user/change', this.user, (resp: boolean) => {
		// 	if (resp) {
		// 		this._alert.info({
		// 			text: 'Password successfully changed'
		// 		});
		// 	} else {
		// 		this._alert.error({
		// 			text: 'Wrong Code'
		// 		});
		// 	}
		// 	this.login();
		// });
	}

	private _set = (user: User): void => {
		if (user) {
			localStorage.setItem('waw_user', JSON.stringify(user));

			this._http.set('token', user.token);

			this.us.user = user;

			this.us.load();

			this._router.navigateByUrl('/profile');
		} else {
			this._alert.error({
				text: 'Something went wrong'
			});
		}
	};
}
