import { Component, Input } from '@angular/core';

@Component({
	selector: 'wcard',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent {
	@Input() padding = false;

	@Input() align = 'center';

	@Input() image = false;

	@Input() title: string;

	@Input() subtitle: string;

	@Input() text: string;
}
