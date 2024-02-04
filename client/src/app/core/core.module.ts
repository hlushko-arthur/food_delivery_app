import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
import { ButtonModule } from 'src/app/modules/button/button.module';
import { InputModule } from 'src/app/modules/input/input.module';
import { CardModule } from 'src/app/modules/card/card.module';
import { FormModule } from 'src/app/modules/form/form.module';
import { TableModule } from '../modules/table/table.module';
import { UserComponent } from './selectors/user/user.component';
import { IconsModule } from './icons/icons.module';
import { TranslateModule } from '../modules/translate/translate.module';
import { AlertModule } from '../modules/alert/alert.module';
import { ModalModule } from '../modules/modal/modal.module';
import { FormcomponentsModule } from './formcomponents/formcomponents.module';
import { SelectModule } from '../modules/select/select.module';


@NgModule({
	declarations: [UserComponent],
	exports: [
		/* exports */
		TranslateModule,
		SelectModule,
		CommonModule,
		FormsModule,
		WacomModule,
		ButtonModule,
		InputModule,
		CardModule,
		FormModule,
		AlertModule,
		ModalModule,
		TableModule,
		IconsModule
	],
	imports: [CommonModule, FormsModule, WacomModule, FormcomponentsModule],
	providers: []
})
export class CoreModule {}
