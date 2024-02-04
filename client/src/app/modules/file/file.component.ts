import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileService } from './file.service';
import { HttpService } from 'wacom';

@Component({
	selector: 'ngx-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
	@Input() container = 'general';

	@Input() name = '';

	@Input() label = '';

	@Input() multiple = false;

	@Input() isPhoto = false;

	@Input() resize: number;

	@Input() width: number;

	@Input() height: number;

	@Input() value: string | string[] = this.multiple ? [] : '';

	@Output() update = new EventEmitter();

	get files(): string[] {
		return this.value as string[];
	}

	constructor(
		private _http: HttpService,
		private _fs: FileService
	) { }

	ngOnInit(): void {
		if (!this.multiple && this.value) {
			this.name = (this.value as string).split('/')[5].split('?')[0];
		}
	}

	croppedDataUrl: string;
	dataUrl: string;
	set() {
		this._fs.setFile = (dataUrl: string) => {
			if (this.width && this.height) {
				this.dataUrl = dataUrl;
			} else {
				this.uploadImage(dataUrl);
			}
		};
	}

	imageCropped(event: ImageCroppedEvent) {
		this.croppedDataUrl = event.base64 as string;
	}

	uploadImage(dataUrl = this.croppedDataUrl) {
		this._http.post(
			'/api/file/photo',
			{
				container: this.container,
				name: this.name,
				dataUrl
			},
			(url) => {
				this.dataUrl = '';

				if (this.multiple) {
					if (!this.value) {
						this.value = [];
					}

					(this.value as string[]).push(url);
				} else {
					this.name = url.split('/')[5].split('?')[0];

					this.value = url;
				}

				this.update.emit(this.value);
			}
		);
	}
}
