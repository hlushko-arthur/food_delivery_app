import { Any } from 'wacom';

export interface User {
	token?: string;
	_id?: string;
	name: string;
	email: string;
	thumb: string;
	data: Any;
	is: Any;
}
