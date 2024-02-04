import { NgModule } from '@angular/core';
import { FormsComponent } from './forms.component';
import { Routes, RouterModule } from '@angular/router';
import { MutateFormComponent } from './mutate-form/mutate-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule as CommonFormsModule } from '@angular/forms';
import { TableModule } from 'src/app/modules/table/table.module';
import { ButtonModule } from 'src/app/modules/button/button.module';

const routes: Routes = [
	{
		path: '',
		component: FormsComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonFormsModule,
		CommonModule,
		ButtonModule,
		TableModule
	],
	declarations: [FormsComponent, MutateFormComponent],
	providers: []
})
export class FormsModule {}
