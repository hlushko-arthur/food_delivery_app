import { Injectable, Inject, Optional } from '@angular/core';
import { CoreService, DomService } from 'wacom';
import { ModalComponent } from './modal.component';
import {
	Modal,
	MODAL_CONFIG_TOKEN,
	ModalConfig,
	MODAL_DEFAULT_CONFIG
} from './modal.interface';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	constructor(
		@Inject(MODAL_CONFIG_TOKEN) @Optional() private config: ModalConfig,
		private core: CoreService,
		private dom: DomService
	) {
		if (!this.config) this.config = {};

		if (!this.config.modals) this.config.modals = {};
	}

	show(opts: Modal | any) {
		if (typeof opts == 'string' || typeof opts == 'function') {
			opts = {
				component: opts
			};
		}

		if (!opts || typeof opts != 'object') opts = {};

		if (
			typeof opts.component == 'string' &&
			this.config.modals &&
			this.config.modals[(opts.component as string)]
		) {
			opts.component = this.config.modals[(opts.component as string)];
		}

		if (typeof opts.component != 'function') {
			console.log('This component does not exists.');

			return;
		}

		if (!opts.class) opts.class = '';

		for (const each in this.config) {
			if (each == 'class') {
				opts.class += ((opts.class && ' ') || '') + this.config.class;
			}
		}

		opts.id = Math.floor(Math.random() * Date.now()) + Date.now();

		this.opened[opts.id] = opts;

		this.core.document.body.classList.add('modalOpened');

		let component: any;

		let content: any;

		opts.close = () => {
			content.componentRef.destroy();

			component.nativeElement.remove();

			if (typeof opts.onClose == 'function') opts.onClose();

			delete this.opened[opts.id];

			if (!Object.keys(this.opened).length) {
				this.core.document.body.classList.remove('modalOpened');
			}
		};

		if (typeof opts.timeout == 'number' && opts.timeout > 0) {
			setTimeout(opts.close, opts.timeout);
		}

		component = this.dom.appendComponent(ModalComponent, opts);

		content = this.dom.appendComponent(
			opts.component,
			opts,
			component.nativeElement.children[0].children[0]
				.children[0] as HTMLElement
		);

		return component.nativeElement;
	}
	open(opts: Modal) {
		this.show(opts);
	}
	small(opts: Modal) {
		if (typeof opts == 'string' || typeof opts == 'function') {
			opts = {
				component: opts
			};
		}

		opts.size = 'small';

		this.show(opts);
	}
	mid(opts: Modal) {
		if (typeof opts == 'string' || typeof opts == 'function') {
			opts = {
				component: opts
			};
		}

		opts.size = 'mid';

		this.show(opts);
	}
	big(opts: Modal) {
		if (typeof opts == 'string' || typeof opts == 'function') {
			opts = {
				component: opts
			};
		}

		opts.size = 'big';

		this.show(opts);
	}
	full(opts: Modal) {
		if (typeof opts == 'string' || typeof opts == 'function') {
			opts = {
				component: opts
			};
		}

		opts.size = 'full';

		this.show(opts);
	}
	private opened: any = {};
	destroy() {
		for (const each in this.opened) {
			this.opened[each].close();
		}

		this.core.document.body.classList.remove('modalOpened');
	}
}
