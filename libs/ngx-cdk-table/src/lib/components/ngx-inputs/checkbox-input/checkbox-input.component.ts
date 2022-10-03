import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { TableInputComponent } from '../../../models/table';

@Component({
  selector: 'glove-wizard-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxInputComponent
  implements OnInit, TableInputComponent<CheckboxInputComponent>
{
  constructor() {}
  element: CheckboxInputComponent;
  eventAction: EventEmitter<CheckboxInputComponent>;
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
