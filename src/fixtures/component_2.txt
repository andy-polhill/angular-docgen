import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({})
export default class SampleComponent {
  @Input() disabled: Boolean = false;
}
