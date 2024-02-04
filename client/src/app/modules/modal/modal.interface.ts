import { InjectionToken } from '@angular/core';

export interface Modal {
	onOpen?: any;
	onClose?: any;
	onClickOutside?: any;
	id?: number;
	close?: any;
	component?: any;
	size?: any;
	timeout?: any;
	timestart?: any;
	class?: string;
	modals?: Record<string, any>;
	position?: string;
	closable?: boolean;
	unique?: string;
	[x: string]: any;
}

export const DEFAULT_MODAL: Modal = {
	size: 'mid',
	timeout: 0,
	timestart: 0,
	class: '',
	modals: {},
	position: 'tc',
	closable: true
};

export interface ModalConfig {
	size?: any;
	timeout?: any;
	timestart?: any;
	class?: string;
	modals?: Record<string, any>;
	position?: string;
	closable?: boolean;
	unique?: string;
}

export const MODAL_CONFIG_TOKEN = new InjectionToken<ModalConfig>(
	'modalConfig'
);

export const MODAL_DEFAULT_CONFIG: ModalConfig = {};
