import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractTableInputControl } from '../../../models/class/abstract-table-input-control';
import { NgxTableData, TableEvent } from '../../../models/interface/table';
import { NumberTableInput } from '../../../models/interface/table-input';

@Component({
  selector: 'glove-wizard-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent<T> extends AbstractTableInputControl<T> {
  override control = new FormControl();
  override element: NgxTableData<T>;
  override defaultInputColumns: NumberTableInput<T>;
  override eventAction: EventEmitter<TableEvent<T>> = new EventEmitter<
    TableEvent<T>
  >();
  value: any;
}
