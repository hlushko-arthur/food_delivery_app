import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { InputMaskDirective } from './input-mask.directive';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule],
	declarations: [InputComponent, InputMaskDirective],
	providers: [],
	exports: [InputComponent]
})
export class InputModule {}
