import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
	name: 'translate'
})
export class TranslatePipe implements PipeTransform {
	constructor(private _tr: TranslateService) {}
	transform(slug: string): string {
		return this._tr.translate(slug);
	}
}
