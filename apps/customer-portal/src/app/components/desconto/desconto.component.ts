import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractTableInputControl } from 'libs/ngx-cdk-table/src/lib/models/abstract-table-input-control';
import {
  NgxTableData,
  TextTableInput,
} from 'libs/ngx-cdk-table/src/lib/models/table';
@Component({
  selector: 'glove-wizard-desconto',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './desconto.component.html',
  styleUrls: ['./desconto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescontoComponent<T> extends AbstractTableInputControl<T> {
  override control = new FormControl();
  override element: NgxTableData<T>;
  override defaultInputColumns: TextTableInput<T>;
  override eventAction: EventEmitter<T> = new EventEmitter<T>();
  value: any;
}
