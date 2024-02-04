import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService, HttpService, StoreService } from 'wacom';
import { languages } from './languages';

export interface Language {
	code: string;
	name: string;
	origin: string;
}

interface Word {
	slug: string;
	translate: string;
	translate_id?: string;
	_id?: string;
}

@Injectable({
	providedIn: 'root'
})
export class TranslateService {
	readonly allLanguages = languages;

	constructor(
		private store: StoreService,
		private http: HttpService,
		private core: CoreService
	) {
		this.store.getJson('translates', (translates) => {
			if (translates) {
				this.translates = translates || {};
			}
		});

		this.store.get('language', (code) => {
			if (code) {
				const index = this.languages.map((l) => l.code).indexOf(code);

				if (index >= 0) this.language = this.languages[index];
			}
		});

		this.store.getJson('words', (words) => {
			if (words) {
				this.words = words;
			}
		});

		this.http.get('/api/translate/get', (obj) => {
			if (obj) {
				this.translates = obj;

				this.store.setJson('translates', this.translates);
			}
		});

		this.http.get('/api/word/get', (arr) => {
			if (arr) {
				this.words = arr;

				this.store.setJson('words', this.words);

				for (let i = 0; i < arr.length; i++) {
					if (this.pages.indexOf(arr[i].page) < 0) {
						this.pages.push(arr[i].page);
					}
				}

				this._wordsLoaded = true;
			}

			this.prepare_words(this.language.code);
		});
	}

	/* Translate Management */

	words: Word[] = [];

	pages: string[] = [];

	prepare_words(lang: string) {
		for (let j = 0; j < this.words.length; j++) {
			this.words[j].translate = this.translates[lang]
				? this.translates[lang][this.words[j].slug]
				: '';
		}
	}

	delete(word: Word) {
		for (let i = this.words.length - 1; i >= 0; i--) {
			if (this.words[i]._id == word._id) this.words.splice(i, 1);
		}

		this.http.post('/api/word/delete', {
			_id: word._id
		});

		this.http.post('/api/translate/delete', {
			slug: word.slug
		});
	}

	/* Translate Use */

	languages: Language[] = environment.hasOwnProperty('languages')
		? (environment as unknown as { languages: [] }).languages
		: [
				{
					code: 'en',
					name: 'English',
					origin: 'English'
				}
		  ];

	language: Language = this.languages.length
		? this.languages[0]
		: {
				code: 'en',
				name: 'English',
				origin: 'English'
		  };

	translates: any = {};

	resets: any = {};

	reset() {
		for (const slug in this.resets) {
			if (Array.isArray(this.resets[slug])) {
				for (let i = 0; i < this.resets[slug].length; i++) {
					if (
						this.translates[this.language.code] &&
						this.translates[this.language.code][slug]
					) {
						this.resets[slug][i](
							this.translates[this.language.code][slug]
						);
					} else {
						this.resets[slug][i](this._slug2name(slug));
					}
				}
			}
		}
	}

	translate(slug: string, reset?: (translate: string) => void) {
		if (!slug) return '';

		if (slug.split('.').length < 2) return slug;

		if (!this.resets[slug]) this.resets[slug] = [];

		if (reset) {
			this.resets[slug].push(reset);
		}

		if (!this.translates[this.language.code]) {
			this.translates[this.language.code] = {};
		}

		if (this.translates[this.language.code][slug]) {
			return this.translates[this.language.code][slug];
		}

		if (this.words.map((w) => w?.slug || '').filter(w => !!w).indexOf(slug) < 0) {
			this.create_word(slug);
		}

		return this._slug2name(slug);
	}

	private _created: Record<string, boolean> = {};
	private _wordsLoaded = false;
	create_word(slug: string) {
		if (this._created[slug]) {
			return;
		}

		if (this._wordsLoaded) {
			this._created[slug] = true;

			this.http.post(
				'/api/word/create',
				{
					slug: slug,
					word: this._slug2name(slug),
					page: slug.split('.')[0],
					lang: this.language.code
				},
				(word) => this.words.push(word)
			);
		} else {
			setTimeout(() => {
				this.create_word(slug);
			}, 500);
		}
	}

	update_translate(slug: string, languageCode: string, translate: string) {
		this.core.afterWhile(this, () => {
			this.http.post('/api/translate/create', {
				slug,
				translate,
				lang: languageCode
			});

			this.store.setJson('translates', this.translates);

			if (
				this.language.code === languageCode &&
				Array.isArray(this.resets[slug])
			) {
				for (let i = 0; i < this.resets[slug].length; i++) {
					if (typeof this.resets[slug][i] === 'function') {
						this.resets[slug][i]();
					}
				}
			}
		});
	}

	download_json() {
		this.http.get('/api/translate/get_translates', (obj) => {
			const dataStr =
				'data:text/json;charset=utf-8,' +
				encodeURIComponent(JSON.stringify(this.translates));

			const link = document.createElement('a');

			link.href = dataStr;

			link.download = 'translate.json';

			link.click();

			link.remove();
		});
	}

	set_language(language: Language) {
		this.language = language;

		this.store.set('language', language.code);
	}

	next_language() {
		for (let i = 0; i < this.languages.length; i++) {
			if (this.languages[i].code === this.language.code) {
				if (this.languages.length - 1 === i) {
					this.language = this.languages[0];
				} else {
					this.language = this.languages[i + 1];
				}
				break;
			}
		}

		this.store.set('language', this.language.code);
	}

	private _slug2name(slug: string) {
		return slug.substr(slug.indexOf('.') + 1);
	}
}
