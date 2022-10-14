import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractTableInputControl } from 'libs/ngx-cdk-table/src/lib/models/class/abstract-table-input-control';
import {
  NgxTableData,
  TableEvent,
} from 'libs/ngx-cdk-table/src/lib/models/interface/table';
import { TextTableInput } from 'libs/ngx-cdk-table/src/lib/models/interface/table-input';

@Component({
  selector: 'glove-wizard-desconto',
  templateUrl: './desconto.component.html',
  styleUrls: ['./desconto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescontoComponent<T> extends AbstractTableInputControl<T> {
  override control = new FormControl();
  override element: NgxTableData<T>;
  override defaultInputColumns: TextTableInput<T>;
  override eventAction: EventEmitter<TableEvent<T>> = new EventEmitter<
    TableEvent<T>
  >();
  value: any;
}
