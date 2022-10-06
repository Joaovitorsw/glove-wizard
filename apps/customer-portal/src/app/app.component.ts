import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  NGX_PAGINATOR_OPTIONS,
  SET_COLUMN_CLASS_FN,
  TABLE_OPTIONS,
  TestUser,
  TestUserRunTime,
  TEST_USER_DATA,
} from '@glove-wizard/ngx-cdk-table';
import { NgxActionCellComponent } from 'libs/ngx-cdk-table/src/lib/components/ngx-action-cell/ngx-action-cell.component';
import {
  ColumnFormOptions,
  ColumnOptions,
  NgxTableData,
  ParcialColumnOptions,
  TableEvent,
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
  editTableOptions: TableOptions<TestUserRunTime> = {
    ...TABLE_OPTIONS,
    paginatorProperties: NGX_PAGINATOR_OPTIONS,
    setRowClassFn({ selected }) {
      const EMPTY_STRING = '';
      return selected ? 'selected' : EMPTY_STRING;
    },
  };
  tableOptions: TableOptions<TestUserRunTime> = {
    ...TABLE_OPTIONS,
    setRowClassFn({ selected }) {
      const EMPTY_STRING = '';
      return selected ? 'selected' : EMPTY_STRING;
    },
  };
  columnOptions: ColumnOptions<TestUserRunTime>[] = [
    {
      headerTitle: '',
      cdkColumn: 'selected',
      formColumn: {
        formControl: {
          controls: [],
        },
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
        const cellProperty =
          dateInputElement.startDate?.toLocaleDateString('pt-BR') +
          ' - ' +
          dateInputElement.endDate?.toLocaleDateString('pt-BR');
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
      isAction: true,
      actionComponentRef: NgxActionCellComponent,
      setColumnClassFn: SET_COLUMN_CLASS_FN,
    },
  ];
  editColumnOptions: ColumnOptions<TestUser>[] = (() => {
    const AppComponent = this;
    const columnOptions = [
      {
        headerTitle: '',
        cdkColumn: 'selected',
        formColumn: {
          key: 'selected',
          type: 'checkbox',
          formControl: {
            controls: [],
          },
        },
      },
      {
        headerTitle: 'Nome do usuário',
        cdkColumn: 'name',
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
          formControl: {
            controls: [],
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
          formControl: {
            controls: [],
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
            controls: [],
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
          formControl: {
            controls: [],
          },
          placeholder: 'Subtotal',
          label: {
            value: 'Subtotal',
          },
          readonly: true,
        },
      },
      {
        headerTitle: 'Adicionar',
        cdkColumn: 'action',
        isAction: true,
        actionComponentRef: NgxActionCellComponent,
        setColumnClassFn: SET_COLUMN_CLASS_FN,
      },
    ] as ColumnOptions<TestUserRunTime>[];
    return columnOptions;
  })();
  selectedDataSource: TestUserRunTime[] = [];
  dataSource: TestUserRunTime[] = TEST_USER_DATA.map((user, index) => {
    const newUser = {
      ...user,
      name: `${user.id} - ${user.name} ${user.surname} ${user.name} ${user.surname} `,
      surname: `${user.surname} ${user.name} ${user.name} ${user.surname} `,
      qtd: 0,
      editable: true,
      ngxCdkTableIndex: index,
    };
    return newUser;
  });

  sideEffectTap(
    valueChanges$: Observable<any>,
    element: NgxTableData<TestUserRunTime>,
    hasDebounce?: number
  ) {
    const valueChanges$$ = valueChanges$.pipe(this.sideEffectTable(element));

    const debounceTime$$ = valueChanges$.pipe(
      debounceTime(hasDebounce!),
      this.sideEffectTable(element)
    );

    return hasDebounce ? debounceTime$$ : valueChanges$$;
  }

  sideEffectTable(element: NgxTableData<TestUserRunTime>) {
    return tap(() => {
      const subtotal = this.getColumnOptionByProperty('subtotal');
      const selected = this.getColumnOptionByProperty('selected');
      const quantidade = this.getColumnOptionByProperty('qtd');

      const subTotalForm = this.getFormControl(subtotal, element);
      const selectedForm = this.getFormControl(selected, element);
      const quantidadeForm = this.getFormControl(quantidade, element);

      this.writeWithDelay(() => {
        if (subTotalForm && subTotalForm instanceof FormControl) {
          const parcelas = Number(element.parcelas);
          const hasQuantityField = Number(element.qtd);
          selectedForm?.setValue(true);

          if (!hasQuantityField && quantidadeForm) {
            quantidadeForm?.setValue(1);
          }

          const quantidade = Number(quantidadeForm?.value);
          const total = quantidade * parcelas;
          const totalIsNaN = isNaN(total) ? 0 : total;
          const subtotal = totalIsNaN.toFixed(2);

          subTotalForm.setValue(subtotal);
        }
      }, 50);
    });
  }

  getFormControl(
    formColumnOptions: ColumnFormOptions<TestUser> | undefined,
    element: NgxTableData<TestUser>
  ) {
    return formColumnOptions?.formColumn?.formControl?.controls[
      element.ngxCdkTableIndex
    ];
  }

  getColumnOptionByProperty(
    value: keyof TestUserRunTime,
    key: keyof ColumnOptions<TestUserRunTime> = 'headerTitle'
  ) {
    return this.editColumnOptions.find((columnOption) => {
      return (
        columnOption.cdkColumn === value ||
        (columnOption.cdkColumn as ParcialColumnOptions<TestUserRunTime>)
          .columnProperty === value
      );
    }) as ColumnFormOptions<TestUserRunTime>;
  }

  tableEvents(tableEvent: TableEvent<TestUserRunTime>) {
    if (tableEvent.event === 'delete') {
      this.selectedDataSource = this.selectedDataSource.filter((user) => {
        return (
          (user as NgxTableData<TestUserRunTime>).ngxCdkTableIndex !==
          tableEvent.element?.ngxCdkTableIndex
        );
      });
    }
    if (tableEvent.event === 'add') {
      this.selectedDataSource.push(tableEvent.element!);
      this.selectedDataSource = [...this.selectedDataSource].map((user) => {
        user.editable = false;
        return { ...user };
      });
      this.dataSource.forEach((user) => {
        user.editable = true;
      });
    }
  }

  writeWithDelay = (value: Function, timeout: number) => {
    setTimeout(() => {
      value();
    }, timeout);
  };
}
