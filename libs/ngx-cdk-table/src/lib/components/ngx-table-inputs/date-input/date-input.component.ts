import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractTableInputControl } from '../../../models/class/abstract-table-input-control';
import { NgxTableData, TableEvent } from '../../../models/interface/table';
import {
  DateInputValue,
  DateRangeValue,
  DateTableInput,
} from '../../../models/interface/table-input';

@Component({
  selector: 'glove-wizard-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent<T> extends AbstractTableInputControl<T> {
  override element: NgxTableData<T> & {
    dateInput: DateRangeValue | DateInputValue;
  };
  override defaultInputColumns: DateTableInput<T>;
  override eventAction: EventEmitter<TableEvent<T>> = new EventEmitter<
    TableEvent<T>
  >();
  override control: FormControl | FormGroup;
  value: any;

  override ngOnInit(): void {
    const { formControlProperties, key } = this.defaultInputColumns;

    const rangeGroup = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
    const dateControl = new FormControl();

    this.control = this.defaultInputColumns.rangeDate
      ? rangeGroup
      : dateControl;

    const valueChanges$ = formControlProperties?.valueChanges
      ? formControlProperties.valueChanges(
          this.control.valueChanges,
          this.control,
          this.element
        )
      : this.control.valueChanges;

    if (!this.defaultInputColumns.formControlProperties.controls) {
      this.defaultInputColumns.formControlProperties.controls = [];
    }
    this.defaultInputColumns.formControlProperties.controls[
      this.element.ngxCdkTableIndex
    ] = this.control;

    valueChanges$.subscribe((value: any) => {
      this.element[key] = value;
    });
  }
}
