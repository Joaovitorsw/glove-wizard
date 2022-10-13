import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TestUserRunTime } from '../../../mocks/table';
import {
  MOCK_DATA_SOURCE,
  MOCK_HOME_COLUMN_OPTIONS,
  TABLE_OPTIONS_DATA_INPUT_MOCK,
} from '../../../mocks/table-options';
import { ColumnFormOptions } from '../../../models/interface/column-options';
import { DateTableInput } from '../../../models/interface/table-input';

import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';

import { DateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
  let component: DateInputComponent<TestUserRunTime>;
  let fixture: ComponentFixture<DateInputComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCdkTableModule],

      declarations: [DateInputComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<DateInputComponent<TestUserRunTime>>(
        DateInputComponent
      );
    component = fixture.componentInstance;
    const FORM_COLUMN =
      MOCK_HOME_COLUMN_OPTIONS[6] as ColumnFormOptions<TestUserRunTime>;
    component.defaultInputColumns =
      FORM_COLUMN.formColumn as DateTableInput<TestUserRunTime>;
    component.element = {
      ...MOCK_DATA_SOURCE[0],
      dateInput: {
        startDate: new Date(),
        endDate: new Date(),
      },
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return date range form', () => {
    const FORM_COLUMN =
      TABLE_OPTIONS_DATA_INPUT_MOCK as ColumnFormOptions<TestUserRunTime>;
    component.defaultInputColumns =
      FORM_COLUMN.formColumn as DateTableInput<TestUserRunTime>;

    component.ngOnInit();

    const isFormGroup = component.control instanceof FormGroup;

    expect(isFormGroup).toBeTruthy();
  });

  it('should return date form', () => {
    const isFormControl = component.control instanceof FormControl;

    expect(isFormControl).toBeTruthy();
  });
});
