import { map, of } from 'rxjs';
import { NgxActionCellComponent } from '../components/ngx-action-cell/ngx-action-cell.component';
import { ColumnOptions } from '../models/interface/column-options';
import { NgxTableData } from '../models/interface/table';
import { CURRENCY_PIPE } from '../tokens/generic-pipe.token';
import { SET_COLUMN_CLASS_FN, TestUserRunTime, TEST_USER_DATA } from './table';

export const MOCK_DATA_SOURCE = TEST_USER_DATA.map((user, index) => {
  const parcelas = +(user.currency / 3).toFixed(2);
  const newUser: NgxTableData<TestUserRunTime> = {
    ...user,
    fullname: `${user.id} - ${user.name} ${user.surname}`,
    name: `${user.id} - ${user.name}  `,
    parcelas: parcelas,
    qtd: 1,
    selected: true,
    editable: true,
    ngxCdkTableIndex: index,
    subtotal: (+parcelas * 1).toFixed(2),
  };
  return newUser;
});

export const MOCK_HOME_COLUMN_OPTIONS: ColumnOptions<TestUserRunTime> = [
  {
    headerTitle: '',
    cdkColumn: 'selected',
    formColumn: {
      type: 'checkbox',
      key: 'selected',
      formControlProperties: {
        valueChanges(valueChanges$, control, element) {
          return valueChanges$.pipe(
            map((value) => {
              return 'remappedValue';
            })
          );
        },
      },
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
    cdkColumn: {
      cellDef: 'qtd',
      columnProperty: 'qtd',
    },
    formColumn: {
      formControlProperties: {
        controls: [],
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

export const TABLE_OPTIONS_DATA_INPUT_MOCK = {
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
    formControlProperties: {},
  },
};
