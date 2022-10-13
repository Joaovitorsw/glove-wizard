import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TextInputComponent } from '../../components/ngx-table-inputs/text-input/text-input.component';
import { TestUserRunTime } from '../../mocks/table';
import {
  MOCK_DATA_SOURCE,
  MOCK_HOME_COLUMN_OPTIONS,
} from '../../mocks/table-options';
import { NgxCdkTableModule } from '../../ngx-cdk-table.module';
import { ColumnFormOptions } from '../interface/column-options';
import { NgxTableData, TableEvent } from '../interface/table';
import { TextTableInput } from '../interface/table-input';
import { AbstractTableInputControl } from './abstract-table-input-control';

const TEST_TEMPLATE = `
    <mat-form-field
      *ngIf="defaultInputColumns"
      appearance="outline"
      [class.mat-form-field-readonly]="
        !!defaultInputColumns.formControlProperties.readonly
      "
      [floatLabel]="defaultInputColumns.label?.floatLabel ?? 'always'"
    >
      <mat-label> {{ defaultInputColumns.label?.value }} </mat-label>
      <input
        [formControl]="control"
        matInput
        [readonly]="!!defaultInputColumns.formControlProperties.readonly"
      />
    </mat-form-field>
  `;

@Component({
  selector: 'glove-wizard-teste-text-input',
  template: TEST_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTestInputComponent<T> extends AbstractTableInputControl<T> {
  override control = new FormControl();
  override element: NgxTableData<T>;
  override defaultInputColumns: TextTableInput<T>;
  override eventAction: EventEmitter<TableEvent<T>> = new EventEmitter<
    TableEvent<T>
  >();
  value: any;
}

describe('AbstractTableInputControl', () => {
  let component: TextTestInputComponent<TestUserRunTime>;
  let fixture: ComponentFixture<TextInputComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCdkTableModule],
      declarations: [TextTestInputComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<TextTestInputComponent<TestUserRunTime>>(
        TextInputComponent
      );
    component = fixture.componentInstance;
    const FORM_COLUMN =
      MOCK_HOME_COLUMN_OPTIONS[0] as ColumnFormOptions<TestUserRunTime>;
    component.defaultInputColumns =
      FORM_COLUMN.formColumn as TextTableInput<TestUserRunTime>;
    component.element = MOCK_DATA_SOURCE[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a value', (done) => {
    component.valueChanges$.subscribe((value: string) => {
      expect(value).toEqual('remappedValue');
      done();
    });
    component.control.setValue('text');
  });

  it('should emit remove event', () => {
    const spy = spyOn(component.eventAction, 'emit');
    component.eventAction.emit({
      event: 'remove',
      element: MOCK_DATA_SOURCE[0],
    });
    expect(spy).toHaveBeenCalled();
  });
});
