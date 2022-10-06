import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CustomTableInputType,
  DefaultInputTableType,
  NgxTableData,
  TableEvent,
  TableInputComponent,
} from './table';

@Injectable()
export abstract class AbstractTableInputControl<T>
  implements TableInputComponent<T>, OnInit
{
  element: NgxTableData<T>;
  defaultInputColumns: DefaultInputTableType<T> | CustomTableInputType<T>;
  eventAction: EventEmitter<TableEvent<T>>;

  control: FormControl | FormGroup;

  ngOnInit(): void {
    let controlValueChanges$ = this.control.valueChanges;

    if (!this.defaultInputColumns) return;

    const formControl = this.defaultInputColumns.formControl;

    this.defaultInputColumns.formControl.controls[
      this.element.ngxCdkTableIndex
    ] = this.control;

    const hasCustomValueChanges = formControl && formControl.valueChanges;

    if (hasCustomValueChanges) {
      controlValueChanges$ = hasCustomValueChanges(
        controlValueChanges$,
        this.control,
        this.element
      );
    }

    const { key } = this.defaultInputColumns as {
      key: keyof T;
    };

    controlValueChanges$.subscribe((value) => {
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
}
