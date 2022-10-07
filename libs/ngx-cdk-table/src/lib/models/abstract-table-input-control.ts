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
    if (!this.defaultInputColumns) return;

    const formControl = this.defaultInputColumns.formControl;

    this.defaultInputColumns.formControl.controls[
      this.element.ngxCdkTableIndex
    ] = this.control;

    const { key } = this.defaultInputColumns as {
      key: keyof T;
    };

    const valueChanges$ = formControl.valueChanges
      ? formControl.valueChanges(
          this.control.valueChanges,
          this.control,
          this.element
        )
      : this.control.valueChanges;

    valueChanges$.subscribe((value: NgxTableData<T> | any) => {
      this.element[key] = value;
    });
    const selectedOption = this.element[key];

    if (selectedOption) {
      this.control.setValue(selectedOption);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    const method = isDisabled ? 'disable' : 'enable';
    this.control[method]();
  }
}
