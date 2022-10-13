import {
  NGX_PAGINATOR_OPTIONS,
  SET_COLUMN_CLASS_FN,
  TABLE_OPTIONS,
  TestUser,
  TestUserRunTime,
  TEST_USER_DATA,
} from '@glove-wizard/ngx-cdk-table';
import { NgxActionCellComponent } from 'libs/ngx-cdk-table/src/lib/components/ngx-action-cell/ngx-action-cell.component';
import { ColumnOptions } from 'libs/ngx-cdk-table/src/lib/models/interface/column-options';
import {
  NgxTableData,
  TableOptions,
} from 'libs/ngx-cdk-table/src/lib/models/interface/table';

import { CURRENCY_PIPE } from 'libs/ngx-cdk-table/src/lib/tokens/generic-pipe.token';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';

export const EDIT_TABLE_OPTIONS: TableOptions<TestUserRunTime> = {
  ...TABLE_OPTIONS,
  paginatorProperties: NGX_PAGINATOR_OPTIONS,
  setRowClassFn({ selected }) {
    const EMPTY_STRING = '';
    return selected ? 'selected' : EMPTY_STRING;
  },
};
export const HOME_TABLE_OPTIONS: TableOptions<TestUserRunTime> = {
  ...TABLE_OPTIONS,
  setRowClassFn({ selected }) {
    const EMPTY_STRING = '';
    return selected ? 'selected' : EMPTY_STRING;
  },
};

export const DATA_SOURCE = TEST_USER_DATA.map((user, index) => {
  const parcelas = +(user.currency / 3).toFixed(2);
  const newUser: NgxTableData<TestUserRunTime> = {
    ...user,
    fullname: `${user.id} - ${user.name} ${user.surname}`,
    name: `${user.id} - ${user.name}  `,
    parcelas: parcelas,
    qtd: 1,
    editable: true,
    ngxCdkTableIndex: index,
    subtotal: (+parcelas * 1).toFixed(2),
  };
  return newUser;
});

export const CREATE_EDIT_TABLE_COLUMN_OPTIONS = (
  AppComponent: AppComponent
) => {
  const columnOptions = [
    {
      headerTitle: '',
      cdkColumn: 'selected',
      formColumn: {
        key: 'selected',
        type: 'checkbox',
        formControlProperties: {
          valueChanges(valueChanges$, control, element) {
            return AppComponent.sideEffectTap(
              valueChanges$,
              element,
              'selected'
            );
          },
        },
      },
    },
    {
      headerTitle: 'Nome do usuário',
      cdkColumn: 'fullname',
      setColumnClassFn: SET_COLUMN_CLASS_FN,
    },

    {
      headerTitle: 'Moeda do usuário',
      canSort: true,
      cdkColumn: {
        cellDef: 'moeda',
        columnProperty: 'currency',
      },
      pipe: {
        type: CURRENCY_PIPE,
        args: 'BRL',
      },
      setColumnClassFn: SET_COLUMN_CLASS_FN,
    },
    {
      headerTitle: 'Périodo',
      cdkColumn: {
        cellDef: 'periodo',
        columnProperty: 'periodo',
      },

      formColumn: {
        type: 'date',
        rangeDate: {
          endDatePlaceholder: 'Data final',
          startDatePlaceholder: 'Data inicial',
        },
        key: 'periodo',
        formControlProperties: {
          valueChanges(
            valueChanges$,
            control,
            element: NgxTableData<TestUser>
          ) {
            return AppComponent.sideEffectTap(
              valueChanges$,
              element,
              'periodo',
              500
            );
          },
        },
      },
    },
    {
      headerTitle: 'Parcelas',
      canSort: true,
      cdkColumn: {
        cellDef: 'parcelas',
        columnProperty: 'parcelas',
      },
      formColumn: {
        type: 'text',
        key: 'parcelas',
        formControlProperties: {
          valueChanges(
            valueChanges$,
            control,
            element: NgxTableData<TestUser>
          ) {
            return AppComponent.sideEffectTap(
              valueChanges$,
              element,
              'parcelas',
              500
            );
          },
        },
        label: {
          value: 'Parcelas',
          floatLabel: 'always',
        },
        placeholder: 'Parcelas',
      },
    },
    {
      headerTitle: 'Quantidade',
      cdkColumn: {
        cellDef: 'qtd',
        columnProperty: 'qtd',
      },
      formColumn: {
        formControlProperties: {
          controls: [],
          valueChanges(
            valueChanges$,
            control,
            element: NgxTableData<TestUser>
          ) {
            return AppComponent.sideEffectTap(valueChanges$, element, 'qtd');
          },
        },
        key: 'qtd',
        type: 'select',
        placeholder: 'Selecione uma quantidade',
        label: {
          value: 'Quantidade',
        },
        options: of(
          Array.from({ length: 9 }, (_, i) => {
            return {
              value: i + 1,
              label: i + 1,
            };
          })
        ),
      },
    },
    {
      headerTitle: 'Total',
      cdkColumn: {
        cellDef: 'subtotal',
        columnProperty: 'subtotal',
      },
      formColumn: {
        key: 'subtotal',
        type: 'text',
        placeholder: 'Subtotal',
        label: {
          value: 'Subtotal',
        },
        formControlProperties: {
          readonly: true,
        },
      },
    },
    {
      headerTitle: 'Adicionar',
      cdkColumn: 'action',
      isAction: true,
      actionComponentRef: NgxActionCellComponent,
      setColumnClassFn: SET_COLUMN_CLASS_FN,
    },
  ] as ColumnOptions<TestUserRunTime>;
  return columnOptions;
};

export const HOME_COLUMN_OPTIONS: ColumnOptions<TestUserRunTime> = [
  {
    headerTitle: '',
    cdkColumn: 'selected',
    formColumn: {
      type: 'checkbox',
      key: 'selected',
      formControlProperties: {},
    },
  },
  {
    headerTitle: 'Nome do usuário',
    cdkColumn: 'name',
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
  {
    headerTitle: 'Sobrenome do usuário',
    cdkColumn: 'surname',
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
  {
    headerTitle: 'Moeda do usuário',
    cdkColumn: {
      cellDef: 'moeda',
      columnProperty: 'currency',
    },
    pipe: {
      type: CURRENCY_PIPE,
      args: 'BRL',
    },
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
  {
    headerTitle: 'Parcelas',
    cdkColumn: 'parcelas',
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
  {
    headerTitle: 'Periodo',
    cdkColumn: 'periodo',
    setColumnClassFn: SET_COLUMN_CLASS_FN,
    cellPropertyFn(element) {
      const dateInputElement: typeof element & {
        startDate?: Date;
        endDate?: Date;
      } = element;

      const defaultMessage = 'Não especificado';

      if (!element) return defaultMessage;

      const startDate = dateInputElement.startDate
        ? dateInputElement?.startDate?.toLocaleDateString('pt-BR')
        : defaultMessage;

      const endDate = dateInputElement?.endDate
        ? dateInputElement.endDate?.toLocaleDateString('pt-BR')
        : defaultMessage;

      const cellProperty = `${startDate} - ${endDate}`;

      return cellProperty;
    },
  },
  {
    headerTitle: 'Quantidade',
    cdkColumn: 'qtd',
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
  {
    headerTitle: 'Total',
    cdkColumn: 'subtotal',
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
  {
    headerTitle: 'Remover',
    cdkColumn: 'action',
    actionComponentRef: NgxActionCellComponent,
    setColumnClassFn: SET_COLUMN_CLASS_FN,
  },
];
