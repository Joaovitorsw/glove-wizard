import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  SET_COLUMN_CLASS_FN,
  TABLE_OPTIONS,
  TestUser,
  TEST_USER_DATA,
} from '@glove-wizard/ngx-cdk-table';
import {
  ColumnOptions,
  NgxTableData,
  TableOptions,
} from 'libs/ngx-cdk-table/src/lib/models/table';
import { CURRENCY_PIPE } from 'libs/ngx-cdk-table/src/lib/tokens/generic-pipe.token';
import { debounceTime, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'glove-wizard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'customer-portal';
  tableOptions: TableOptions<TestUser> = {
    ...TABLE_OPTIONS,
    setRowClassFn({ selected }) {
      const empty = '';
      return selected ? 'selected' : empty;
    },
  };
  columnOptions: ColumnOptions<TestUser>[] = (() => {
    const AppComponent = this;
    const columnOptions = [
      {
        headerTitle: '',
        cdkColumn: 'selected',
        formColumn: {
          key: 'selected',
          type: 'checkbox',
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
        headerTitle: 'Parcelas',
        cdkColumn: {
          cellDef: 'parcelas',
          columnProperty: 'parcelas',
        },
        formColumn: {
          type: 'text',
          key: 'parcelas',

          formControl: {
            valueChanges(
              valueChanges$,
              control,
              element: NgxTableData<TestUser>
            ) {
              return AppComponent.sideEffectTap(valueChanges$, element, 500);
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
          formControl: {
            valueChanges(
              valueChanges$,
              control,
              element: NgxTableData<TestUser>
            ) {
              return AppComponent.sideEffectTap(valueChanges$, element);
            },
          },
          key: 'qtd',
          type: 'select',
          placeholder: 'Selecione uma quantidade',
          label: {
            value: 'Quantidade',
          },
          options: of([
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
          ]),
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
          readonly: true,
        },
      },
    ] as ColumnOptions<TestUser>[];
    return columnOptions;
  })();
  dataSource: TestUser[] = TEST_USER_DATA.map((user) => {
    const newUser = {
      ...user,
      name: `${user.id} - ${user.name} ${user.surname} ${user.name} ${user.surname} `,
      surname: `${user.surname} ${user.name} ${user.name} ${user.surname} `,
      qtd: 0,
    };
    return newUser;
  });

  sideEffectTap(
    valueChanges$: Observable<any>,
    element: NgxTableData<TestUser>,
    hasDebounce?: number
  ) {
    const valueChanges$$ = valueChanges$.pipe(this.sideEffectTable(element));

    const debounceTime$$ = valueChanges$.pipe(
      debounceTime(hasDebounce!),
      this.sideEffectTable(element)
    );

    return hasDebounce ? debounceTime$$ : valueChanges$$;
  }

  sideEffectTable(element: NgxTableData<TestUser>) {
    return tap(() => {
      const subtotal = this.getColumnOption('Total');

      const quantidade = this.getColumnOption('Quantidade');

      const subTotalForm = this.getFormControl(subtotal, element);

      const quantidadeForm = this.getFormControl(quantidade, element);

      this.writeWithDelay(() => {
        if (subTotalForm && subTotalForm instanceof FormControl) {
          const parcelas = Number(element.parcelas);
          const hasQuantityField = element.qtd;
          if (!hasQuantityField) {
            element.qtd = 1;

            if (quantidadeForm)
              quantidadeForm?.setValue(1, { emitEvent: false });
          }

          const quantidade = Number(element.qtd);

          const total = quantidade * parcelas;
          const totalIsNaN = isNaN(total) ? 0 : total;

          const subtotal = totalIsNaN.toFixed(2);

          element.subtotal = subtotal;
          subTotalForm.setValue(subtotal);
        }
      }, 200);
    });
  }

  getFormControl(
    formColumnOptions: ColumnOptions<TestUser> | undefined,
    element: NgxTableData<TestUser>
  ) {
    return formColumnOptions?.formColumn?.formControl?.controls[
      element.ngxCdkTableIndex
    ];
  }

  getColumnOption(column: string) {
    return this.columnOptions.find((columnOption) => {
      return columnOption.headerTitle === column;
    });
  }

  writeWithDelay = (value: Function, timeout: number) => {
    setTimeout(() => {
      value();
    }, timeout);
  };
}
