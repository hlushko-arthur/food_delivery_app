import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertWrapperComponent } from './alert-wrapper/alert-wrapper.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';

@NgModule({
	imports: [CommonModule, ButtonModule],
	declarations: [AlertComponent, AlertWrapperComponent],
	exports: [AlertComponent],
	providers: []
})
export class AlertModule {}
