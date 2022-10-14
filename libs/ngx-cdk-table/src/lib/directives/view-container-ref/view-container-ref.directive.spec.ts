import { ViewContainerRef } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { ViewContainerRefDirective } from './view-container-ref.directive';
describe('ViewContainerRefDirective', () => {
  it('should create an instance', () => {
    const viewContainerRef = mock(ViewContainerRef);
    const viewContainerRefInstance = instance(viewContainerRef);
    const directive = new ViewContainerRefDirective(viewContainerRefInstance);
    expect(directive).toBeTruthy();
  });
});
