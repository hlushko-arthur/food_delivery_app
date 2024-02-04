import { InjectionToken } from '@angular/core';

export interface Alert {
	close?: () => void;
	onClose?: () => void;
	text?: string;
	type?: string;

	component?: Element;
	icon?: string;

	class?: string;
	unique?: string;
	progress?: boolean;
	position?: string;
	timeout?: any;
	closable?: boolean;
	buttons?: any[];
}

export const DEFAULT_ALERT: AlertConfig = {
	alerts: {},
	text: '',
	type: 'info',
	class: '',
	progress: true,
	position: 'bottomRight',
	timeout: 5000,
	closable: true,
	buttons: []
};

export interface AlertConfig {
	alerts?: object;
	text?: string;
	type?: string;
	icon?: string;
	class?: string;
	unique?: string;
	progress?: boolean;
	closable?: boolean;
	position?: string;
	timeout?: number;
	close?: any;
	buttons?: any[];
}

export const ALERT_CONFIG_TOKEN = new InjectionToken<AlertConfig>(
	'alertConfig'
);

export const ALERT_DEFAULT_CONFIG: AlertConfig = {};
