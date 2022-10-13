import { Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TableInputComponent } from './table';

export type DefaultInputTableType<T> =
  | TextTableInput<T>
  | NumberTableInput<T>
  | DateTableInput<T>
  | SelectTableInput<T>
  | CheckboxTableInput<T>;

export interface DateTableInput<T> extends TableInput<T> {
  type: 'date';
  rangeDate?: {
    startDatePlaceholder?: string;
    endDatePlaceholder?: string;
    value?: {
      startDate: Date;
      endDate: Date;
    };
  };
}

export interface TextTableInput<T> extends TableInput<T> {
  type: 'text';
  formColumn?: DefaultInputTableType<T>;
}

export interface NumberTableInput<T> extends TableInput<T> {
  type: 'number';
  formColumn?: DefaultInputTableType<T>;
}

export interface CheckboxTableInput<T> extends TableInput<T> {
  type: 'checkbox';
  formColumn?: DefaultInputTableType<T>;
}
export interface SelectTableInput<T> extends TableInput<T> {
  type: 'select';
  formColumn?: DefaultInputTableType<T>;
  options: SelectOption[] | Observable<SelectOption[]>;
}

export type TableInput<T> = {
  key: keyof T;
  placeholder?: string;
  formControlProperties: FormControlProperties;
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
};

export type TableControl = FormControl<any> | FormGroup<any> | undefined;

export type FormControlProperties = {
  controls?: FormControl[] | FormGroup[];
  readonly?: boolean;
  disabled?: boolean;
  valueChanges?: (
    valueChanges$: Observable<any>,
    control: FormControl | FormGroup,
    element: any
  ) => Observable<any>;
};

export type FloatLabelOptions = 'always' | 'never' | 'auto';

export type SelectOption = {
  value: string | number;
  label: string | number;
};

export type CustomTableInputType<T> = {
  type: 'custom';
  formControlProperties: FormControlProperties;
  componentRef: Type<TableInputComponent<T>>;
};

export type DateInputValue = {
  value: Date | any;
};

export type DateRangeValue = Partial<{
  startDate: Date | any;
  endDate: Date | any;
}>;
