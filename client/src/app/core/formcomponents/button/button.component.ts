import { Component } from '@angular/core';
@Component({
	selector: 'button-formcomponents',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	field: any = {};
	click() {
		console.log('clicked', this.field);

		if (typeof this.field.Click === 'function') {
			this.field.Click();
		}
	}
}
