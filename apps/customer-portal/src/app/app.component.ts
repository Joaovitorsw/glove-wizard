import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TestUser, TestUserRunTime } from '@glove-wizard/ngx-cdk-table';
import {
  ColumnFormOptions,
  ColumnOptions,
  ParcialColumnOptions,
} from 'libs/ngx-cdk-table/src/lib/models/interface/column-options';
import {
  NgxTableData,
  TableEvent,
  TableOptions,
} from 'libs/ngx-cdk-table/src/lib/models/interface/table';
import { debounceTime, Observable, startWith, tap } from 'rxjs';
import {
  CREATE_EDIT_TABLE_COLUMN_OPTIONS,
  DATA_SOURCE,
  EDIT_TABLE_OPTIONS,
  HOME_COLUMN_OPTIONS,
  HOME_TABLE_OPTIONS,
} from './constants/app-table';

@Component({
  selector: 'glove-wizard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'customer-portal';
  tableOptions: TableOptions<TestUserRunTime> = HOME_TABLE_OPTIONS;
  columnOptions: ColumnOptions<TestUserRunTime> = HOME_COLUMN_OPTIONS;
  editTableOptions: TableOptions<TestUserRunTime> = EDIT_TABLE_OPTIONS;
  editColumnOptions: ColumnOptions<TestUser> =
    CREATE_EDIT_TABLE_COLUMN_OPTIONS(this);
  dataSource: TestUserRunTime[] = DATA_SOURCE;
  selectedDataSource: TestUserRunTime[] = [];

  sideEffectTap(
    valueChanges$: Observable<any>,
    element: NgxTableData<TestUserRunTime>,
    sideEffectKey: keyof TestUserRunTime,
    hasDebounce?: number
  ) {
    const valueChanges$$ = valueChanges$.pipe(
      startWith(element[sideEffectKey]),
      this.sideEffectTable(element, sideEffectKey)
    );

    const timeToDebounce = Number(hasDebounce);

    const debounceTime$$ = valueChanges$.pipe(
      startWith(element[sideEffectKey]),
      debounceTime(timeToDebounce),
      this.sideEffectTable(element, sideEffectKey)
    );

    return hasDebounce ? debounceTime$$ : valueChanges$$;
  }

  sideEffectTable(
    element: NgxTableData<TestUserRunTime>,
    sideEffectKey: keyof TestUserRunTime
  ) {
    return tap((tapValue: string | number | boolean | undefined) => {
      const { subTotalForm } = this.recoveryRowForms(element);
      if (subTotalForm && subTotalForm instanceof FormControl) {
        this.calculateSubTotalValue(sideEffectKey, tapValue, element);
      }
    });
  }

  private calculateSubTotalValue(
    sideEffectKey: string,
    tapValue: string | number | boolean | undefined,
    element: NgxTableData<TestUserRunTime>
  ) {
    const { subTotalForm, quantidadeForm, periodoForm, selectedForm } =
      this.recoveryRowForms(element);

    const value =
      sideEffectKey === 'parcelas' ? tapValue : Number(element.parcelas);

    if (!element.qtd) {
      element.qtd = 1;
      quantidadeForm?.setValue(1, { emitEvent: false });
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const quantidade = Number(quantidadeForm?.value);
      const total = quantidade * +value;
      const totalIsNaN = isNaN(total) ? 0 : total;
      const subtotal = totalIsNaN.toFixed(2);
      const periodoGroup = periodoForm?.value;

      const isAutoSelected =
        +subtotal > 0 &&
        quantidade >= 1 &&
        periodoGroup &&
        periodoGroup?.startDate &&
        periodoGroup?.endDate;

      if (isAutoSelected) {
        element.selected = true;
        selectedForm?.setValue(true, { emitEvent: false });
      }

      if (typeof tapValue === 'boolean') {
        element.selected = tapValue;
        selectedForm?.setValue(tapValue, { emitEvent: false });
      }
      element.subtotal = subtotal;
      subTotalForm?.setValue(subtotal, { emitEvent: false });
    }
  }

  private recoveryRowForms(element: NgxTableData<TestUserRunTime>) {
    const controls = [
      'subtotal',
      'qtd',
      'periodo',
      'selected',
    ] as (keyof TestUserRunTime)[];

    const [subTotalForm, quantidadeForm, periodoForm, selectedForm] =
      controls.map((control) => {
        const columnOption = this.getColumnOptionByProperty(control);
        return this.getFormControl(columnOption, element);
      });

    return { subTotalForm, quantidadeForm, periodoForm, selectedForm };
  }

  getFormControlByColumnOptionProperty(
    property: keyof TestUserRunTime,
    element: NgxTableData<TestUserRunTime>
  ) {
    const columnOption = this.getColumnOptionByProperty(property);
    return this.getFormControl(columnOption, element);
  }

  getFormControl(
    formColumnOptions: ColumnFormOptions<TestUser> | undefined,
    element: NgxTableData<TestUser>
  ) {
    if (!formColumnOptions?.formColumn?.formControlProperties?.controls)
      return undefined;

    return formColumnOptions?.formColumn?.formControlProperties?.controls[
      element.ngxCdkTableIndex
    ];
  }

  getColumnOptionByProperty(value: keyof TestUserRunTime) {
    return this.editColumnOptions.find((columnOption) => {
      return (
        columnOption.cdkColumn === value ||
        (columnOption.cdkColumn as ParcialColumnOptions<TestUserRunTime>)
          .columnProperty === value
      );
    }) as ColumnFormOptions<TestUserRunTime>;
  }

  tableEvents(tableEvent: TableEvent<TestUserRunTime>) {
    const { event, element } = tableEvent;

    if (event === 'delete' && element) {
      this.removeElementInSelectedTable(element);
    }

    if (event === 'add' && element) {
      this.addNewElementInSelectedTable(element);
    }
  }

  removeElementInSelectedTable(element: NgxTableData<TestUserRunTime>) {
    this.selectedDataSource = this.selectedDataSource.filter((user) => {
      const ngxTableData = user as NgxTableData<TestUserRunTime>;
      const isNotSelected =
        ngxTableData.ngxCdkTableIndex !== element.ngxCdkTableIndex;
      return isNotSelected;
    });
  }

  addNewElementInSelectedTable(element: NgxTableData<TestUserRunTime>) {
    this.selectedDataSource.push(element);
    this.selectedDataSource = [
      ...this.selectedDataSource.map((user) => {
        user.editable = false;
        return { ...user };
      }),
    ];
    this.dataSource.forEach((user) => {
      user.editable = true;
    });
  }
}
