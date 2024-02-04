import { NgModule } from '@angular/core';
import { FileComponent } from './file.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
	declarations: [
		FileComponent
	],
	exports: [
		FileComponent
	],
	imports: [
		CommonModule,
		ImageCropperModule
	]
})

export class FileModule {}
