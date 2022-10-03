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
  CustomInputType,
  DefaultInputType,
  MatPaginatorProperties,
  NgxPaginationOptions,
  NgxPaginatorProperties,
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

  constructor(
    @Inject(DEFAULT_INPUT_TYPE_REF)
    @Optional()
    private DEFAULT_INPUT_REF: DefaultInputTypeRef<T>
  ) {}

  viewDataSource: T[];
  matDataSource: MatTableDataSource<T>;

  get displayedColumns(): string[] {
    return this.columnOptions.map((column) => {
      return this.getCdkColumnDef(column);
    });
  }
  ngOnInit(): void {
    if (!this.DEFAULT_INPUT_REF) {
      this.DEFAULT_INPUT_REF = EXAMPLE_DEFAULT_INPUT_REF;
    }

    this.viewDataSource = [...this.originalDataSource];
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
      const index =
        (paginatorProperties.currentPage - 1) *
        paginatorProperties.itemsPerPage;

      const length =
        paginatorProperties.itemsPerPage * paginatorProperties.currentPage;

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
      const formColumn = columnOptions.formColumn as DefaultInputType<T>;
      const componentRef = this.DEFAULT_INPUT_REF[formColumn.type];
      const viewComponentRef = viewContainerRef.createComponent(componentRef);
      viewComponentRef.instance.element = element;
      viewComponentRef.instance.defaultInputColumns = formColumn;
      return;
    }

    const componentType = columnOptions.formColumn as CustomInputType<T>;
    const componentRef = viewContainerRef.createComponent(
      componentType.componentRef
    );
    componentRef.instance.element = element;
  }

  getCdkColumnDef(column: ColumnOptions<T>) {
    return typeof column.cdkColumn === 'string'
      ? column.cdkColumn
      : column.cdkColumn.cellDef;
  }

  sortingData(event: Sort, eventDataSource: T[]) {
    const columnActive = this.columnOptions.find(
      (column) => this.getCdkColumnDef(column) === event.active
    );

    const property = columnActive && this.getProperty(columnActive);

    if (!property) return;

    if (!this.tableOptions) return;

    if (!this.tableOptions.sortData) return;

    const ngxTableSortEvent = event as NgxTableSortEvent<T>;

    ngxTableSortEvent.active = property.toString() as keyof T;

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
    return columnOptions.formColumn?.type !== 'custom';
  }

  isNgxPaginator(
    paginator: NgxPaginationOptions
  ): paginator is NgxPaginatorProperties {
    const nxgPaginator = paginator as NgxPaginatorProperties;
    return nxgPaginator.maxSize !== undefined;
  }
}
