import {
  EventEmitter,
  InjectionToken,
  PipeTransform,
  Type,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';

export type NgxTableData<T> = T & {
  [key: string]: any;
  ngxCdkTableIndex: number;
};

export type ColumnOptions<T> = {
  cdkColumn:
    | (string & keyof T)
    | {
        columnProperty: keyof T;
        cellDef: string;
      };
  headerTitle: string;
  formColumn?: DefaultInputTableType<T> | CustomTableInputType<T>;
  setColumnClassFn?: (value: T) => string;
  canSort?: boolean;
  pipe?: {
    type: InjectionToken<PipeTransform>;
    args?: string[] | string | number | boolean | null;
  };
};
export type DefaultInputTableType<T> =
  | TextTableInput<T>
  | NumberTableInput<T>
  | DateTableInput<T>
  | SelectTableInput<T>
  | CheckboxTableInput<T>;

export interface DateTableInput<T> extends Omit<TableInput<T>, 'key'> {
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
}

export interface NumberTableInput<T> extends TableInput<T> {
  type: 'number';
}

export interface CheckboxTableInput<T> extends TableInput<T> {
  type: 'checkbox';
}
export interface SelectTableInput<T> extends TableInput<T> {
  type: 'select';
  options: SelectOption[] | Observable<SelectOption[]>;
}
export type TableInput<T> = {
  key: keyof T;
  readonly?: boolean;
  placeholder?: string;
  formControl?: FormControlProperties;
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
};

export type FormControlProperties = {
  controls: FormControl[] | FormGroup[];
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
  formControl?: FormControlProperties;
  componentRef: Type<TableInputComponent<T>>;
};

export interface TableInputComponent<T> {
  element: NgxTableData<T>;
  defaultInputColumns?: DefaultInputTableType<T> | CustomTableInputType<T>;
  eventAction: EventEmitter<T>;
  setDisabledState: (isDisabled: boolean) => void;
}

export interface NgxTableSortEvent<T> extends Omit<Sort, 'active'> {
  active: keyof T;
}

export type TableOptions<T> = {
  paginatorProperties?: NgxPaginationOptions;
  setRowClassFn?: (value: T) => string;
  floatOptions?: {
    hasHeader?: boolean;
    hasFooter?: boolean;
  };
  sortData?: (
    sort: NgxTableSortEvent<T>,
    eventDataSource: T[],
    dataSource: T[]
  ) => T[];
};

export type NgxPaginationOptions =
  | MatPaginatorProperties
  | NgxPaginatorProperties;

export type MatPaginatorProperties = {
  isMatPaginator: boolean;
  pageSize: number;
  pageSizeOptions: number[];
  translate?: (paginator: MatPaginator) => void;
  pageChange: (event: PageEvent) => void;
};
export type NgxPaginatorProperties = {
  previousLabel?: string;
  nextLabel?: string;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  maxSize: number;
  pageChange: (event: number, options: NgxPaginatorProperties) => void;
};
