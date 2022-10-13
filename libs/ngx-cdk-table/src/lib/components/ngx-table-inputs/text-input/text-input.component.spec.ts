import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUserRunTime } from '../../../mocks/table';
import {
  MOCK_DATA_SOURCE,
  MOCK_HOME_COLUMN_OPTIONS,
} from '../../../mocks/table-options';
import { ColumnFormOptions } from '../../../models/interface/column-options';
import { TextTableInput } from '../../../models/interface/table-input';

import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent<TestUserRunTime>;
  let fixture: ComponentFixture<TextInputComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCdkTableModule],
      declarations: [TextInputComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<TextInputComponent<TestUserRunTime>>(
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
});
