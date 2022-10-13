import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUserRunTime } from '../../../mocks/table';
import {
  MOCK_DATA_SOURCE,
  MOCK_HOME_COLUMN_OPTIONS,
} from '../../../mocks/table-options';
import { ColumnFormOptions } from '../../../models/interface/column-options';
import { NumberTableInput } from '../../../models/interface/table-input';
import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';
import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let component: NumberInputComponent<TestUserRunTime>;
  let fixture: ComponentFixture<NumberInputComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCdkTableModule],

      declarations: [NumberInputComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<NumberInputComponent<TestUserRunTime>>(
        NumberInputComponent
      );
    component = fixture.componentInstance;
    const FORM_COLUMN =
      MOCK_HOME_COLUMN_OPTIONS[6] as ColumnFormOptions<TestUserRunTime>;
    component.defaultInputColumns =
      FORM_COLUMN.formColumn as NumberTableInput<TestUserRunTime>;
    component.element = MOCK_DATA_SOURCE[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
