import { Injectable, Inject, Optional } from '@angular/core';
import {
	Alert,
	AlertConfig,
	ALERT_CONFIG_TOKEN,
	ALERT_DEFAULT_CONFIG
} from './alert.interface';
import { CoreService, DomService, Any } from 'wacom';
import { AlertComponent } from './alert.component';
import { AlertWrapperComponent } from './alert-wrapper/alert-wrapper.component';

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	constructor(
		@Inject(ALERT_CONFIG_TOKEN) @Optional() private config: AlertConfig,
		private _core: CoreService,
		private _dom: DomService
	) {
		if (!this.config) {
			this.config = ALERT_DEFAULT_CONFIG;
		}

		// for (const each in ALERT_DEFAULT_CONFIG) {
		// 	if (this.config[each]) continue;
		// 	this.config[each] = ALERT_DEFAULT_CONFIG[each];
		// }

		this._dom.appendComponent(AlertWrapperComponent);
	}
	private uniques: Any = {};

	private shortcuts: Any = {
		tl: 'topLeft',
		tc: 'topCenter',
		tr: 'topRight',
		r: 'right',
		br: 'bottomRight',
		bc: 'bottomCenter',
		bl: 'bottomLeft',
		l: 'left',
		c: 'center'
	};

	show(opts: Alert | string) {
		const options: Alert = (typeof opts === 'string' ? { text: opts } : opts || {}) as Alert;

		if (!options.type) {
			options.type = 'info';
		}

		// for (let each in this.config) {
		// 	if (each == "class") {
		// 		opts[each] = opts[each] + " " + this.config[each];
		// 	} else if (typeof opts[each] === "undefined") {
		// 		opts[each] = this.config[each];
		// 	}
		// }

		// if (this.shortcuts[opts.position]) {
		// 	opts.position = this.shortcuts[opts.position];
		// }

		if (!options.position) {
			options.position = 'bottomRight';
		}

		let content: any;

		options.close = () => {
			if (content) content.componentRef.destroy();

			component.nativeElement.remove();

			// if (typeof (opts as Alert).onClose == 'function') (opts as Alert).onClose();
		};

		const component = this._dom.appendById(
			AlertComponent,
			options,
			options.position
		);

		// if (typeof opts.component == 'string' && this.config.alerts[opts.component]) {
		// 	opts.component = this.config.alerts[opts.component];
		// }

		if (typeof options.component == 'function') {
			const el = component.nativeElement.children[0].children[0]
				.children[0] as HTMLElement;

			content = this._dom.appendComponent(options.component, opts, el);
		}

		// if (opts.unique) {
		// 	if (this.uniques[opts.unique]) {
		// 		this.uniques[opts.unique].remove();
		// 	}
		// 	this.uniques[opts.unique] = component.nativeElement;
		// }

		return component.nativeElement;
	}

	open(opts: Alert | string) {
		this.show(opts);
	}

	info(opts: Alert | string) {
		if (typeof opts === 'string') {
			this.show({
				text: opts,
				type: 'info'
			} as Alert);
		} else {
			opts.type = 'info';

			this.show(opts);
		}
	}

	success(opts: Alert | string) {
		if (typeof opts === 'string') {
			this.show({
				text: opts,
				type: 'success'
			} as Alert);
		} else {
			opts.type = 'success';

			this.show(opts);
		}
	}

	warning(opts: Alert | string) {
		if (typeof opts === 'string') {
			this.show({
				text: opts,
				type: 'warning'
			} as Alert);
		} else {
			opts.type = 'warning';

			this.show(opts);
		}
	}

	error(opts: Alert | string) {
		if (typeof opts === 'string') {
			this.show({
				text: opts,
				type: 'error'
			} as Alert);
		} else {
			opts.type = 'error';

			this.show(opts);
		}
	}

	question(opts: Alert | string) {
		if (typeof opts === 'string') {
			this.show({
				text: opts,
				type: 'question'
			} as Alert);
		} else {
			opts.type = 'question';

			this.show(opts);
		}
	}

	destroy() {
		this._core.document.getElementById('bottomRight').innerHTML = '';

		this._core.document.getElementById('bottomLeft').innerHTML = '';

		this._core.document.getElementById('bottomCenter').innerHTML = '';

		this._core.document.getElementById('topRight').innerHTML = '';

		this._core.document.getElementById('topLeft').innerHTML = '';

		this._core.document.getElementById('topCenter').innerHTML = '';

		this._core.document.getElementById('center').innerHTML = '';
	}
}
