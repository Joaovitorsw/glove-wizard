import { InjectionToken, Type } from '@angular/core';
import { CheckboxInputComponent } from '../components/ngx-table-inputs/checkbox-input/checkbox-input.component';
import { DateInputComponent } from '../components/ngx-table-inputs/date-input/date-input.component';
import { NumberInputComponent } from '../components/ngx-table-inputs/number-input/number-input.component';
import { SelectInputComponent } from '../components/ngx-table-inputs/select-input/select-input.component';
import { TextInputComponent } from '../components/ngx-table-inputs/text-input/text-input.component';
import { TableInputComponent } from '../models/interface/table';

export const EXAMPLE_DEFAULT_INPUT_REF: DefaultInputTypeRef<any> = {
  text: TextInputComponent,
  number: NumberInputComponent,
  date: DateInputComponent,
  select: SelectInputComponent,
  checkbox: CheckboxInputComponent,
};
export type DefaultInputTypeRef<T> = {
  text: Type<TableInputComponent<T>>;
  number: Type<TableInputComponent<T>>;
  date: Type<TableInputComponent<T>>;
  select: Type<TableInputComponent<T>>;
  checkbox: Type<TableInputComponent<T>>;
};

export const DEFAULT_INPUT_TYPE_REF = new InjectionToken<
  DefaultInputTypeRef<any>
>('DefaultInputTypeRef');
