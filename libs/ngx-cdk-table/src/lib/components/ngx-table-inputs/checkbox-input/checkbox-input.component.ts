import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractTableInputControl } from '../../../models/abstract-table-input-control';
import {
  NgxTableData,
  NumberTableInput,
  TableEvent,
} from '../../../models/table';

@Component({
  selector: 'glove-wizard-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxInputComponent<T> extends AbstractTableInputControl<T> {
  override control = new FormControl();
  override element: NgxTableData<T>;
  override defaultInputColumns: NumberTableInput<T>;
  override eventAction: EventEmitter<TableEvent<T>> = new EventEmitter<
    TableEvent<T>
  >();
  value: any;
}
