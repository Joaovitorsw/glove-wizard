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
    const optionSelected = this.element.dateInput;

    const rangeGroup = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
    const dateControl = new FormControl();

    this.control = this.defaultInputColumns.rangeDate
      ? rangeGroup
      : dateControl;

    if (optionSelected) {
      const method = this.isFormControl(this.control)
        ? 'setValue'
        : 'patchValue';

      this.control[method](optionSelected);
    }

    let controlValueChanges = this.control.valueChanges;

    const { formControl } = this.defaultInputColumns;

    if (formControl && formControl.valueChanges) {
      controlValueChanges = formControl.valueChanges(
        controlValueChanges,
        this.control,
        this.element
      );
    }

    controlValueChanges.subscribe((value) => {
      this.element.dateInput = value;
    });
  }

  isFormControl(control: FormControl | FormGroup): control is FormControl {
    return control instanceof FormControl;
  }
}
