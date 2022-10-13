import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AbstractTableInputControl } from '../../../models/class/abstract-table-input-control';
import { NgxTableData, TableEvent } from '../../../models/interface/table';
import {
  SelectOption,
  SelectTableInput,
} from '../../../models/interface/table-input';

@Component({
  selector: 'glove-wizard-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent<T> extends AbstractTableInputControl<T> {
  override control = new FormControl();
  override element: NgxTableData<T>;
  override defaultInputColumns: SelectTableInput<T>;
  override eventAction: EventEmitter<TableEvent<T>> = new EventEmitter<
    TableEvent<T>
  >();
  value: any;

  createSelectOptions(): Observable<SelectOption[]> {
    if (this.defaultInputColumns.options instanceof Observable) {
      return this.defaultInputColumns.options;
    }
    return of(this.defaultInputColumns.options);
  }
}
