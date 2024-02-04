import { TableComponent } from './table.component';
import { FormModule } from '../form/form.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WacomModule } from 'wacom';
import {
	ActionsDirective,
	CellDirective,
	CustomEditDirective,
	SortDirective
} from './table.directive';
import { ButtonModule } from '../button/button.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, FormsModule, WacomModule, FormModule, ButtonModule, RouterModule],
	declarations: [
		TableComponent,
		CellDirective,
		SortDirective,
		ActionsDirective,
		CustomEditDirective
	],
	providers: [],
	exports: [
		TableComponent,
		CellDirective,
		SortDirective,
		ActionsDirective,
		CustomEditDirective
	]
})
export class TableModule {}
