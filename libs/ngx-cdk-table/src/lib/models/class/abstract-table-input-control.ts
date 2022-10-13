import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import {
  NgxTableData,
  TableEvent,
  TableInputComponent,
} from '../interface/table';
import { ValueOf } from '../interface/table-features';
import {
  CustomTableInputType,
  DefaultInputTableType,
} from '../interface/table-input';

@Injectable()
export abstract class AbstractTableInputControl<T>
  implements TableInputComponent<T>, OnInit
{
  element: NgxTableData<T>;
  defaultInputColumns: DefaultInputTableType<T> | CustomTableInputType<T>;
  eventAction: EventEmitter<TableEvent<T>>;

  control: FormControl | FormGroup;
  valueChanges$: any;

  ngOnInit(): void {
    if (!this.defaultInputColumns) throw new Error('No input columns');

    const { key } = this.defaultInputColumns as {
      key: keyof T;
    };
    const selectedOption = this.element[key];

    const formControlProperties =
      this.defaultInputColumns.formControlProperties;

    if (!this.defaultInputColumns.formControlProperties) {
      this.defaultInputColumns.formControlProperties = {
        controls: [],
      };
    }

    if (!this.defaultInputColumns.formControlProperties.controls) {
      this.defaultInputColumns.formControlProperties.controls = [];
    }

    this.defaultInputColumns.formControlProperties.controls[
      this.element.ngxCdkTableIndex
    ] = this.control;

    this.valueChanges$ =
      formControlProperties.valueChanges?.(
        this.control.valueChanges,
        this.control,
        this.element
      ) ?? this.control.valueChanges;

    this.valueChanges$
      .pipe(distinctUntilChanged())
      .subscribe((value: ValueOf<NgxTableData<T>>) => {
        this.element[key] = value;
      });

    if (formControlProperties?.disabled) {
      this.setDisabledState(formControlProperties?.disabled);
    }

    if (selectedOption) {
      const method = this.isFormControl(this.control)
        ? 'setValue'
        : 'patchValue';

      this.control[method](selectedOption);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    const method = isDisabled ? 'disable' : 'enable';
    this.control[method]();
  }

  isFormControl(control: FormControl | FormGroup): control is FormControl {
    return control instanceof FormControl;
  }
}
