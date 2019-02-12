# Angular Docgen

⚠️Experimental  
_This module is very much an experiment at the moment. I do hope to use it on a project, and if successful I will push to get it to a supported state_

This is a low level library for parsing Angular components into JSON, inspired by [react-docgen](https://github.com/react/react-docgen). The intended use case is for documenting design systems where you want full control over the visuals.

It works by usings babels typescript parser to parse an Angular component file into an Abstract Syntax Tree ([AST]()).

### Example usage (with webpack raw loader)

```ts
import parse, { ComponentDescription } from angular - docgen;
import component from "!raw-loader!./component";

const description: ComponentDescription = parse(component);
```

### Sample input

```ts
import { Component, Input } from "@angular/core";

/**
 * Component with input decorators
 */
@Component({ template: "<p>Sample</p>" })
export class SimpleComponent {
  /**
   * Is component disabled
   */
  @Input() disabled: Boolean = false;

  /**
   * Type of component
   */
  @Input() type: "primary" | "secondary" = "primary";
}
```

### Sample output

```json
{
      name: "SimpleComponent",
      description: ["Simple component with no properties"],
      inputs: [
        {
          description: ["Is component disabled"],
          name: "disabled",
          type: "Boolean",
          value: false
        },
        {
          description: ["Type of component"],
          name: "type",
          type: "String",
          options: ["primary", "secondary", "tertiary"],
          value: "primary"
        }
      ]
      outputs: []
    }
```
