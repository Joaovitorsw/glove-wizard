import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { DefaultInputType, TableInputComponent } from '../../../models/table';

@Component({
  selector: 'glove-wizard-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent
  implements TableInputComponent<TextInputComponent>
{
  element: TextInputComponent;
  defaultInputColumns: DefaultInputType<TextInputComponent>;
  eventAction: EventEmitter<TextInputComponent>;

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
}
