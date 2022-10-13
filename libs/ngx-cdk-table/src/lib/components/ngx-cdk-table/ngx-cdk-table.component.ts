/* eslint-disable @angular-eslint/component-selector */
import { CdkTable } from '@angular/cdk/table';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ColumnAction,
  ColumnBaseOptions,
  ColumnFormOptions,
  ColumnOptions,
  ColumnType,
} from '../../models/interface/column-options';
import {
  NgxTableData,
  TableEvent,
  TableOptions,
} from '../../models/interface/table';
import {
  MatPaginatorProperties,
  NgxPaginationOptions,
  NgxPaginatorProperties,
  NgxTableSortEvent,
} from '../../models/interface/table-features';
import {
  CustomTableInputType,
  DefaultInputTableType,
} from '../../models/interface/table-input';

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
export class NgxCdkTableComponent<T>
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChild(CdkTable) readonly cdkTable: CdkTable<T>;
  @ViewChild(MatPaginator) readonly matPaginator: MatPaginator;
  @ViewChild(MatSort) readonly matSort: MatSort;

  @Input() tableOptions: TableOptions<T>;
  @Input() columnOptions: ColumnOptions<T>;
  @Input() dataSource: T[];

  @Output() eventAction = new EventEmitter<TableEvent<T>>();

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

    this.viewDataSource = this.dataSource.map((element, index) => {
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

    if (this.cdkTable) {
      this.cdkTable.dataSource = dataSource;
      this.cdkTable.renderRows();
    }
  }

  private setPaginatorType(
    paginatorProperties: NgxPaginationOptions,
    dataSource: MatTableDataSource<T>
  ) {
    if (this.isMatPaginator(paginatorProperties)) {
      paginatorProperties?.translate?.call(this, this.matPaginator);
      return;
    }

    if (
      this.isNgxPaginator(paginatorProperties) &&
      !paginatorProperties.isServerSide
    ) {
      const { itemsPerPage, currentPage } = paginatorProperties;

      const index = (currentPage - 1) * itemsPerPage;

      const length = itemsPerPage * currentPage;

      dataSource.data = this.viewDataSource.slice(index, length);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dataSource } = changes;
    if (dataSource) {
      this.ngOnInit();
      this.ngAfterViewInit();
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

  createActionComponent(
    viewContainerRef: ViewContainerRef,
    element: T,
    columnOptions: ColumnAction<T>
  ) {
    const nativeElement = viewContainerRef.element
      .nativeElement as HTMLDivElement;

    const hasElement = viewContainerRef.length <= 0;

    if (!hasElement || nativeElement?.tagName != 'DIV') return;

    viewContainerRef.clear();

    nativeElement.remove();

    const { instance } = viewContainerRef.createComponent(
      columnOptions.actionComponentRef
    );

    instance.element = element as NgxTableData<T>;
    instance?.eventAction?.subscribe((element) =>
      this.eventAction.emit(element)
    );
  }

  createInput(
    viewContainerRef: ViewContainerRef,
    element: T,
    columnOptions: ColumnFormOptions<T>
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
    columnOptions: ColumnFormOptions<T>,
    viewContainerRef: ViewContainerRef,
    element: T
  ) {
    const componentType = columnOptions.formColumn as CustomTableInputType<T>;

    const { instance } = viewContainerRef.createComponent(
      componentType.componentRef
    );

    instance.element = element as NgxTableData<T>;
    instance?.eventAction?.subscribe((element) =>
      this.eventAction.emit(element)
    );
  }

  private createDefaultInputComponent(
    columnOptions: ColumnFormOptions<T>,
    viewContainerRef: ViewContainerRef,
    element: T
  ) {
    const formColumn = columnOptions.formColumn as DefaultInputTableType<T>;
    const type = formColumn.type;
    const componentRef = this.DEFAULT_INPUT_REF[type];
    const { instance } = viewContainerRef.createComponent(componentRef);

    instance.element = element as NgxTableData<T>;
    instance.defaultInputColumns = formColumn;

    instance?.eventAction?.subscribe((element) =>
      this.eventAction.emit(element)
    );
  }

  getCdkColumnDef(column: ColumnType<T>) {
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
      this.dataSource
    );

    this.ngAfterViewInit();
  }

  isDefaultInputType(columnOptions: ColumnFormOptions<T>) {
    const { formColumn } = columnOptions;

    if (!formColumn) return false;

    const { type } = formColumn;

    return type !== 'custom';
  }

  setRowClass(element: T) {
    const { setRowClassFn } = this.tableOptions;

    if (setRowClassFn) {
      const rowClass = setRowClassFn(element);
      return rowClass;
    }

    const EMPTY_STRING = '';

    return EMPTY_STRING;
  }

  getProperty(column: ColumnType<T>) {
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
  isColumnFormOptions(
    columnOptions: ColumnType<T>
  ): columnOptions is ColumnFormOptions<T> {
    const formColumnOptions = columnOptions as ColumnFormOptions<T>;
    return formColumnOptions.formColumn !== undefined;
  }
  isColumnBaseOptions(
    columnOptions: ColumnType<T>
  ): columnOptions is ColumnBaseOptions<T> {
    const formColumnOptions = columnOptions as ColumnBaseOptions<T>;
    return formColumnOptions.canSort !== undefined;
  }
  isColumnAction(
    columnOptions: ColumnBaseOptions<T> | ColumnFormOptions<T> | ColumnAction<T>
  ): columnOptions is ColumnAction<T> {
    const formColumnOptions = columnOptions as ColumnAction<T>;
    return formColumnOptions.actionComponentRef !== undefined;
  }

  isNgxPaginator(
    paginator: NgxPaginationOptions
  ): paginator is NgxPaginatorProperties {
    const nxgPaginator = paginator as NgxPaginatorProperties;
    return nxgPaginator.maxSize !== undefined;
  }
}
