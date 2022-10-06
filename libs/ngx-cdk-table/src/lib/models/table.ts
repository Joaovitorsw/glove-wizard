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

export type ColumnOptions<T> =
  | ColumnBaseOptions<T>
  | ColumnFormOptions<T>
  | ColumnAction<T>;

export type BaseColumnOptions<T> = {
  cdkColumn: (string & keyof T) | ParcialColumnOptions<T> | 'action';

  headerTitle: string;
  canSort?: boolean;
  setColumnClassFn?: (value: T) => string;
};
export type ParcialColumnOptions<T> = {
  columnProperty: keyof T;
  cellDef: string;
};
export type ValueOf<T> = T[keyof T];

export interface ColumnAction<T> extends Omit<BaseColumnOptions<T>, 'canSort'> {
  isAction: boolean;
  clickEvent?: (value: T) => void;
  actionComponentRef: Type<TableActionComponent<T>>;
}
export type MenuAction<T> = {};
export interface ColumnFormOptions<T> extends BaseColumnOptions<T> {
  formColumn: DefaultInputTableType<T> | CustomTableInputType<T>;
}
export interface ColumnBaseOptions<T> extends BaseColumnOptions<T> {
  cellPropertyFn?: (
    element: NgxTableData<T>
  ) => string | number | boolean | undefined;
  pipe?: {
    type: InjectionToken<PipeTransform>;
    args?: string[] | string | number | boolean | null;
  };
}
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
  disabled?: boolean;
  placeholder?: string;
  formControl: FormControlProperties;
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
  formControl: FormControlProperties;
  componentRef: Type<TableInputComponent<T>>;
};

export type TableEvent<T> = {
  event: PageEvent | Sort | string;
  element?: NgxTableData<T>;
};

export interface TableInputComponent<T> {
  element: NgxTableData<T>;
  defaultInputColumns?: DefaultInputTableType<T> | CustomTableInputType<T>;
  eventAction: EventEmitter<TableEvent<T>>;
  setDisabledState: (isDisabled: boolean) => void;
}
export interface TableActionComponent<T> {
  element: NgxTableData<T>;
  eventAction: EventEmitter<TableEvent<T>>;
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
