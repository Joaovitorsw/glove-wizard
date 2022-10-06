import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CustomTableInputType,
  DefaultInputTableType,
  FormControlProperties,
  NgxTableData,
  TableInputComponent,
} from './table';

@Injectable()
export abstract class AbstractTableInputControl<T>
  implements TableInputComponent<T>, OnInit
{
  element: NgxTableData<T>;
  defaultInputColumns:
    | DefaultInputTableType<T>
    | CustomTableInputType<T>
    | undefined;
  eventAction: EventEmitter<T>;
  control: FormControl | FormGroup;

  ngOnInit(): void {
    let controlValueChanges = this.control.valueChanges;

    if (!this.defaultInputColumns) return;

    const formControl = this.createFormControlOptions(
      this.defaultInputColumns,
      this.element,
      this.control
    );

    const hasCustomValueChanges = formControl && formControl.valueChanges;

    if (hasCustomValueChanges) {
      controlValueChanges = hasCustomValueChanges(
        controlValueChanges,
        this.control,
        this.element
      );
    }

    const { key } = this.defaultInputColumns as {
      key: keyof T;
    };

    controlValueChanges.subscribe((value) => {
      this.element[key] = value;
    });
    const optionSelected = this.element[key];

    if (optionSelected) {
      this.control.setValue(optionSelected);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    const method = isDisabled ? 'disable' : 'enable';
    this.control[method]();
  }
  createFormControlOptions(
    tableInput: DefaultInputTableType<T> | CustomTableInputType<T> | undefined,
    element: NgxTableData<T>,
    control: FormControl | FormGroup
  ) {
    if (!tableInput) {
      tableInput = {} as DefaultInputTableType<T>;
    }
    if (!tableInput.formControl)
      tableInput.formControl = {} as FormControlProperties;
    const { formControl } = tableInput;

    if (!formControl.controls) formControl.controls = [];
    formControl.controls[element.ngxCdkTableIndex] = control;

    return formControl;
  }
}
