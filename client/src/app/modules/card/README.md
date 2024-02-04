# ngx-card

# Step 1: Installation ngx-card
### In terminal root/client write:
waw add ngx-card

# Step 2: Write Tag(wcard)
###  In your user/page, you must write this code:
```
<wcard [align]="start"> "content" </wcard>
```

# Step 3: Importe StripeModule
### In your user/page.component.ts you must write:
```
export class YourComponent {
	public start: any = {};
	constructor() { }
}
```

# Step 4: Importe StripeModule
### In your user/page.module.ts you must import CardModule:
```
import { CardModule } from 'src/app/modules';

@NgModule({
 imports: [
  CardModule
 ]
})
```

# Step 5: Pleasant use
