import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TestUser } from '@glove-wizard/ngx-cdk-table';
import { TableInputComponent } from 'libs/ngx-cdk-table/src/lib/models/table';
@Component({
  selector: 'glove-wizard-desconto',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './desconto.component.html',
  styleUrls: ['./desconto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescontoComponent
  implements OnInit, TableInputComponent<TestUser>
{
  ngOnInit(): void {}

  element: TestUser;
  eventAction: EventEmitter<TestUser>;
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
