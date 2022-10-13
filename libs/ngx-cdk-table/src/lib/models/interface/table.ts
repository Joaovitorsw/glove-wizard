import { EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { NgxPaginationOptions, NgxTableSortEvent } from './table-features';
import {
  CustomTableInputType,
  DefaultInputTableType,
  TableControl,
} from './table-input';

export type NgxTableData<T> = T & {
  [key: string]: any;
  ngxCdkTableIndex: number;
};

export type TableEvent<T> = {
  event: PageEvent | Sort | string;
  element?: NgxTableData<T>;
};

export interface TableInputComponent<T> {
  control: TableControl;
  element: NgxTableData<T>;
  defaultInputColumns?: DefaultInputTableType<T> | CustomTableInputType<T>;
  eventAction: EventEmitter<TableEvent<T>>;
  setDisabledState: (isDisabled: boolean) => void;
}
export interface TableActionComponent<T> {
  element: NgxTableData<T>;
  eventAction: EventEmitter<TableEvent<T>>;
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
