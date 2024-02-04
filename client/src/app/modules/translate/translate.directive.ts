import { OnInit, Directive, ElementRef } from '@angular/core';
import { TranslateService } from 'src/app/modules/translate/translate.service';

@Directive({
	selector: '[translate]'
})
export class TranslateDirective implements OnInit {
	constructor(public elementRef: ElementRef, private tr: TranslateService) {}
	ngOnInit() {
		this.elementRef.nativeElement.innerHTML = this.tr.translate(
			this.elementRef.nativeElement.innerHTML,
			(translate: string) => {
				this.elementRef.nativeElement.innerHTML = translate;
			}
		);
	}
}
