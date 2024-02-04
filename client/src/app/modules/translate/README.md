# Ngx Translate Module

## Attribute use
```
<span translate>Common.No</span>
```
## Pipe use
```
<input placeholder="{{'Common.No'|translate}}" />

```
## Service use
```
constructor(private _translate: TranslateService) {
	console.log(this._translate.translate('Common.No'));
}
```
