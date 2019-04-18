# Angular Docgen

## ⚠️ Warning Experimental  
_This module is very much an experiment at the moment. I do hope to use it on a project, and if successful I will push to get it to a supported state_

_It does work in it's current form with the example component, however the selectors used to access properties may not be robust on a more complete component. The principle at least should work, and extending it probably wouldn't be to bad_.

---

<br />

This is a low level library for parsing Angular components into JSON, inspired by [react-docgen](https://github.com/react/react-docgen). The intended use case is for documenting design systems where you want full control over the visuals.

Use in conjunction with [angular-docgen-loader](https://github.com/thatguynamedandy/angular-docgen-loader) to load the component definitions into your angular project.

### Sample input

```ts
import { Component, Input } from "@angular/core";

/**
 * A nice button component
 */
@Component({
  selector: "my-button",
  templateUrl: "template.html",
  styleUrls: ["styles1.css", "styles2.css"]
})
export class Button {
  /**
   * Is button disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Button variant
   */
  @Input() variant: "primary" | "secondary" = "primary";

  /**
   * onClick output
   */
  @Output() onClick = new EventEmitter<boolean>();
}
```

### Sample output

```json
{
  "component": {
    "name": "Button",
    "description": "A nice button component",
    "templateUrl": "template.html",
    "selector": "my-button",
    "styleUrls": [
      "styles1.css",
      "styles2.css",
    ],
  },
  "inputs": [{
    "description": "Is button disabled",
    "name": "disabled",
    "type": "boolean",
    "value": false
  }, {
    "description": "Button variant",
    "name": "type",
    "variant": "string",
    "options": ["primary", "secondary"],
    "value": "primary"
  }],
  "outputs": [{
    "description": "onClick output",
    "name": "onClick",
    "value": "new EventEmitter<boolean>()",
  }]
}
```
It works by using the typescript parser to parse an Angular component file into an Abstract Syntax Tree (AST).

If you fancy a go at working with this I recommend using astexplorer.net. Paste the sample component in, use the Typescript loader and then you can see the AST that you need to navigate.
