import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: 'ng-template[cell]'
})
export class CellDirective {
	@Input() cell: any;

	constructor(public template: TemplateRef<any>) {}
}

@Directive({
	selector: 'ng-template[sort]'
})
export class SortDirective {
	@Input() cell: any;

	constructor(public template: TemplateRef<any>) {}
}

@Directive({
	selector: 'ng-template[actions]'
})
export class ActionsDirective {
	constructor(public template: TemplateRef<any>) {}
}

@Directive({
	selector: 'ng-template[customEdit]'
})
export class CustomEditDirective {
	constructor(public template: TemplateRef<any>) {}
}
