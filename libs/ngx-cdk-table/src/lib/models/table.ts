import {
  EventEmitter,
  InjectionToken,
  PipeTransform,
  Type,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export type ColumnOptions<T> = {
  cdkColumn:
    | (string & keyof T)
    | {
        columnProperty: keyof T;
        cellDef: string;
      };
  headerTitle: string;
  formColumn?: DefaultInputType<T> | CustomInputType<T>;
  setColumnClassFn?: (value: T) => string;
  disabledSorting?: boolean;
  pipe?: {
    type: InjectionToken<PipeTransform>;
    args?: string[] | string | number | boolean | null;
  };
};
export type DefaultInputType<T> =
  | TextInput
  | NumberInput
  | DateInput
  | SelectInput<T>
  | CheckboxInput;

export type TextInput = {
  type: 'text';
  placeholder?: string;
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
};

export type NumberInput = {
  type: 'number';
  placeholder?: string;
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
};

export type DateInput = {
  type: 'date';
  placeholder?: string;
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
};

export type SelectInput<T> = {
  type: 'select';
  key: keyof T;
  placeholder?: string;
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
  value?: string | number;
  options: SelectOption[];
};

export type SelectOption = {
  value: string | number;
  label: string | number;
};

export type CheckboxInput = {
  type: 'checkbox';
  label?: {
    value: string;
    floatLabel?: FloatLabelOptions;
  };
};

export type FloatLabelOptions = 'always' | 'never' | 'auto';
export type CustomInputType<T> = {
  type: 'custom';
  componentRef: Type<TableInputComponent<T>>;
};

export interface TableInputComponent<T> extends ControlValueAccessor {
  element: T;
  defaultInputColumns?: DefaultInputType<T>;
  eventAction: EventEmitter<T>;
}
export interface NgxTableSortEvent<T> extends Omit<Sort, 'active'> {
  active: keyof T;
}

export type TableOptions<T> = {
  paginatorProperties?: NgxPaginationOptions;
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
