import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'lib-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
	class = '';
	size = 'flex';
	closable = true;
	close: any;
	onOpen: any;
	onClickOutside: any;
	timestart: any;
	timeout: any;

	showModal = false;
	constructor() {}
	ngOnInit() {
		if (typeof this.onClickOutside != 'function') {
			this.onClickOutside = this.close;
		}

		if (typeof this.onOpen == 'function') this.onOpen();
	}
	ngAfterViewInit() {
		setTimeout(() => {
			this.showModal = true;
		}, this.timestart || 0);
	}
}
