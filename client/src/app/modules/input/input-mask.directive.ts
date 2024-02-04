import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[mask]'
})
export class InputMaskDirective {
	@Input() endWith: string;
	@Input() regex: string;

	constructor(private el: ElementRef) {}
	@HostListener('input', ['$event.target.value'])
	onInput(value: string) {
		if (this.endWith) {
			const cursor = this.el.nativeElement.selectionStart;

			value = value.split(this.endWith).join('');

			if (this.regex) {
				const regex = new RegExp(this.regex, 'g');
				value = value.replace(regex, '');
			}

			if (value) {
				this.el.nativeElement.value = value + this.endWith;
			}

			this.el.nativeElement.setSelectionRange(cursor, cursor);
		}
	}
}
