import { MatPaginator } from '@angular/material/paginator';
import {
  ColumnOptions,
  MatPaginatorProperties,
  NgxPaginatorProperties,
  NgxTableSortEvent,
  TableOptions,
} from '../models/table';
import { CURRENCY_PIPE } from '../tokens/generic-pipe.token';
import { DATA } from './table-data';

export interface TestUser {
  id: number;
  name: string;
  surname: string;
  currency: number;
  qtd: number;
}

export interface TestUserRunTime extends TestUser {
  selected?: boolean;
  parcelas?: number;
  subtotal?: string;
  editable?: boolean;
  periodo?: boolean;
}

const MAT_PAGINATOR_OPTIONS: MatPaginatorProperties = {
  isMatPaginator: true,
  pageChange(event) {
    console.log(event);
  },
  pageSizeOptions: [5],
  pageSize: 5,
  translate: (paginator: MatPaginator) => {
    paginator._intl.itemsPerPageLabel = 'Usuários por página :';
    paginator._intl.firstPageLabel = 'Primeira página';
    paginator._intl.lastPageLabel = 'Última página';
    paginator._intl.nextPageLabel = 'Próxima página';
    paginator._intl.previousPageLabel = 'Página anterior';

    paginator._intl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;

      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length} usuários`;
    };
  },
};

export const SUCCESS_CLASS = 'green';
export const WARNING_CLASS = 'bold red';
export const TEST_USER_DATA = DATA;
export const SET_COLUMN_CLASS_FN = (element: TestUser) =>
  element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;

export const NGX_PAGINATOR_OPTIONS: NgxPaginatorProperties = {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: TEST_USER_DATA.length,
  maxSize: 11,
  pageChange: (event: number, options) => {
    options.currentPage = event;
  },
};

export const COLUMN_OPTIONS: ColumnOptions<TestUserRunTime>[] = [
  {
    headerTitle: 'Nome do usuário',
    cdkColumn: 'name',
    setColumnClassFn: (element) => {
      return element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;
    },
  },
  {
    headerTitle: 'Sobrenome do usuário',
    cdkColumn: 'surname',
    setColumnClassFn: (element) => {
      return element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;
    },
  },
  {
    headerTitle: 'Moeda do usuário',
    canSort: false,
    cdkColumn: {
      cellDef: 'moeda',
      columnProperty: 'currency',
    },
    pipe: {
      type: CURRENCY_PIPE,
      args: 'BRL',
    },
    setColumnClassFn: (element) => {
      return element.currency < 3000 ? WARNING_CLASS : SUCCESS_CLASS;
    },
  },
  {
    headerTitle: 'Parcelas',
    cdkColumn: {
      cellDef: 'parcelas',
      columnProperty: 'parcelas',
    },
  },
  {
    headerTitle: 'Quantidade',
    cdkColumn: {
      cellDef: 'qtd',
      columnProperty: 'qtd',
    },
    formColumn: {
      type: 'text',
      formControl: {
        controls: [],
      },
      key: 'qtd',
      label: {
        value: 'Quantidade',
        floatLabel: 'always',
      },
    },
  },
];

export const TABLE_OPTIONS: TableOptions<TestUser> = {
  paginatorProperties: MAT_PAGINATOR_OPTIONS,
  sortData(
    sort: NgxTableSortEvent<TestUser>,
    eventDataSource: TestUser[],
    dataSource: TestUser[]
  ): TestUser[] {
    if (sort.direction === '') {
      eventDataSource.sort((a, b) => {
        return dataSource.indexOf(a) - dataSource.indexOf(b);
      });
      return eventDataSource;
    }

    const compare = (
      a: string | number | boolean | undefined,
      b: string | number | boolean | undefined,
      isAsc: boolean
    ) => {
      const firstComparative = a ? a : 0;
      const secondComparative = b ? b : 0;
      return (firstComparative < secondComparative ? -1 : 1) * (isAsc ? 1 : -1);
    };

    eventDataSource.sort((a, b) => {
      let isAsc = sort.direction === 'asc' || sort.direction === '';
      isAsc = sort.active === 'currency' ? !isAsc : isAsc;
      return compare(a[sort.active], b[sort.active], isAsc);
    });

    return eventDataSource;
  },
};
