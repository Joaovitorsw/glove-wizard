import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  COLUMN_OPTIONS,
  DATA,
  NgxCdkTableModule,
  NGX_PAGINATOR_OPTIONS,
  SUCCESS_CLASS,
  TABLE_OPTIONS,
  TestUser,
  WARNING_CLASS,
} from '@glove-wizard/ngx-cdk-table';
import { DEFAULT_PIPES_PROVIDERS } from '../../models/generic-pipe';
import { CURRENCY_PIPE } from '../../tokens/generic-pipe.token';

const THREE_COLUMNS_OPTIONS = [
  {
    headerTitle: 'Nome do usuário',
    cdkColumn: 'name',
    setColumnClassFn: (element: TestUser) => {
      return element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;
    },
  },
  {
    headerTitle: 'Sobrenome do usuário',
    cdkColumn: 'surname',
    setColumnClassFn: (element: TestUser) => {
      return element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;
    },
  },
  {
    headerTitle: 'Moeda do usuário',
    disabledSorting: false,
    cdkColumn: {
      cellDef: 'moeda',
      columnProperty: 'currency',
    },
    pipe: {
      type: CURRENCY_PIPE,
      args: 'BRL',
    },
    setColumnClassFn: (element: TestUser) => {
      return element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;
    },
  },
];

import { NgxCdkTableComponent } from './ngx-cdk-table.component';

describe('NgxCdkTableComponent', () => {
  let component: NgxCdkTableComponent<any>;
  let fixture: ComponentFixture<NgxCdkTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCdkTableModule],
      declarations: [NgxCdkTableComponent],
      providers: [DEFAULT_PIPES_PROVIDERS],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxCdkTableComponent);
    component = fixture.componentInstance;
    component.tableOptions = TABLE_OPTIONS;
    component.dataSource = DATA;
    component.columnOptions = COLUMN_OPTIONS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create table with 3 columns', () => {
    component.tableOptions = {};
    component.columnOptions = THREE_COLUMNS_OPTIONS;
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table');
    const columns = table.querySelectorAll('th');
    expect(columns.length).toBe(3);
  });

  it('should sort data', () => {
    component.sortingData({ active: 'id', direction: 'asc' }, DATA);
    DATA.sort((a, b) => a.id - b.id);
    const [firstElement] = DATA;
    const [firstElementComponent] = component.viewDataSource;
    expect(firstElementComponent).toBe(firstElement);
  });

  it('should render ngx-paginator-template', () => {
    component.tableOptions = {
      ...TABLE_OPTIONS,
      paginatorProperties: NGX_PAGINATOR_OPTIONS,
    };
    component.dataSource = DATA;
    component.columnOptions = COLUMN_OPTIONS;
    fixture.detectChanges();

    const paginatorTemplate = fixture.nativeElement.querySelector(
      'pagination-controls'
    );

    expect(paginatorTemplate).toBeTruthy();
  });

  it('should subscribe in page change event', () => {
    const pageChanged = 2;
    component.tableOptions = {
      ...TABLE_OPTIONS,
      paginatorProperties: {
        ...NGX_PAGINATOR_OPTIONS,
        pageChange: (event: number, options) => {
          expect(event).toBe(pageChanged);
        },
      },
    };
    component.dataSource = DATA;
    component.columnOptions = COLUMN_OPTIONS;
    fixture.detectChanges();

    component.pageChangeEvent(
      pageChanged,
      component.tableOptions.paginatorProperties!
    );
  });
});
