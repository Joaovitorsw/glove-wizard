/* eslint-disable @angular-eslint/component-selector */
import { CdkTable } from '@angular/cdk/table';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ColumnOptions,
  CustomTableInputType,
  DefaultInputTableType,
  MatPaginatorProperties,
  NgxPaginationOptions,
  NgxPaginatorProperties,
  NgxTableData,
  NgxTableSortEvent,
  TableOptions,
} from '../../models/table';
import {
  DefaultInputTypeRef,
  DEFAULT_INPUT_TYPE_REF,
  EXAMPLE_DEFAULT_INPUT_REF,
} from '../../tokens/default-input.ref';

@Component({
  selector: 'ngx-cdk-table',
  templateUrl: './ngx-cdk-table.component.html',
  styleUrls: ['./ngx-cdk-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCdkTableComponent<T> implements OnInit, AfterViewInit {
  @ViewChild(CdkTable) readonly cdkTable: CdkTable<T>;
  @ViewChild(MatPaginator) readonly matPaginator: MatPaginator;
  @ViewChild(MatSort) readonly matSort: MatSort;

  @Input() tableOptions: TableOptions<T>;
  @Input() columnOptions: ColumnOptions<T>[];
  @Input('dataSource') originalDataSource: T[];

  viewDataSource: T[];
  matDataSource: MatTableDataSource<T>;

  constructor(
    @Inject(DEFAULT_INPUT_TYPE_REF)
    @Optional()
    private DEFAULT_INPUT_REF: DefaultInputTypeRef<T>
  ) {}

  get displayedColumns(): string[] {
    return this.columnOptions.map((column) => this.getCdkColumnDef(column));
  }
  ngOnInit(): void {
    if (!this.DEFAULT_INPUT_REF) {
      this.DEFAULT_INPUT_REF = EXAMPLE_DEFAULT_INPUT_REF;
    }

    this.viewDataSource = this.originalDataSource.map((element, index) => {
      const ngxElement = element as NgxTableData<T>;
      ngxElement.ngxCdkTableIndex = index;
      return ngxElement;
    });
  }

  ngAfterViewInit(): void {
    const dataSource = new MatTableDataSource(this.viewDataSource);

    const { paginatorProperties } = this.tableOptions;

    if (paginatorProperties) {
      this.setPaginatorType(paginatorProperties, dataSource);
    }

    dataSource.paginator = this.matPaginator;

    dataSource.sort = this.matSort;

    this.matDataSource = dataSource;

    this.cdkTable.dataSource = dataSource;

    this.cdkTable.renderRows();
  }

  private setPaginatorType(
    paginatorProperties: NgxPaginationOptions,
    dataSource: MatTableDataSource<T>
  ) {
    if (this.isMatPaginator(paginatorProperties)) {
      paginatorProperties?.translate?.call(this, this.matPaginator);
      return;
    }

    if (this.isNgxPaginator(paginatorProperties)) {
      const { itemsPerPage, currentPage } = paginatorProperties;

      const index = (currentPage - 1) * itemsPerPage;

      const length = itemsPerPage * currentPage;

      dataSource.data = this.viewDataSource.slice(index, length);
    }
  }

  pageChangeEvent(
    event: number | PageEvent,
    options: NgxPaginatorProperties | MatPaginatorProperties
  ) {
    const { paginatorProperties } = this.tableOptions;
    if (!paginatorProperties) return;

    if (
      this.isMatPaginator(options) &&
      this.isMatPaginator(paginatorProperties) &&
      event instanceof PageEvent
    ) {
      paginatorProperties?.pageChange(event);
      return;
    }

    if (
      this.isNgxPaginator(options) &&
      this.isNgxPaginator(paginatorProperties) &&
      typeof event === 'number'
    ) {
      paginatorProperties?.pageChange(event, options);

      const { itemsPerPage } = options;

      this.matDataSource.data = this.viewDataSource.slice(
        itemsPerPage * (event - 1),
        itemsPerPage + itemsPerPage * (event - 1)
      );
    }
  }

  createInput(
    viewContainerRef: ViewContainerRef,
    element: T,
    columnOptions: ColumnOptions<T>
  ) {
    const nativeElement = viewContainerRef.element.nativeElement;

    const hasElement = !nativeElement || viewContainerRef.length >= 1;

    if (hasElement) return;

    viewContainerRef.clear();

    nativeElement.remove();

    if (this.isDefaultInputType(columnOptions)) {
      this.createDefaultInputComponent(
        columnOptions,
        viewContainerRef,
        element
      );
      return;
    }

    this.createCustomInputComponent(columnOptions, viewContainerRef, element);
  }

  private createCustomInputComponent(
    columnOptions: ColumnOptions<T>,
    viewContainerRef: ViewContainerRef,
    element: T
  ) {
    const componentType = columnOptions.formColumn as CustomTableInputType<T>;

    const { instance } = viewContainerRef.createComponent(
      componentType.componentRef
    );

    instance.element = element as NgxTableData<T>;
  }

  private createDefaultInputComponent(
    columnOptions: ColumnOptions<T>,
    viewContainerRef: ViewContainerRef,
    element: T
  ) {
    const formColumn = columnOptions.formColumn as DefaultInputTableType<T>;
    const type = formColumn.type;
    const componentRef = this.DEFAULT_INPUT_REF[type];
    const { instance } = viewContainerRef.createComponent(componentRef);

    instance.element = element as NgxTableData<T>;
    instance.defaultInputColumns = formColumn;
  }

  getCdkColumnDef(column: ColumnOptions<T>) {
    const { cdkColumn } = column;

    return typeof cdkColumn === 'string' ? cdkColumn : cdkColumn.cellDef;
  }

  sortingData(event: Sort, eventDataSource: T[]) {
    const columnActive = this.columnOptions.find(
      (column) => this.getCdkColumnDef(column) === event.active
    );

    const tableDataPropertySort =
      columnActive && this.getProperty(columnActive);

    if (!tableDataPropertySort) return;

    if (!this.tableOptions) return;

    if (!this.tableOptions.sortData) return;

    const ngxTableSortEvent = event as NgxTableSortEvent<T>;

    ngxTableSortEvent.active = tableDataPropertySort.toString() as keyof T;

    this.tableOptions.sortData(
      ngxTableSortEvent,
      eventDataSource,
      this.originalDataSource
    );

    this.ngAfterViewInit();
  }

  getProperty(column: ColumnOptions<T>) {
    return typeof column.cdkColumn === 'string'
      ? column.cdkColumn
      : column.cdkColumn.columnProperty;
  }

  isMatPaginator(
    paginator: NgxPaginationOptions
  ): paginator is MatPaginatorProperties {
    const matPaginator = paginator as MatPaginatorProperties;
    return matPaginator.isMatPaginator !== undefined;
  }

  isDefaultInputType(columnOptions: ColumnOptions<T>) {
    const { formColumn } = columnOptions;

    if (!formColumn) return false;

    const { type } = formColumn;

    return type !== 'custom';
  }

  isNgxPaginator(
    paginator: NgxPaginationOptions
  ): paginator is NgxPaginatorProperties {
    const nxgPaginator = paginator as NgxPaginatorProperties;
    return nxgPaginator.maxSize !== undefined;
  }
  setRowClass(element: T) {
    const { setRowClassFn } = this.tableOptions;

    if (setRowClassFn) {
      const rowClass = setRowClassFn(element);
      return rowClass;
    }

    const EMPTY = '';

    return EMPTY;
  }
}
