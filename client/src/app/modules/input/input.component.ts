import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	ElementRef,
	ViewChild,
	forwardRef,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTypes } from './input.types';

@Component({
	selector: 'winput',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	]
})
export class InputComponent implements OnInit, OnChanges {
	@Input() type = InputTypes[0];

	@Input() label = '';

	@Input() endWith = '';

	@Input() regex = '';

	@Input() items: string[] = [];

	@Input() wClass: string;

	@Input() formControlName = 'name';

	@Input() formControl: FormControl;

	@Input() form: FormGroup;

	@Input() name = 'name';

	@Input() placeholder = '';

	@Input() value: unknown = '';

	@Input() disabled: boolean;

	@Input() focused = false;

	@Output() wChange = new EventEmitter();

	@Output() wSubmit = new EventEmitter();

	@ViewChild('inputEl') inputEl: ElementRef;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['endWith']) {
			this.endWith = changes['endWith'].currentValue;
		}
	}

	ngOnInit() {
		if (!this.formControl) {
			this.formControl = new FormControl(this.value);
		}

		this.formControl.valueChanges.subscribe((value) => {
			this.wChange.emit(value);
		});

		if (this.focused) {
			setTimeout(() => {
				this.inputEl.nativeElement.focus();
			}, 100);
		}
	}

	// to fix name issue
	writeValue(value: string): void {
		this.value = value;
	}
	onChange = (_: any) => {};
	onTouched = () => {};
	registerOnChange(fn: (_: any) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
	setDisabledState(disabled: boolean): void {
		this.disabled = disabled;
	}
}
