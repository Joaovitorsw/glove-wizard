import { Component } from '@angular/core';
import {
  SUCCESS_CLASS,
  TABLE_OPTIONS,
  TestUser,
  TEST_USER_DATA,
  WARNING_CLASS,
} from '@glove-wizard/ngx-cdk-table';
import {
  ColumnOptions,
  TableOptions,
} from 'libs/ngx-cdk-table/src/lib/models/table';
import { CURRENCY_PIPE } from 'libs/ngx-cdk-table/src/lib/tokens/generic-pipe.token';
import { DescontoComponent } from './components/desconto/desconto.component';

@Component({
  selector: 'glove-wizard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'customer-portal';
  tableOptions: TableOptions<TestUser> = TABLE_OPTIONS;
  columnOptions: ColumnOptions<TestUser>[] = [
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
    {
      headerTitle: 'Desconto',
      cdkColumn: {
        cellDef: 'qtd',
        columnProperty: 'qtd',
      },
      formColumn: {
        type: 'custom',
        componentRef: DescontoComponent,
      },
    },
    {
      headerTitle: 'Quantidade',
      cdkColumn: {
        cellDef: 'add',
        columnProperty: 'add',
      },
      formColumn: {
        key: 'qtd',
        type: 'select',
        placeholder: 'Selecione uma quantidade',
        label: {
          value: 'Quantidade',
        },
        options: [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
        ],
      },
    },
  ];
  dataSource: TestUser[] = TEST_USER_DATA.map((user) => {
    return {
      ...user,
      name: `${user.id} - ${user.name} ${user.surname} ${user.name} ${user.surname} `,
      surname: `${user.surname} ${user.name} ${user.name} ${user.surname} `,
      qtd: 0,
    };
  });
}
