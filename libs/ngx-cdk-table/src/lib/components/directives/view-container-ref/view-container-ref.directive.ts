import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[viewContainerRef]',
  exportAs: 'viewContainerRef',
})
export class ViewContainerRefDirective {
  constructor(readonly viewContainerRef: ViewContainerRef) {}
}
