import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTypes } from './button.types';

@Component({
	selector: 'wbutton',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	readonly types = ButtonTypes;

	@Input() type = ButtonTypes[0];

	@Input() disabled = false;

	@Input() disableSubmit = false;

	@Input() click: (() => void) | undefined;

	@Output() wClick = new EventEmitter();

	clicked(): void {
		if (this.disabled) {
			return;
		}

		if (typeof this.click === 'function') {
			this.click();
		}

		this.wClick.emit();
	}
}
