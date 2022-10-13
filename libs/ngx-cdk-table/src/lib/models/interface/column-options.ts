import { InjectionToken, PipeTransform, Type } from '@angular/core';
import { NgxTableData, TableActionComponent } from './table';
import { CustomTableInputType, DefaultInputTableType } from './table-input';

export type ColumnOptions<T> = Array<ColumnType<T>>;

export type ColumnType<T> =
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
export interface ColumnAction<T> extends Omit<BaseColumnOptions<T>, 'canSort'> {
  clickEvent?: (value: T) => void;
  actionComponentRef: Type<TableActionComponent<T>>;
}
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
