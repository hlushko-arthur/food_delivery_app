import {
	Component,
	ContentChild,
	ElementRef,
	Input,
	ViewChild
} from '@angular/core';
import { ItemDirective } from './list.directive';

@Component({
	selector: 'wlist',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent {
	@ContentChild(ItemDirective, { static: false }) action: any;

	@ViewChild('container') container: ElementRef;

	@Input() items: any = [];

	limit = 100;

	scroll($event: Event): void {
		if (!this.container) return;

		const ele = this.container.nativeElement;

		if (!this._itemHeight && ele.children.length) {
			this._itemHeight = ele.children[0].clientHeight;
		}

		if (!this._itemHeight) return;

		console.log(
			ele.scrollTop,
			this._itemHeight * this.limit * this._devide
		);

		if (
			ele.scrollTop > this._itemHeight * this.limit * this._devide &&
			this.limit < this.items.length
		) {
			this._load();

			if (this._devide < 0.8) {
				this._devide += 0.2;
			}
		}
	}

	private _load = () => {
		this.limit += 100;
	};

	private _itemHeight: number;

	private _devide = 0.5;
}
