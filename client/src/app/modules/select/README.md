# ngx-select

# Step 1: Installation ngx-select
### In terminal root/client write:
waw add ngx-select

# Step 2: Import SelectModule
### In your user/page.module.ts you must import SelectModule:
```
import { SelectModule } from 'src/app/modules/select/select.module';

@NgModule({
 imports: [
  SelectModule
 ]
})
```

# Step 3.1: Single
### In order to use a single option, here is an example for you:
```
<wselect 
  [items]="[
    {name:'Item1', _id:'ItemA'}, 
    {name:'Item2', _id:'ItemB'}, 
    {name:'Item3', _id:'ItemC'}
  ]">
</wselect>
```

# Step 3.2: Multiple
### In order to use a multiple option, here is an example for you:
```
<wselect 
  [items]="[
    {name:'Item1', _id:'ItemA'}, 
    {name:'Item2', _id:'ItemB'}, 
    {name:'Item3', _id:'ItemC'}]"
  [select]="['ItemA','ItemC']" 
  [multiple]="true">
</wselect> -->
```

# Step 3.3: Multiple (obj)
### In order to use one option, from the finished object here is an example for you:
```
<wselect 
  *ngIf="vr.variables?.length" 
  [items]="vr.variables" 
  [select]="[vr.variables[0]]" 
  [multiple]="true">
</wselect>
```

## Inputs

| Option        | Default                         | Description               |
| ------------- |---------------------------------| --------------------------|
| items         | `[]`                            | Objects which will be listed to selected from |
| name          | `'name'`                        | Adds the attribute E to the object if it is not present|
| value         | `_id`                           | This id of strings, numbers or objects to which `items` |
| multiple      | `false`                         | Turns on the multiple mode |
| placeholder   | `any`                           | Placeholder for the select |
| label         | `string`                        | Label of the select |
| searchable    | `false`                         | Include or not |
| select        | `{}`                            | Preselect Object |
| t_view        | `any`                           | Template customization |
| t_item        | `any`                           | Template customization |
| t_search      | `any`                           | Template customization |

## Examples of using placeholder
```
<wselect
 placeholder="Placeholder">
</wselect>
```
