import { Component } from '@angular/core';
import { coreAnimation } from '../../animations/core.animations';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	animations: [coreAnimation]
})
export class UserComponent {
	show = false;

	showDesktop = false;

	constructor(public us: UserService) {}
}
