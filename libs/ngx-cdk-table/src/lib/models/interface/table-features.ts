import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export type ValueOf<T> = T[keyof T];

export interface NgxTableSortEvent<T> extends Omit<Sort, 'active'> {
  active: keyof T;
}

export type NgxPaginationOptions =
  | MatPaginatorProperties
  | NgxPaginatorProperties;

export type MatPaginatorProperties = {
  isMatPaginator: boolean;
  pageSize: number;
  pageSizeOptions: number[];
  isServerSide?: boolean;
  translate?: (paginator: MatPaginator) => void;
  pageChange: (event: PageEvent) => void;
};
export type NgxPaginatorProperties = {
  isServerSide?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  maxSize: number;
  pageChange: (event: number, options: NgxPaginatorProperties) => void;
};
