# ngx-input

## Installation

```sh
waw add ngx-input
```

## Usage
```
import { InputModule } from 'src/app/modules';
@NgModule({
	imports: [
		InputModule
	]
})

```
```html
<winput ngDefaultControl [(ngModel)]="value.input" disabled="true" (ngModelChange)="function()" label="This is a label text for input" type="text" name="waw" placeholder="This is a placeholder text for input"></winput>
```
## Arguments
```
label: string | Displayed text
model: string | Returns the input text
modelChange | Called when model changes
placeholder | Displayed input placeholder
name | Displayed input  name
type | Set input type
disabled | Make input disabled
```
