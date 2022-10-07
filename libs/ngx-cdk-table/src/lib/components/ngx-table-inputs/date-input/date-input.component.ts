import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractTableInputControl } from '../../../models/abstract-table-input-control';
import {
  DateTableInput,
  NgxTableData,
  TableEvent,
} from '../../../models/table';
export type DateInputValue = {
  value: Date | any;
};

export type DateRangeValue = Partial<{
  startDate: Date | any;
  endDate: Date | any;
}>;

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
    const { formControl, key } = this.defaultInputColumns;

    const selectedOption = this.element[key];

    const rangeGroup = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
    const dateControl = new FormControl();

    this.control = this.defaultInputColumns.rangeDate
      ? rangeGroup
      : dateControl;

    const valueChanges$ = formControl.valueChanges
      ? formControl.valueChanges(
          this.control.valueChanges,
          this.control,
          this.element
        )
      : this.control.valueChanges;

    valueChanges$.subscribe((value: any) => {
      this.element[key] = value;
    });

    if (selectedOption) {
      const method = this.isFormControl(this.control)
        ? 'setValue'
        : 'patchValue';

      this.control[method](selectedOption);
    }

    this.defaultInputColumns.formControl.controls[
      this.element.ngxCdkTableIndex
    ] = this.control;
  }

  isFormControl(control: FormControl | FormGroup): control is FormControl {
    return control instanceof FormControl;
  }
}
