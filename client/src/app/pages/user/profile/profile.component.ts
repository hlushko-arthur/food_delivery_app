import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import { CoreService } from 'wacom';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';

interface ChangePassword {
	oldPass: string;
	newPass: string;
}

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
	constructor(
		private _form: FormService,
		private _core: CoreService,
		public us: UserService
	) {
		this._core.next('us.user', () => {
			const user = {};

			this._core.copy(this.us.user, user);

			// eslint-disable-next-line no-console
			console.log(user, this.us.user);

			this.user = user;
		});
	}

	// Update user profile
	formProfile: FormInterface = this._form.getForm('profile', {
		formId: 'profile',
		title: 'Profile Settings',
		components: [
			{
				name: 'Text',
				key: 'name',
				root: true,
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your name'
					},
					{
						name: 'Label',
						value: 'Name'
					}
				]
			},
			{
				name: 'Text',
				key: 'phone',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your phone'
					},
					{
						name: 'Label',
						value: 'Phone'
					}
				]
			},
			{
				name: 'Text',
				key: 'bio',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your bio'
					},
					{
						name: 'Label',
						value: 'Bio'
					}
				]
			}
		]
	});

	user: Record<string, unknown>;

	update(submition: User): void {
		this._core.copy(submition, this.us.user);

		this.us.update();
	}

	// Update user password
	formPassword: FormInterface = this._form.getForm('change password', {
		formId: 'change password',
		title: 'Change password',
		components: [
			{
				name: 'Password',
				key: 'oldPass',
				root: true,
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your old password'
					},
					{
						name: 'Label',
						value: 'Old Password'
					}
				]
			},
			{
				name: 'Password',
				key: 'newPass',
				root: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your new password'
					},
					{
						name: 'Label',
						value: 'New Password'
					}
				]
			}
		]
	});

	change_password(): void {
		this._form
			.modal<ChangePassword>(this.formPassword, {
				label: 'Change',
				click: (submition: unknown, close: () => void) => {
					this.us.change_password(
						(submition as ChangePassword).oldPass,
						(submition as ChangePassword).newPass
					);

					close();
				}
			})
			.then((submition: ChangePassword) => {
				this.us.change_password(submition.oldPass, submition.newPass);
			});
	}
}
